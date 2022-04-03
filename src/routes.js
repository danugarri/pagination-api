import productsRoutes from './api/products.routes.js';

export default function (app) {
  app.use('/products', productsRoutes);
}
