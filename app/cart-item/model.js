const mongoose = require('mongoose');
const {Schema} = mongoose;

const cartItemSchema = Schema({
  name: {
    type: String,
    minlength: [50, 'Panjang nama makanan minimal 50 karakter'],
    required: [true, 'Name must be filled']
  },

  qty: {
    type: String,
    required: [true, 'qty harus diisi'],
    min: [1, 'minimal qty adalah 1']
  },

  price: {
    type: Number,
    default: 0
  },

  image_url: String,

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }
});

module.exports = mongoose.model('CartItem', cartItemSchema);