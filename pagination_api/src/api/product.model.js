'use strict';

import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  SKU: { type: String, required: true, index: true, unique: true },
  description: { type: String },
  active: { type: Boolean },
  price: { type: Number },
  name: { type: String },
});

export default mongoose.model('Product', ProductSchema);
