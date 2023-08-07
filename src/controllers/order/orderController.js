const Order = require('../../models/order/orderModel');
const OrderItem = require('../../models/order/orderItemModel');
const OrderAddress = require('../../models/order/orderAddressModel');
const ItemModel = require('../../models/MenuItem/ItemModel');
const CustomerLocation = require('../../models/customer/customerAddressModel');

// POST request to create a new order
const plaseOrder = async (req, res) => {
  try {
    const {
      customerId,
      orderType,
      paymentMethod,
      deliveryAddress,
      orderItems,
      orderNote,
    } = req.body;

    // Calculate total order amount and discount amount
    let totalAmount = 0;
    let discountAmount = 0;

    const orderItemPromises = orderItems.map(async (item) => {
      const { itemId, quantity } = item;
      const orderItem = await ItemModel.findById(itemId).exec();
      console.log(orderItem);
      const productPrice = orderItem.UnitPrice;
      const discountPercentage = orderItem.Discount;

      const itemDiscountAmount = (productPrice * discountPercentage) / 100;
      const totalPriceWithDiscount = productPrice - itemDiscountAmount;
      totalAmount += totalPriceWithDiscount * quantity;
      discountAmount += itemDiscountAmount * quantity;
    });

    // Wait for all the order item promises to complete concurrently
    await Promise.all(orderItemPromises);

    console.log('totalAmount', totalAmount, 'discountAmount', discountAmount);

    // Check if the delivery address is a new address (not selected from existing addresses)
    let orderAddress;
    if (deliveryAddress.isNewAddress) {
      // Create the new address and associate it with the customer
      orderAddress = new OrderAddress({
        address: deliveryAddress.address,
        address_type: deliveryAddress.addressType,
        floor: deliveryAddress.floor,
        house: deliveryAddress.house,
        lat: deliveryAddress.lat,
        lng: deliveryAddress.lng,
        road: deliveryAddress.road,
      });
      await orderAddress.save();
    } else {
      // If the delivery address is not a new address, use the selected address ID from the frontend
      orderAddress = await CustomerLocation.findOne({
        _id: deliveryAddress.addressId,
      }).exec();
    }

    // Create the order
    const order = new Order({
      customerId,
      addressId: orderAddress._id,
      orderType,
      paymentMethod,
      discountAmount,
      orderAmount: totalAmount,
      orderNote,
    });

    // Save the order to the database
    await order.save();

    // Create order items and associate them with the order
    const createOrderItemPromises = orderItems.map(async (item) => {
      const { itemId, quantity } = item;
      const orderItem = await ItemModel.findOne({ _id: itemId }).exec();
      return OrderItem.create({
        orderId: order._id,
        productId: orderItem._id,
        quantity,
        price: orderItem.UnitPrice,
      });
    });

    // Wait for all the order item promises to complete concurrently
    await Promise.all(createOrderItemPromises);

    res.status(201).json({ status: 'success', data: order });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create the order.',
      error: error.message,
    });
  }
};

module.exports = { plaseOrder };
