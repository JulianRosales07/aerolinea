const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');
const Customer = require('../models/Customer');

// Proteger rutas - verificar JWT
exports.protect = async (req, res, next) => {
  try {
    let token;

    // 1) Obtener token del header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new ErrorHandler('No está autorizado para acceder a esta ruta', 401));
    }

    // 2) Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Verificar si el cliente aún existe
    const currentCustomer = await Customer.findById(decoded.id);
    if (!currentCustomer) {
      return next(new ErrorHandler('El cliente asociado a este token ya no existe', 401));
    }

    // 4) Guardar cliente en request
    req.user = currentCustomer;
    next();
  } catch (err) {
    return next(new ErrorHandler('No está autorizado para acceder a esta ruta', 401));
  }
};