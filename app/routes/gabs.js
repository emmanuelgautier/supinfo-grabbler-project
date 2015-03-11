'use strict';

var express = require('express'),
    router  = express.Router();

var gabs    = require('../controllers/gabs');

router
  .get('/', gabs.list)
  .post('/create', gabs.create)
  .get('/:id', gabs.show)
  .put('/update/:id', gabs.update)
  .del('/delete/:id', gabs.delete);

module.exports = {
  use: '/gabs',
  router: router
};
