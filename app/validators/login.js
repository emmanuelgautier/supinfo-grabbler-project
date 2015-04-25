'use strict';

var Joi = require('joi');

var required = ['username', 'password'],
    keys = {
      username: Joi.string(),
      password: Joi.string()
    };

exports.required = required;
exports.keys = keys;
