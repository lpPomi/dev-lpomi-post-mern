import { connectDB } from '../db.js';

import Post from '../models/Post.js';

// to get the path from the folders local
import path from 'path';
import { fileURLToPath } from 'url';

import fs from 'fs-extra';

//and use the db connection
//connectDB();

/* export const getPosts = (req, res) => {
  res.send('Hi GET');
}; */

// import the model shema and use it. Attention use async / await instead

// *
// *
// *
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

// *
// *
// *
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

// *
// *
// *
// **************************************
// save() to create a new post. Verb POST
// **************************************
export const createPost = async (req, res) => {
  try {
    // rename example with fs-extra
    // https://github.com/jprichardson/node-fs-extra/blob/HEAD/docs/move.md

    // rename with a callback:
    /* fs.move(src, dest, (err) => {
      if (err) return console.error(err);
      console.log('success!');
        }); */

    // rename with async/await:
    async function renameImage(src, dest) {
      try {
        await fs.move(src, dest);
        //console.log('renamed success!');
      } catch (err) {
        console.error(err);
      }
    }

    const imageMaxSize = 2097152; // 2 MegaBytes

    //console.log(req.body);
    const { title, description } = req.body;

    /*     console.log(' Post without image');
    console.log('req.body', req.body); */

    if (req.files == null) {
      console.log('########################################');
      console.log('Post without image');
      console.log('########################################');

      //console.log('req.body unten ########', req.body);

      // save the post object with title, description and url from the image
      const newPost = new Post({ title, description });
      //res.send(newPost);
      //console.log('Image do not exist or size to big');
      // return res.send('POST save post without image received');
      console.log(
        'new post object without image ready to be saved in mongoDB',
        newPost
      );

      await newPost.save();
      return res.json(newPost);
    } else {
      //console.log('Image siizew = ', req.files.image.size);
      // if the user has select an image and the image is < 2 MB then do this
      //if (image !== null) {
      if (req.files.image && req.files.image.size < imageMaxSize) {
        console.log('###############################');
        console.log('Post with image and size is ok');
        console.log('###############################');
        // get the image object  received from API client
        //console.log('Files Object', req.files);

        // query if the image to save is from type "png", "jpg", "jpeg" or "gif"
        // if not ... do not save the image

        // get the image name and split the extentions of the image

        // get the image name typed by user
        var fileNamefromUser = req.files.image.name;
        //console.log('file_pat', fileNamefromUser);

        //  Split the name and extention in LINUX or MAC
        var fileNameSplit = fileNamefromUser.split('.');
        //console.log('File name split', fileNameSplit);

        // Extract the file extention e.g. png jpeg etc
        var fileExt = fileNameSplit[1];
        //console.log('fileExt', fileExt);

        if (
          fileExt != 'png' &&
          fileExt != 'jpg' &&
          fileExt != 'jpeg' &&
          fileExt != 'gif'
        ) {
          console.log('File type not acepted! ');
          return res.status(500).json({ message: 'image not acepted' });
        } else {
          // if image is not null and the extension is correct
          // then prepare the image to be saved in the server

          // get the image name from fileUpload to be saved local
          var file_path = req.files.image.tempFilePath;
          console.log('file_pat', file_path);

          // Split in Windows Systems Environment
          //var file_split = file_path.split("\\");

          //  Split in LINUX or MAC
          var file_split = file_path.split('/');
          //console.log('File Split', file_split);

          var mimeType = req.files.image.mimetype.split('/');
          //console.log('mimeType', mimeType);

          // File extention e.g. png jpmg etc
          var mimeTypeExt = mimeType[1];
          //console.log('mimeTypeExt', mimeTypeExt);

          const __dirname = path.resolve();
          //console.log('In Controller dirname =', __dirname);

          let uploadPath = __dirname + '/upload';
          //console.log('In Controller uploadPath =', uploadPath);

          // file name
          var file_name = file_split[1] + '.' + mimeTypeExt;
          //console.log('file_name', file_name);

          const srcToRename = uploadPath + '/' + file_split[1];
          const destToRename = uploadPath + '/' + file_name;
          //console.log('Source =', srcToRename);
          //console.log('Dest =', destToRename);

          renameImage(srcToRename, destToRename);

          // get from the image object, the "name" received from API client
          //console.log(req.files.image.name);

          // get from the image object, the "tempFilePath" received from API client
          //console.log('POST HERE ', req.files.image.tempFilePath);

          //const { image } = req.files.image.name;

          let image = null;
          //let imageUrl = __dirname + '/' + req.files.image.tempFilePath;
          //let imageUrl = req.files.image.tempFilePath;
          let imageUrl = 'upload/' + file_name;

          // search for the path to upload the image ?
          //const __filename = fileURLToPath(import.meta.url);
          //const __dirname = path.dirname(__filename);
          //console.log('In Controller:  dirname =', __dirname);

          //console.log(imageUrl);
          image = imageUrl;

          console.log(
            'new post object with image ready to be saved in mongoDB',
            image
          );

          // save the post object with title, description and url from the image
          const newPost = new Post({ title, description, image });

          //console.log('Object to store ', newPost);

          // here in the newPost object we have also create the _id...  now save all
          await newPost.save();

          //res.send(newPost);
          return res.json(newPost);

          /*  console.log(req.body);
        return res.send(req.body); */
        }
      }

      if (req.files.image.size >= imageMaxSize) {
        console.log('###############################');
        console.log('Post with image exceeded size!');
        console.log('###############################');

        // get the image name from fileUpload to be saved local
        var file_path = req.files.image.tempFilePath;
        console.log('file_pat', file_path);

        //  Split in LINUX or MAC
        var file_split = file_path.split('/');
        console.log('File Split', file_split);

        var file_name = file_split[1];
        console.log('file_name', file_name);

        console.log('File Size ', req.files.image.size);

        fs.remove('upload/' + file_name, function (err) {
          if (err) return console.error(err);
          console.log('remove success!');
        });

        return res.json('Image exceeded size !');
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// *
// *
// *
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

// *
// *
// *
// *************************************************
// findByIdAndDelete() to delete a post. Verb DELETE
// *************************************************
export const removePost = async (req, res) => {
  try {
    const { id } = req.params;
    const removedPost = await Post.findByIdAndDelete(id);
    console.log(removedPost);

    // remove also the image from the backend server

    // if no post by id found
    if (!removedPost) return res.sendStatus(404);
    //if (!removedPost) return res.send('no post found!');

    //console.log(removedPost.image);

    if (removedPost.image !== null) {
      //console.log('Image exist');
      fs.remove(removedPost.image, function (err) {
        if (err) return console.error(err);
        console.log('remove success!');
      });
    } else console.log('Image do not exist');
    /* 
    fs.remove('/tmp/myfile', function (err) {
      if (err) return console.error(err);
      console.log('remove success!');
    });
 */
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
