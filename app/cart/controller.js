const Product = require('../product/model');
const Carts = require('../cart-item/model');

// const store = async (req, res) => {
//   const user = req.user; 
//   const {cartItems:[{productId, name, price, qty}]} = req.body

//   await Carts.findOne({ userId: user._id}).exec((err, cart) => {
//     if(err) return res.status(400).json({err});
//     if(cart) {
//       // const productId = req.body.cartItems.productId;
//       console.log('productId', productId, qty, price, name)
//       const item = cart.cartItems.find((p) => p.productId == productId)
//       console.log('item', item)
//       if(item) {
//         Carts.findOneAndUpdate(
//           {userId: user._id, productId: productId },
//           { $inc: {
//             'cartItems.$[].qty': 1,
//             'cartItems.$[].price' : price
//             }
//           },
//         ).exec((err, cart_) => {
//           if(err) return res.status(400).json({err});
//           if(cart_) {
//             return res.status(201).json({ cart: cart_ });
//           }
//         });
//       } else {
//         Carts.findOneAndUpdate(
//           { userId: req.user._id },
//           {
//             $push : {
//               cartItems: req.body.cartItems
//             }
//           }
//         ).exec((err, cart_) => {
//           if(err) return res.status(400).json({err});
//           if(cart_) {
//             return res.status(201).json({cart: cart_});
//           }
//         });
//       }
//     } else {
//       const cart = new Carts({
//         userId: req.user._id,
//         cartItems: req.body.cartItems
//       });
//       cart.save((err, cart) => {
//         if(err) return res.status(400).json({err});
//         if(cart) {
//           return res.status(200).json({cart})
//         }
//       })
//     }
//   })
// }
// const store = async (req, res) => {
//   const { productId, name, qty, price } = req.body;
//   const user = req.user;

//   try {
//     let cartt = await Carts.findOne({ userId: user._id})
//     console.log('cartt', cartt)

//     if(cartt) {
//       let item = (p) => p.productId == productId;
//       let item2 = (p) => p.productId != productId;
//       console.log('item', item)

//       if(item) {
//         cartt.qty = cartt.qty + qty;
//         cartt.price = cartt.qty * price
//       } else if (item2) {
//         cartt.push({ productId, name, qty, price })
//       } else {
//         return res.status(400).json({
//             code: 400,
//             message: "Invalid request"
//         })
//       }
//       await cartt.save();
//     } else {
//       let cartt = new Carts({productId, name, qty, price, userId: user._id});
//       await cartt.save();
//       return res.json(cartt)
//     }
//   } catch (err) {
//     if(err && err.name === 'ValidationError') {
//       return res.json({
//         error: 1,
//         message: err.message,
//         field: err.errors
//       });
//     }
//   }
// };

const store = async (req, res) => {
  const user = req.user;
  const { cartItems: [{ productId, name, price, qty}] } = req.body;

  try {
    const cart = await Carts.findOne({ userId: user._id });
    console.log('cart2', cart);
    
    if (cart) {
      const item = cart.cartItems.findIndex((p) => p.productId == productId);
      console.log('item', item, price, productId );

      if (item > -1) {
        let productItem = cart.cartItems[item];
        console.log('productItem' , productItem);
        productItem.qty = productItem.qty + 1;
        productItem.price = productItem.qty * price;
      } else {
        cart.cartItems.push({ productId: productId, qty: qty, name: name, price: price })
      }
      await cart.save();
      console.log('cart3', cart)
      return res.status(201).json({cart});
    } else {
      const cart = await Carts.create({
        userId: user._id,
        cartItems: [{ productId: productId, qty: qty, name: name, price: price }]
      });
      console.log('cart1', cart)
      return res.status(201).json({cart})
    }
  } catch (err) {
    if (err) return res.status(400).json(err)
  }
};

const increment = async (req, res, next) => {
  const user = req.user;
  const { cartItems: [{ productId }] } = req.body;
  
  try {
    const cart = await Carts.findOne({ userId: user._id });
    console.log('cart2', cart);
    const prod = await Product.findOne({ _id: productId});
    console.log('prod', prod);
    const price = prod.price;
    
    if (cart) {
      const item = cart.cartItems.findIndex((p) => p.productId == productId);
      console.log('item', item, productId );

      if (item > -1) {
        let productItem = cart.cartItems[item];
        console.log('productItem' , productItem);
        productItem.qty = productItem.qty + 1;
        productItem.price = productItem.qty * price;
      }
      await cart.save();
      console.log('cart3', cart)
      return res.status(201).json({cart});
    } 
  } catch (err) {
    if (err) return res.status(400).json(err)
  }
};

const decrement = async (req, res, next) => {
  const user = req.user;
  const { cartItems: [{ productId,}] } = req.body;
  
  try {
    const cart = await Carts.findOne({ userId: user._id });
    console.log('cart2', cart);
    const prod = await Product.findOne({ _id: productId});
    console.log('prod', prod);
    const price = prod.price;
    
    if (cart) {
      const item = cart.cartItems.findIndex((p) => p.productId == productId);
      console.log('item', item, productId );

      if (item > -1) {
        let productItem = cart.cartItems[item];
        console.log('productItem' , productItem);
        productItem.qty = productItem.qty - 1;
        productItem.price = productItem.qty * price;
      }
      await cart.save();
      console.log('cart3', cart)
      return res.status(201).json({cart});
    } 
  } catch (err) {
    if (err) return res.status(400).json(err)
  }
};

const index = async (req, res, next) => {
  try {
    let items = await Carts.find({})
      return res.json(items);
  } catch (err) {
    if(err && err.name === 'ValidationError') {
      return res.json({
        error: 1,
        message: err.message,
        field: err.errors
      });
    }
    next()
  }
};

const destroy = async (req, res, next) => {
  const user = req.user;
  const { cartItems: [{ productId,}] } = req.body;
  
  try {
    const cart = await Carts.findOne({ userId: user._id });
    console.log('cart2', cart);
    
    if (cart) {
      const item = cart.cartItems.findIndex((p) => p.productId == productId);
      console.log('item', item, productId );
      
      cart.cartItems.splice(item, 1)
      await cart.save();
      console.log('cart3', cart)
      return res.status(201).json({cart});
    } 
  } catch (err) {
    if (err) return res.status(400).json(err)
  }

};

const deletee = async (req, res, next) => {
  const user = req.user;
  
  try {
    const cart = await Carts.findOne({ userId: user._id });
    console.log('cart2', cart);
    cart.cartItems = [];
    await cart.save()
    return res.status(201).json({message: 'CartItems berhasil diubah menjadi null'});

  } catch (err) {
    if (err) return res.status(400).json(err)
  }

};


module.exports = {
  index,
  store,
  increment,
  decrement,
  destroy,
  deletee
}