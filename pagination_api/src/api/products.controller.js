import VError from 'verror';
import * as ProductsService from './products.service.js';

export async function listProduct (req, res, next) {
  try {
    // if (!req.query.page || !req.query.itemsPerPage) {
    //   throw new VError.WError({ name: 'FieldsValidationError', info: { error: 'Pagination is required'} }, 'Fail validating fields');
    // }
    const { page, itemsPerPage, active } = req.query;
    const result = await ProductsService.list({ page, itemsPerPage, active: active === 'true' });
    res.json(result);
  } catch (error) {
    return next(error);
  }
}
export async function detailProduct (req, res, next) {
  try {
    if (!req.params.productId) {
      throw new VError.WError({ name: 'FieldsValidationError', info: { error: 'id is required'} }, 'Fail validating fields');
    }
    const result = await ProductsService.detail(req.params.productId);
    res.json(result);
  } catch (error) {
    return next(error);
  }
}
export async function createProduct (req, res, next) {
  try {
    if (!req.body.SKU) {
      throw new VError.WError({ name: 'FieldsValidationError', info: { error: 'SKU is required'} }, 'Fail validating fields');
    }
    const result = await ProductsService.create(req.body);
    res.json(result);
  } catch (error) {
    return next(error);
  }
}
export async function updateProduct (req, res, next) {
  try {
    if (!req.params.productId) {
      throw new VError.WError({ name: 'FieldsValidationError', info: { error: 'id is required'} }, 'Fail validating fields');
    }
    if (req.body.SKU) {
      throw new VError.WError({ name: 'FieldsValidationError', info: { error: 'SKU is unmodificable'} }, 'Fail validating fields');
    }
    const result = await ProductsService.update(req.params.productId, req.body);
    res.json(result);
  } catch (error) {
    return next(error);
  }
}
export async function deleteProduct (req, res, next) {
  try {
    if (!req.params.productId) {
      throw new VError.WError({ name: 'FieldsValidationError', info: { error: 'id is required'} }, 'Fail validating fields');
    }
    const result = await ProductsService.deleteProduct(req.params.productId);
    res.json(result);
  } catch (error) {
    return next(error);
  }
}