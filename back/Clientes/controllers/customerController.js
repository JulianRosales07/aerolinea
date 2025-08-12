const Customer = require('../models/Customer');
const ErrorHandler = require('../utils/errorHandler');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');

// @desc    Registrar nuevo cliente
// @route   POST /api/v1/customers/register
// @access  Public
exports.registerCustomer = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password, phone, passportNumber, nationality, dateOfBirth } = req.body;

  const newCustomer = await Customer.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    passportNumber,
    nationality,
    dateOfBirth
  });

  const token = jwt.sign({ id: newCustomer._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });

  res.status(201).json({
    success: true,
    token,
    data: {
      customer: {
        id: newCustomer._id,
        fullName: newCustomer.fullName,
        email: newCustomer.email,
        tierStatus: newCustomer.tierStatus
      }
    }
  });
});

// @desc    Login de cliente
// @route   POST /api/v1/customers/login
// @access  Public
exports.loginCustomer = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Verificar si se proporcionó email y contraseña
  if (!email || !password) {
    return next(new ErrorHandler('Por favor ingrese email y contraseña', 400));
  }
  // 2) Verificar si el cliente existe y la contraseña es correcta
  const customer = await Customer.findOne({ email }).select('+password');

  if (!customer || !(await customer.correctPassword(password, customer.password))) {
    return next(new ErrorHandler('Email o contraseña incorrectos', 401));
  }

  // 3) Generar token JWT
  const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });

  res.status(200).json({
    success: true,
    token,
    data: {
      customer: {
        id: customer._id,
        fullName: customer.fullName,
        email: customer.email,
        tierStatus: customer.tierStatus
      }
    }
  });
});

// @desc    Obtener perfil del cliente
// @route   GET /api/v1/customers/me
// @access  Private
exports.getCustomerProfile = catchAsync(async (req, res, next) => {
  const customer = await Customer.findById(req.user.id).populate('bookings');

  res.status(200).json({
    success: true,
    data: {
      customer
    }
  });
});

// @desc    Actualizar perfil del cliente
// @route   PUT /api/v1/customers/me
// @access  Private
exports.updateCustomerProfile = catchAsync(async (req, res, next) => {
  const fieldsToUpdate = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone
  };

  const customer = await Customer.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: {
      customer
    }
  });
});

// @desc    Agregar documento del cliente (pasaporte, visa, etc.)
// @route   POST /api/v1/customers/me/documents
// @access  Private
exports.addCustomerDocument = catchAsync(async (req, res, next) => {
  const { type, number, expiryDate, country, fileUrl } = req.body;

  const customer = await Customer.findById(req.user.id);

  // Verificar si el documento ya existe
  const existingDoc = customer.documents.find(doc => doc.type === type);
  if (existingDoc) {
    return next(new ErrorHandler(`Ya existe un documento de tipo ${type}`, 400));
  }

  customer.documents.push({
    type,
    number,
    expiryDate,
    country,
    fileUrl
  });

  await customer.save();

  res.status(200).json({
    success: true,
    data: {
      documents: customer.documents
    }
  });
});
// @desc    Actualizar documento del cliente
// @route   PUT /api/v1/customers/me/documents/:docId
// @access  Private
exports.updateCustomerDocument = catchAsync(async (req, res, next) => {
  const { number, expiryDate, country, fileUrl } = req.body;

  const customer = await Customer.findById(req.user.id);
  const docIndex = customer.documents.findIndex(doc => doc._id.toString() === req.params.docId);

  if (docIndex === -1) {
    return next(new ErrorHandler('Documento no encontrado', 404));
  }

  customer.documents[docIndex] = {
    ...customer.documents[docIndex].toObject(),
    number: number || customer.documents[docIndex].number,
    expiryDate: expiryDate || customer.documents[docIndex].expiryDate,
    country: country || customer.documents[docIndex].country,
    fileUrl: fileUrl || customer.documents[docIndex].fileUrl
  };

  await customer.save();

  res.status(200).json({
    success: true,
    data: {
      document: customer.documents[docIndex]
    }
  });
});