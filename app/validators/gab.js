'use strict';

var Joi = require('joi');

var required = ['gab'],
    keys = {
      gab: Joi.string().max(255)
    };

exports.required = required;
exports.keys = keys;
