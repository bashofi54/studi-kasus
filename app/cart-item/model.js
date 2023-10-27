const mongoose = require("mongoose");
const {Schema} = mongoose;

const cartSchema = Schema({
  userId: {type: Schema.Types.ObjectId, ref: "User"},
  cartItems: [
    {
      productId: {type: String},
      name: {type: String},
      qty: {
        type: Number,
        default: 1,
        required: true,
        min: [1, "minimal qty adalah 1"],
      },
      price: {type: Number},
    },
  ],
});

module.exports = mongoose.model("Carts", cartSchema);
