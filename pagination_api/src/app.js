import express from 'express';
import logger from 'morgan';
import http from 'http';

import config from '../config/index.js';
import loaders from './loaders/index.js';
import { products } from './constants.js';

const app = express();

app.use(logger('dev'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/products', function(req, res){
  res.json(products);
});
// app.put('/update', function(req, res){
//   console.log( 'the product would have been updated');
// });

async function startServer () {
  // Initialize loaders
  await loaders({ app });

  await new Promise((resolve) => {
    const server = http.createServer(app);
    app.application = server.listen(config.port, config.ip, function () {
      console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
      resolve();
    });
  });
}

async function main () {
  console.time('AppStartDuration');
  await startServer();
  console.log('App started');
  console.timeEnd('AppStartDuration');
}


if (process.env.NODE_ENV === 'test') {
  app.init = async () => {
    await main();
  };
} else {
  main();
}

export default app;