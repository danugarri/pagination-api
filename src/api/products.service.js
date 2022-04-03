import VError from 'verror';
import productModel from './product.model.js';
import Product from './product.model.js';

export async function list ({ page, itemsPerPage, active }) {
  const filters = {
    ...(active !== undefined && { active })
  };
  const list = await Product.find(filters).skip((parseInt(page)) * itemsPerPage).limit(parseInt(itemsPerPage))
  const totalCount = await Product.countDocuments(filters);
  return { totalCount, list };
}
export async function detail (id) {
  const product = await Product.findById(id)
  
  if (!product) {
    throw new VError.WError({ name: 'ResourceNotFoundError', info: { id } }, 'Product not found');
  }
  return product
}
export async function update (id, body) {
  const product = await Product.findById(id)
  if (!product) {
    throw new VError.WError({ name: 'ResourceNotFoundError', info: { id } }, 'Product not found');
  }

  body.description && (product.description = body.description)
  body.active && (product.active = body.active)
  body.price && (product.price = body.price)
  body.name && (product.name = body.name)

  return product.save()
}
export function create (body) {
  return Product.create(body)
}
export function deleteProduct (id) {
  return Product.findByIdAndRemove(id)
}