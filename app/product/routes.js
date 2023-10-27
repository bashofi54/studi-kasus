const router = require('express').Router();
const multer = require('multer');
const os = require('os');
const { police_check } = require('../../middlewares');

const prodCntrl = require('./controller');

router.get('/products',
  prodCntrl.index
);

router.post('/products',
  multer({ dest: os.tmpdir() }).single('image_url'),
  police_check('create', 'Product'),
  prodCntrl.store
);

router.put('/products/:id',
  multer({ dest: os.tmpdir() }).single('image_url'),
  police_check('update', 'Product'),
  prodCntrl.update
);

router.delete('/products/:id',
  police_check('delete', 'Product'),
  prodCntrl.destroy
);

module.exports = router;