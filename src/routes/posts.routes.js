import { Router } from 'express';

// import file with *.js because we are using modules!
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  removePost,
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
router.delete('/posts/:id', removePost);

export default router;
