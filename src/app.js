import express from 'express';

// to handle with images
import fileUpload from 'express-fileupload';

// to get the path from the folders local
import path from 'path';
import { fileURLToPath } from 'url';

// without {} because it is an export default
// and not export { app };

// to use the routes from file posts.router.js
import postsRoutes from './routes/posts.routes.js';
//import indexRoutes from './routes/index.routes.js';

// use cors
import cors from 'cors';

// use express
const app = express();

// to read json data from the backend. Attention before read the routes !
app.use(express.json());

// to use cors and avoid this
/*  Access to XMLHttpRequest at 'http://localhost:3000/api/posts' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. */

app.use(cors());

//const __dirname = path.resolve();
//console.log('In App dirname =', __dirname);
// In App dirname = /appl/develop/fazt/react/mern-content-crud/backend

/* const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('In App dirname =', __dirname); */
//In App dirname = /appl/develop/fazt/react/mern-content-crud/backend/src

// define the fileUpload method to handle
app.use(
  fileUpload({
    useTempFiles: true, // --> if you want to save the images local
    tempFileDir: './upload', // --> is the local directory to save the images
    limits: { fileSize: 2 * 1024 * 1024 }, // is equivalent to 2 MBytes
    abortOnLimit: false,
    // safeFileNames: true,
    // preserveExtension: 3, // --> if you want to have the extention
    responseOnLimit: 'Image greater than 2 Mbyte !',
  })
);

// *******************
// to use the routes
// if you want to use /api as a general url
app.use('/api', postsRoutes);
// or without /api as prefix
//app.use(postsRoutes);

// and if a wrong route was set
/* app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route endpoint not found !',
  });
  res.status(404).console.log('sdfs');
}); */

export default app;
