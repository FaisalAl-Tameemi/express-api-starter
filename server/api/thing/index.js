/**
 * ROUTES preprended with `/api/things/`
 */


const express = require('express');
const controller = require('./thing.controller'); // load response functions

const router = express.Router(); // load the router object

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
