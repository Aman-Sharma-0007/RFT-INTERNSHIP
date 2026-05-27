require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const Cart = require('./cart.model');
const axios = require('axios');
// GET /api/cart/:userId
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/cart/add
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
// ADD THESE TWO LINES
  console.log('Request body:', req.body);
  console.log('Product service URL:', `http://localhost:${process.env.PRODUCT_SERVICE_PORT}/api/products/${productId}`);
  try {
    // validate product exists in product-service
    const { data: product } = await axios.get(
      `http://localhost:${process.env.PRODUCT_SERVICE_PORT}/api/products/${productId}`
    );

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      item => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        name:     product.name,
        price:    product.price,
        quantity
      });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/cart/:userId/:productId
exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    cart.items = cart.items.filter(
      item => item.productId.toString() !== req.params.productId
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/cart/:userId  ← called internally by order-service after order placed
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    cart.items = [];
    await cart.save();
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};