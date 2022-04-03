// Seed here!
import mongoose from 'mongoose';
import Product from './src/api/product.model.js';

const dbtitle = 'harbest-test'
mongoose.connect('mongodb://127.0.0.1:27017/harbest-test', { useUnifiedTopology: true, useNewUrlParser: true })




const products = [
  {
    "name": "Lechuga iceberg",
    "description": "Producto de Mariano, cultivada con amor.",
    "active": true,
    "price": 0.79,
    "SKU": "HB000000001"
  },
  {
    "name": "Cebolla Roja",
    "description": "Producto de Mariano, cultivada con amor.",
    "active": true,
    "price": 1.79,
    "SKU": "HB000000002"
  },
  {
    "name": "Zanahoria",
    "description": "Producto de Angel, cultivada con amor.",
    "active": true,
    "price": 2.79,
    "SKU": "HB000000003"
  },
  {
    "name": "Patata Agria",
    "description": "Producto de Mariano, cultivada con amor.",
    "active": true,
    "price": 0.39,
    "SKU": "HB000000004"
  },
  {
    "name": "Tomate Maduro",
    "description": "Producto de Mariano, cultivada con amor.",
    "active": true,
    "price": 0.89,
    "SKU": "HB000000005"
  },
  {
    "name": "Tomate Verde",
    "description": "Producto de Mariano, cultivada con amor.",
    "active": true,
    "price": 0.89,
    "SKU": "HB000000006"
  },
  {
    "name": "Tomate Cherry",
    "description": "Producto de Felix, cultivada con amor.",
    "active": true,
    "price": 0.89,
    "SKU": "HB000000007"
  },
  {
    "name": "Pepino",
    "description": "Producto de Felix, cultivada con amor.",
    "active": true,
    "price": 2.89,
    "SKU": "HB000000008"
  },
  {
    "name": "Pimiento Verde",
    "description": "Producto de Felix, cultivada con amor.",
    "active": true,
    "price": 0.89,
    "SKU": "HB000000009"
  },
  {
    "name": "Pimiento Rojo",
    "description": "Producto de Felix, cultivada con amor.",
    "active": true,
    "price": 0.89,
    "SKU": "HB000000010"
  },
  {
    "name": "Pimiento Amarillo",
    "description": "Producto de Felix, cultivada con amor.",
    "active": true,
    "price": 0.89,
    "SKU": "HB000000011"
  },
  {
    "name": "Tomate Rosa",
    "description": "Producto de Angel, cultivada con amor.",
    "active": true,
    "price": 1.59,
    "SKU": "HB000000012"
  },
  {
    "name": "Tomate Azul",
    "description": "Producto de Angel, cultivada con amor.",
    "active": true,
    "price": 0.89,
    "SKU": "HB000000013"
  },
]


Product
    .create(products)
    .then(allProductsCreated => {
        console.log(`Created ${allProductsCreated.length} products`)
        mongoose.connection.close();
    })
    .catch(err => console.log('It was a mistake,', err))