const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'El apellido es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Por favor ingrese un email válido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
    select: false
  },
  phone: {
    type: String,
    required: [true, 'El teléfono es requerido']
  },
  passportNumber: {
    type: String,
    required: [true, 'El número de pasaporte es requerido'],
    unique: true
  },
  nationality: {
    type: String,
    required: [true, 'La nacionalidad es requerida']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'La fecha de nacimiento es requerida']
  },
  frequentFlyerNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  tierStatus: {
    type: String,
    enum: ['standard', 'silver', 'gold', 'platinum'],
    default: 'standard'
  },
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }],
  documents: [{
    type: {
      type: String,
      enum: ['passport', 'visa', 'vaccination'],
      required: true
    },
    number: String,
    expiryDate: Date,
    country: String,
    fileUrl: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});
// Encriptar contraseña antes de guardar
customerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Método para comparar contraseñas
customerSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Virtual para nombre completo
customerSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('Customer', customerSchema);