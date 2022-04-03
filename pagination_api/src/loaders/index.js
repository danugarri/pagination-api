import expressLoader from './express.js';
import mongoLoader from './mongo.js';

export default async function ({ app }) {
  await mongoLoader();
  await expressLoader({ app });
}