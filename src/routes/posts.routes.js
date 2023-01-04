import { Router } from 'express';

// import file with *.js because we are using modules!
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  removePost,
  getImage,
  upload,
  removeImageBackend,
} from '../controllers/posts.controllers.js';

const router = Router();

// test output in the browser
/* router.get('/', (req, res) => {
  res.send('Hello World');
}); */

// in der server console
/* router.get('/', (req, res) => { console.log('Hello from Backend');}); */

router.get('/posts', getPosts);
router.get('/posts/:id', getPost);
router.post('/posts', createPost);
router.put('/posts/:id', updatePost);

// delete an post object by id
router.delete('/posts/:id', removePost);

// delete only an image from backend by id
router.get('/del-image/:id', removeImageBackend);

// get an image
router.get('/get-image/:image', getImage);

// save an image into mongodb
router.post('/upload-image/:id?', upload);

export default router;
