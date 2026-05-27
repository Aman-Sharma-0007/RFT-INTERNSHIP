require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const Order = require('./order.model');
const axios = require('axios');

// POST /api/orders/place
exports.placeOrder = async (req, res) => {
  const { userId } = req.body;

  try {
    // 1. fetch cart from cart-service
    const { data: cart } = await axios.get(
      `http://localhost:${process.env.CART_SERVICE_PORT}/api/cart/${userId}`
    );

    if (!cart.items || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // 2. reduce stock for each item via product-service
    for (const item of cart.items) {
      await axios.patch(
        `http://localhost:${process.env.PRODUCT_SERVICE_PORT}/api/products/${item.productId}/stock`,
        { quantity: item.quantity }
      );
    }

    // 3. calculate total
    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );

    // 4. save order
    const order = new Order({
      userId,
      items: cart.items,
      totalAmount,
      status: 'confirmed'
    });
    await order.save();

    // 5. clear cart after order placed
    await axios.delete(
      `http://localhost:${process.env.CART_SERVICE_PORT}/api/cart/${userId}/clear`
    );

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/orders/user/:userId  ← BONUS: order history per user
exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};