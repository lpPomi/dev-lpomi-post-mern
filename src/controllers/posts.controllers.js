import { connectDB } from '../db.js';

import Post from '../models/Post.js';

// to get the path from the folders local
import path from 'path';
import { fileURLToPath } from 'url';

//and use the db connection
//connectDB();

/* export const getPosts = (req, res) => {
  res.send('Hi GET');
}; */

// import the model shema and use it. Attention use async / await instead

// **********************************
// find () to get all posts. Verb GET
// **********************************
export const getPosts = async (req, res) => {
  try {
    //throw new Error('my new error 2 !');
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    //console.error(error)
    return res.status(500).json({ message: error.message });
  }
};

// *******************************************
// findById() to get a specific post. Verb GET
// *******************************************
export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.sendStatus(404);
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// **************************************
// save() to create a new post. Verb POST
// **************************************
export const createPost = async (req, res) => {
  try {
    //console.log(req.body);
    const { title, description } = req.body;

    // get the image object  received from API client
    //console.log(req.files);

    // get from the image object, the "name" received from API client
    //console.log(req.files.image.name);

    // get from the image object, the "tempFilePath" received from API client
    console.log('POST HERE ', req.files.image.tempFilePath);

    //const { image } = req.files.image.name;

    const __dirname = path.resolve();
    //console.log('In Controller dirname =', __dirname);

    let uploadPath = __dirname + '/upload';

    console.log('In Controller uploadPath =', uploadPath);

    let image;
    //let imageUrl = __dirname + '/' + req.files.image.tempFilePath;
    let imageUrl = req.files.image.tempFilePath;

    //if (image !== null) {
    if (req.files.image) {
      // search for the path to upload the image ?
      //const __filename = fileURLToPath(import.meta.url);
      //const __dirname = path.dirname(__filename);
      //console.log('In Controller:  dirname =', __dirname);

      console.log(imageUrl);

      image = {
        url: imageUrl,
      };

      console.log('new image obgect ready to be saved in mongoDB', image);
    }

    // save the post object with title, description and url from the image
    const newPost = new Post({ title, description, image });

    // here in the newPost object we have also create the _id...  noe save all
    await newPost.save();
    //res.send(newPost);
    return res.json(newPost);

    /*  console.log(req.body);
    return res.send(req.body); */
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// **************************************************
// findByIdAndUpdate() to update a new post. Verb PUT
// **************************************************
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    /*     
    console.log(id);
    console.log(req.body);
    return res.send('PUT update received');
 */
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updatedPost);
    return res.send('PUT update received');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// *************************************************
// findByIdAndDelete() to delete a post. Verb DELETE
// *************************************************
export const removePost = async (req, res) => {
  try {
    const { id } = req.params;
    const removedPost = await Post.findByIdAndDelete(id);
    console.log(removedPost);

    // if no post found
    if (!removedPost) return res.sendStatus(404);
    //if (!removedPost) return res.send('no post found!');

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
