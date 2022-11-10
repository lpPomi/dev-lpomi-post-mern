// *** when using dotenv
/* import { config } from 'dotenv';

config(); */

//console.log(process.env.PORT);

// for nodejs
/* export const PORT = process.env.PORT || 3000; */
export const PORT = 3000;

/* console.log(process.env.PORT); */

// for MongoDb
/* export const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/api_rest_posts_mern';
 */

export const MONGODB_URI = 'mongodb://localhost:27017/api_rest_posts_mern';
