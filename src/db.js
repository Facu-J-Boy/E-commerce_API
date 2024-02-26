const mongoose = require('mongoose');

// URL de conexión a la base de datos MongoDB
const dbURI = 'mongodb://localhost:27017/e-commerce';

// Configuración de la conexión
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Manejador de eventos para la conexión exitosa
mongoose.connection.on('connected', () => {
  console.log('Conexión a MongoDB establecida');
});

// Manejador de eventos para errores de conexión
mongoose.connection.on('error', (err) => {
  console.log('Error en la conexión a MongoDB:', err);
});

// Manejador de eventos para desconexión de la base de datos
mongoose.connection.on('disconnected', () => {
  console.log('Conexión a MongoDB cerrada');
});

// Manejador de eventos para cerrar la conexión antes de salir de la aplicación
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      'Conexión a MongoDB cerrada debido a la terminación de la aplicación'
    );
    process.exit(0);
  });
});
