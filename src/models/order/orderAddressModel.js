const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  addressType: {
    type: String,
    enum: ['Home', 'Office', 'Other'],
  },
  floor: String,
  house: String,
  lat: Number,
  lng: Number,
  road: String,
});

const OrderAddress = mongoose.model('OrderAddress', addressSchema);

module.exports = OrderAddress;
