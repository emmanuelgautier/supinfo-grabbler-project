'use strict';

var Joi = require('joi');

var required = ['gab'],
    keys = {
      gab: Joi.string().max(255),
      user: Joi.string().alphanum().min(3).max(50)
    };

exports.required = required;
exports.keys = keys;
