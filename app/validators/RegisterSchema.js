'use strict';

var Joi = require('joi');

var RegisterSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
}).with('username', 'password');

module.exports = RegisterSchema;
