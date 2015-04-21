'use strict';

var gabs = require('../controllers/gabs');

var routes = [{
    method: 'GET',
    path: '/gabs/count',
    config: {
      handler: gabs.count,
      auth: 'session'
    }
  }, {
    method: 'POST',
    path: '/gabs',
    config: {
      handler: gabs.create,
      auth: 'session'
    }
  }, {
    method: 'GET',
    path: '/gabs/{gab}',
    handler: gabs.show
  }, {
    method: 'DELETE',
    path: '/gabs/{gab}',
    config: {
      handler: gabs.delete,
      auth: 'session'
    }
  }
]

module.exports = routes;
