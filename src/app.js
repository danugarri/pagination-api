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
// app.get('/products', function(req, res){
//   res.json(products);
// });

const  mYUrl= new URL(`http://localhost:9000/product?page=3`);

const page= Number(mYUrl.searchParams.get('page'));
// request
const filteredProducts= products.filter(product =>{
  const stringToFilter= product.SKU.substring(9);
  const result = Number(stringToFilter) <= (page+1)*10 &&  Number(stringToFilter) > page*10;

  return result;
}
   )
app.get(`/product`, function(req, res){
 
  res.json(filteredProducts);
    
});
app.get('/test', function(req,res) {
  res.send('Hola')
})
app.get('/test:page', function(req,res) {
  const page= req.params.page
  res.send('Hola página 1')
});
app.get('/test/:page', function(req,res) {
  const page= req.params.page
  res.send('Hola página 2')
});
// esto no lo reconoce
app.get('/test?page=0', function(req,res) {
  const page= req.params.page
  res.send('Hola página 3')
});
app.get('/hola/:page', function(req,res) {
  const page= req.params.page
  res.send(page)
});
////// Wanted request
app.get('/list/:page', function  (req, res) {

  const pageFiltered = req.params.page;
  // request
  const filteredProducts= products.filter(product => {
    const stringToFilter= product.SKU.substring(9);
    const result = Number(stringToFilter) <= (Number(pageFiltered)+1)*10 &&  Number(stringToFilter) > Number(pageFiltered)*10;
   
    // if(pageFiltered==='0') return Number(stringToFilter) <= 10 &&  Number(stringToFilter) > 0;
    // if(pageFiltered==='1') return Number(stringToFilter) <= 20 &&  Number(stringToFilter) > 10;
    // if(pageFiltered==='2') return Number(stringToFilter) <= 30 &&  Number(stringToFilter) > 20;
    return result;
  }
  );
  res.json(filteredProducts);
});

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