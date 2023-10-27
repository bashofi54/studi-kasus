const router = require('express').Router();
const { police_check } = require('../../middlewares');
const tagCntrl = require('./controller');

router.get('/tags',
  tagCntrl.index
);

router.post('/tags', 
  police_check('create', 'Tag'),
  tagCntrl.store
);

router.put('/tags/:id',
  police_check('create', 'Tag'),
  tagCntrl.update
);

router.delete('/tags/:id',
  police_check('create', 'Tag'),
  tagCntrl.destroy
);

module.exports = router;