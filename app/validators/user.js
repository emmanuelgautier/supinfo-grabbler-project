'use strict';

var Joi = require('joi');

var required = ['username', 'password', 'email', 'gender', 'birthdate'],
    keys = {
      username: Joi.string().alphanum().min(3).max(50),
      password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
      email: Joi.string().email(),
      gender: Joi.only(['m', 'f']),
      firstname: Joi.string().min(2).max(50),
      lastname: Joi.string().min(2).max(50),
      birthdate: Joi.date()
    };

exports.required = required;
exports.keys = keys;
