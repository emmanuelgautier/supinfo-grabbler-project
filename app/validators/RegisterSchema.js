'use strict';

var Joi = require('joi');

var RegisterSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(50).required(),
  password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
  email: Joi.string().email().required(),
  firstname: Joi.string().min(2).max(50).required(),
  lastname: Joi.string().min(2).max(50).required(),
  birthdate: Joi.date().required()
}).with('username', 'password');

module.exports = RegisterSchema;
