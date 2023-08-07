const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'order', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  quantity: { type: Number, required: true },
});

const OrderItem = mongoose.model('orderItem', dataSchema);
module.exports = OrderItem;
