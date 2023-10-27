const router = require('express').Router();
const { police_check } = require('../../middlewares');
const categoryCntrl = require('./controller');

router.get('/categories',
  categoryCntrl.index
);

router.post('/categories',
  police_check('create', 'Category'),
  categoryCntrl.store
);
router.put('/categories/:id',
  police_check('update', 'Category'),
  categoryCntrl.update
);

router.delete('/categories/:id',
  police_check('delete', 'Category'),
  categoryCntrl.destroy
);

module.exports = router;