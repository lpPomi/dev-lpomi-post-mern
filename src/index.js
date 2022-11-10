import app from './app.js';
import { connectDB } from './db.js';
import { PORT } from './config.js';

// connect first to mongoose and then to the backend
// we can also connect to mongosse in the controller function

//and use the db connection
connectDB();

// connect to the nodejs server
app.listen(PORT, () => {
  console.log('Server on port ', PORT);
});

//app.listen(3000);
/* app.listen(PORT);
console.log('Server on port ', PORT);
 */
