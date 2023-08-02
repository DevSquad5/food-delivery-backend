const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'customer', required: true },
  orderStatus: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  deliveryCharge: { type: Number, required: true },
  paymentStatus: { type: String, required: true },
  specialInstruction: { type: String, required: true },
}, {
  versionKey: false,
  timestamps: true,
});

const Order = mongoose.model('order', dataSchema);

module.exports = Order;
