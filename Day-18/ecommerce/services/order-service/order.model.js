const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name:      { type: String },
  price:     { type: Number },
  quantity:  { type: Number }
});

const orderSchema = new mongoose.Schema({
  userId:      { type: String, required: true },
  items:       [orderItemSchema],
  totalAmount: { type: Number },
  status: {
    type:    String,
    enum:    ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);