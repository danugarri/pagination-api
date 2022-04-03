import _ from 'lodash';
import Validator from 'better-validator';
import VError from 'verror';

export function createReadOnlyProxy (obj) {
  return new Proxy(obj, {
    get: function (_target, key) {
      if (!Object.getOwnPropertyNames(obj).includes(key)) {
        return obj[key];
      }
      if (key === 'toJSON') {
        return () => obj;
      }
      switch (typeof obj[key]) {
      case 'string':
      case 'number':
      case 'boolean':
        return obj[key];
      default:
        if (typeof obj[key] === 'undefined') {
          return undefined;
        } else if (obj[key] === null) {
          return null;
        }
        return createReadOnlyProxy(obj[key]);
      }
    },
    set: function () {
      return false;
    }
  });
}

export function validateRequest (request, validations) {
  let allowedFields = ['params', 'query', 'body', 'file'];
  const validator = new Validator();
  validator(request).required().isObject(req => {
    let properties = _(request)
      .pick(allowedFields)
      .reduce((accum, value, key) => {
        let propValidator;
        req(key).isObject(validator => { propValidator = validator; });
        accum[key] = propValidator;
        return accum;
      }, {});

    validations(properties);
  });
  let errors = validator.run();
  if (validator.run().length) return new VError.WError({ name: 'FieldsValidationError', info: errors }, 'Fail validating fields');
}