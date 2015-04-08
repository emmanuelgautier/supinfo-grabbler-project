'use strict';

var Joi = require('joi');

var LoginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
}).with('username', 'password');

module.exports = LoginSchema;
