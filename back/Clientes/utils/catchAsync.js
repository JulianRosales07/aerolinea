const { AppError } = require('./errorHandler');
const debug = require('debug')('app:catchAsync');

/**
 * Higher-order function that wraps async route handlers to automatically catch errors
 * and forward them to Express's error handling middleware.
 * 
 * @param {Function} fn - Async function to wrap
 * @param {Object} [options] - Configuration options
 * @param {boolean} [options.log=false] - Whether to log errors
 * @param {string} [options.context] - Context for error logging
 * @returns {Function} Wrapped middleware function
 */
const catchAsync = (fn, options = {}) => {
  const { log = false, context } = options;

  return (req, res, next) => {
    // If the function returns a promise, catch its rejection
    const promise = fn(req, res, next);
    
    // Check if the returned value is a promise
    if (promise && typeof promise.catch === 'function') {
      promise.catch(err => {
        // Enhance error with request context if available
        if (err instanceof AppError && req) {
          err.request = {
            method: req.method,
            url: req.originalUrl,
            params: req.params,
            query: req.query,
            // Exclude sensitive headers
            headers: {
              'user-agent': req.headers['user-agent'],
              'content-type': req.headers['content-type'],
              accept: req.headers['accept']
            }
          };
        }

        // Log error if configured
        if (log) {
          debug(
            `Error in ${context || 'async function'}: %O`,
            {
              message: err.message,
              stack: err.stack,
              ...(req && {
                method: req.method,
                path: req.path,
                params: req.params
              })
            }
          );
        }

        next(err);
      });
    }
  };
};

/**
 * Variant of catchAsync that throws specific error types based on conditions
 * 
 * @param {Function} fn - Async function to wrap
 * @param {Object} checks - Error type checks
 * @param {Function} [checks.NotFound] - Returns truthy if NotFoundError should be thrown
 * @param {Function} [checks.BadRequest] - Returns truthy if BadRequestError should be thrown
 * @returns {Function} Wrapped middleware function
 */
catchAsync.withChecks = (fn, checks = {}) => {
  return catchAsync(async (req, res, next) => {
    try {
      const result = await fn(req, res, next);
      
      // Check for NotFound condition
      if (checks.NotFound && checks.NotFound(result)) {
        throw new NotFoundError();
      }
      
      // Check for BadRequest condition
      if (checks.BadRequest && checks.BadRequest(result)) {
        throw new BadRequestError();
      }
      
      return result;
    } catch (err) {
      // Re-throw AppError instances, wrap others as DatabaseError
      if (!(err instanceof AppError)) {
        throw new DatabaseError(err.message);
      }
      throw err;
    }
  }, { log: true, context: 'checkedAsync' });
};

module.exports = catchAsync;