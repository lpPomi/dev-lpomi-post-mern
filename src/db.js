//import app from './app.js';
//import { PORT } from './config.js';

import mongoose from 'mongoose';
import { MONGODB_URI } from './config.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    // Crear servidor y ponerme a escuchar peticiones HTTP
    /*   app.listen(PORT, () => {
      console.log('Servidor corriendo en http://localhost:' + PORT);
    }); */
  } catch (error) {
    console.error(error);
  }
};

mongoose.connection.on('connected', () => {
  console.log('Mongodb is connected to', mongoose.connection.db.databaseName);
});
