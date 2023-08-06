// const mongoose = require('mongoose');

// const dataSchema = new mongoose.Schema({
//   customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'customer', required: true },
//   orderStatus: { type: String, required: true },
//   totalAmount: { type: Number, required: true },
//   deliveryAddress: { type: String, required: true },
//   deliveryCharge: { type: Number, required: true },
//   paymentStatus: { type: String, required: true },
//   specialInstruction: { type: String, required: true },
// }, {
//   versionKey: false,
//   timestamps: true,
// });

// const Order = mongoose.model('order', dataSchema);

// module.exports = Order;

// const orderSchema = new mongoose.Schema({
//   address: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Address',
//     required: true,
//   },
//   order_type: {
//     type: String,
//     enum: ['delivery', 'takeaway', 'dine-in'],
//     required: true,
//   },
//   payment_method: {
//     type: String,
//     enum: ['cash_on_delivery', 'credit_card', 'paypal', 'other'],
//     required: true,
//   },
//   orderItem: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'CartItem',
//       required: true,
//     },
//   ],
//   discount_amount: {
//     type: Number,
//     default: 0,
//   },
//   delivery_instruction: String,
//   order_amount: {
//     type: Number,
//     required: true,
//   },
//   order_note: String,
// });

// const Order = mongoose.model('Order', orderSchema);

// module.exports = Order;

// // schema for address

// const addressSchema = new mongoose.Schema({
//   address: {
//     type: String,
//     required: true,
//   },
//   address_type: String,
//   floor: String,
//   house: String,
//   lat: Number,
//   lng: Number,
//   road: String,
// });

// const Address = mongoose.model('Address', addressSchema);

// module.exports = Address;

// // schema for order item

// const cartItemSchema = new mongoose.Schema({
//   food_id: Number,
//   price: Number,
//   quantity: Number,
// });

// const CartItem = mongoose.model('CartItem', cartItemSchema);

// module.exports = CartItem;
