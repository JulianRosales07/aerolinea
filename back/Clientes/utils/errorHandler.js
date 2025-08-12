class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Errores específicos de la aplicación
class BadRequestError extends AppError {
  constructor(message = 'Solicitud incorrecta') {
    super(message, 400);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'No autorizado') {
    super(message, 401);
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Prohibido') {
    super(message, 403);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Recurso no encontrado') {
    super(message, 404);
  }
}

class ConflictError extends AppError {
  constructor(message = 'Conflicto') {
    super(message, 409);
  }
}

class ValidationError extends AppError {
  constructor(errors, message = 'Error de validación') {
    super(message, 422);
    this.errors = errors;
  }
}

class DatabaseError extends AppError {
  constructor(message = 'Error de base de datos') {
    super(message, 500);
  }
}

class ServiceUnavailableError extends AppError {
  constructor(message = 'Servicio no disponible') {
    super(message, 503);
  }
}

// Función para manejar errores de validación de Mongoose
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map(el => ({
    field: el.path,
    message: el.message
  }));
  return new ValidationError(errors);
};

// Función para manejar errores de duplicados en MongoDB
const handleDuplicateFieldsError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const message = `El valor '${err.keyValue[field]}' ya existe para el campo ${field}. Por favor use otro valor.`;
  return new ConflictError(message);
};

// Función para manejar errores de JWT
const handleJWTError = () => new UnauthorizedError('Token inválido. Por favor inicie sesión nuevamente');

// Función para manejar tokens JWT expirados
const handleJWTExpiredError = () => new UnauthorizedError('Su token ha expirado. Por favor inicie sesión nuevamente');

// Manejador global de errores
const globalErrorHandler = (err, req, res, next) => {
  // Configurar valores por defecto
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Log del error en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.error('ERROR 💥', err);
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack
    });
  } else {
    // Respuesta en producción

    // Errores operacionales: enviar mensaje al cliente
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        ...(err.errors && { errors: err.errors }) // Incluir errores de validación si existen
      });
    } 
    // Errores de programación o desconocidos: no enviar detalles
    else {
      // 1) Log del error
      console.error('ERROR 💥', err);

      // 2) Enviar respuesta genérica
      res.status(500).json({
        status: 'error',
        message: 'Algo salió mal!'
      });
    }
  }
};

// Función para envolver controladores async/await
const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

module.exports = {
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ValidationError,
  DatabaseError,
  ServiceUnavailableError,
  handleValidationError,
  handleDuplicateFieldsError,
  handleJWTError,
  handleJWTExpiredError,
  globalErrorHandler,
  catchAsync
};