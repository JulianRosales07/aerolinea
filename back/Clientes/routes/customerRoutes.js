const express = require('express');
const router = express.Router();
const {
  registerCustomer,
  loginCustomer,
  getCustomerProfile,
  updateCustomerProfile,
  addCustomerDocument,
  updateCustomerDocument
} = require('../controllers/customerController');
const { protect } = require('../middlewares/auth');

// Autenticación
router.post('/register', registerCustomer);
router.post('/login', loginCustomer);

// Perfil del cliente (requiere autenticación)
router.route('/me')
  .get(protect, getCustomerProfile)
  .put(protect, updateCustomerProfile);

// Documentos del cliente
router.route('/me/documents')
  .post(protect, addCustomerDocument);

router.route('/me/documents/:docId')
  .put(protect, updateCustomerDocument);

module.exports = router;