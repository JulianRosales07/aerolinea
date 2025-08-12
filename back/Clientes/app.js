const app = require('./config/server');
const connectDB = require('./config/db');
const customerRoutes = require('./routes/customerRoutes');
const ErrorHandler = require('./utils/errorHandler');

// Conectar a MongoDB
connectDB();

// Rutas
app.use('/api/v1/customers', customerRoutes);

// Manejar rutas no encontradas
app.all('*', (req, res, next) => {
  next(new ErrorHandler(`No se pudo encontrar ${req.originalUrl} en este servidor!`, 404));
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});