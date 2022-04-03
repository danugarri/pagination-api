'use strict';

import * as dotenv from 'dotenv';
import _ from 'lodash';

import development from './development.js';

import { createReadOnlyProxy } from '../src/utils/common.js';

dotenv.config();

// All configurations will extend these options
// ============================================
const all = {
  env: process.env.NODE_ENV || 'development',

  debug: false,

  // Server port
  port: process.env.PORT || 9000,

  mongo: {
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true, // removes deprecation warning: `current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version.`
      useFindAndModify: false, // removes deprecation warning: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated.
      useCreateIndex: true // removes deprecation warning: `collection.ensureIndex is deprecated. Use createIndexes instead.`
    }
  },
};

const environments = {
  development
};

// Export the config object based on the NODE_ENV
// ==============================================
const allMerged = _.merge(
  all,
  environments[all.env] || {});
// We create a read-only proxy to prevent the shared object from being modified at runtime.
// For this we use proxies instead of Object.freeze because these can be easily mocked. An Object.freeze is not mockable
const proxy = createReadOnlyProxy(allMerged);
export default proxy;
