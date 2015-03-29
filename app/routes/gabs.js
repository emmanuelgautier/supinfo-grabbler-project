'use strict';

var gabs    = require('../controllers/gabs');

var routes = [{
    method: 'GET',
    path: '/gabs/',
    handler: gabs.list
  }, {
    method: 'POST',
    path: '/gabs/create',
    handler: gabs.create
  }, {
    method: 'GET',
    path: '/gabs/{gab}',
    handler: gabs.show
  }, {
    method: 'PUT',
    path: '/gabs/{gab}',
    handler: gabs.update
  }, {
    method: 'DELETE',
    path: '/gabs/{gab}',
    handler: gabs.delete
  }
]

module.exports = routes;
