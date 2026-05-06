const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    barcode: {
      type: String,
      required: [true, 'Barcode is required'],
      unique: true,
    },
    brand: { type: String, trim: true },
    category: { type: String, trim: true },
    description: { type: String },
    isAuthentic: { type: Boolean, default: true },
    trustScore: { type: String, default: "99.9%" },
    price: { type: Number, default: 0 },
    stores: [
      {
        name: String,
        location: String,
        inStock: Boolean,
        price: Number,
      },
    ],
    imageUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
