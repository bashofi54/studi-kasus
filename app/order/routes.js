const router = require("express").Router();
const { police_check } = require("../../middlewares");
const orderCntrl = require('./controller');

router.post('/orders',
  police_check('create', 'Order'),
  orderCntrl.store
);

router.get('/orders',
  police_check('view', 'Order'),
  orderCntrl.index
);

module.exports = router;