import mongoose from 'mongoose';
import config from '@config/index';

const databaseConnection = (cb: Function) => {
  mongoose
    .connect(config.DATABASE_URI)
    .then(() => {
      console.log('\x1b[34mDatabase Connection Successful');
      return cb(true);
    })
    .catch((err) => {
      console.error(err);
      setTimeout(() => {
        databaseConnection(cb);
      }, 1000);
    });
};

export default databaseConnection;
