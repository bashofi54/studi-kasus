const { police_check } = require("../../middlewares");
const router = require("express").Router();
const cartCntrl = require('./constroller');

router.put('/carts',
  police_check('update', 'Cart'),
  cartCntrl.update
);

router.get('/carts',
police_check('read', 'Cart'),
cartCntrl.index
);

module.exports = router;