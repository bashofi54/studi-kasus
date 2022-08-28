const router = require('express').Router();
const { police_check } = require('../../middlewares');
const delivAddCntrl = require('./controller');

router.get('/delivery-addresses',
  police_check('view', 'DeliveryAddress'),
  delivAddCntrl.index
);

router.post('/delivery-addresses',
  police_check('create', 'DeliveryAddress'),
  delivAddCntrl.store
);

router.put('/delivery-addresses/:id',
  delivAddCntrl.update
);

router.delete('/delivery-addresses/:id',
  delivAddCntrl.destroy
);

module.exports = router;