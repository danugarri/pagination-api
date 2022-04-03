import mongoose from 'mongoose';
import config from '../../config/index.js';

export default async function () {
  // DEVELOPMENT: Ensure use of right mongo verrsion (4.2)
  if (process.env.NODE_ENV === 'development') {
    mongoose.connection.on('connected', function () {
      const admin = new mongoose.mongo.Admin(mongoose.connection.db);
      admin.buildInfo((err, info) => {
        if (err) return;
        if (!info.version.startsWith('4.2.')) {
          console.error(`Your mongodb version is ${info.version} and you need the version 4.2`);
          process.exit(1);
        }
      });
    });
  }

  if (config.mongo.debug) mongoose.set('debug', true);

  // Listen to mongo connection errors (after first connection is established)
  mongoose.connection.on('error', err => {
    console.error('Mongoose connection on error event:', err);
  });

  // Connect to MongoDB
  try {
    await mongoose.connect(config.mongo.uri, config.mongo.options);
    console.log('Mongo connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
