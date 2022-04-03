import cors from 'cors';
import config from '../../config/index.js';

export default function (app) {
  let corsOptions;

  if (['integration', 'production'].includes(config.env)) {
    let origins = config.corsOrigins ? config.corsOrigins.split(',') : [];
    corsOptions = {
      origin: origins,
      optionsSuccessStatus: 200
    };
  }

  if (config.env === 'development') {
    corsOptions = {
      origin: '*',
      optionsSuccessStatus: 200
    };
  }

  app.use(cors(corsOptions));
}
