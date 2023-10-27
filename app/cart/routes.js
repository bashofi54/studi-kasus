const { police_check } = require("../../middlewares");
const router = require("express").Router();
const cartCntrl = require('./controller');

router.post('/carts',
  // police_check('update', 'Cart'),
  cartCntrl.store
);

router.post('/carts/increment/:productId',
  // police_check('update', 'Cart'),
  cartCntrl.increment
);

router.post('/carts/decrement/:productId',
  police_check('update', 'Cart'),
  cartCntrl.decrement
);

router.get('/carts',
police_check('read', 'Cart'),
cartCntrl.index
);
router.post('/carts/:productId',
police_check('read', 'Cart'),
cartCntrl.destroy
);
router.put('/carts/:userId',
police_check('read', 'Cart'),
cartCntrl.deletee
);

module.exports = router;