const router = require('express').Router();
const invoiceCntrl = require('./controller');

router.get('/invoices/:order_id', invoiceCntrl.show);

module.exports = router;