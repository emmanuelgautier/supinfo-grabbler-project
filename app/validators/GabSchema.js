'use strict';

var Joi = require('joi');

var GabSchema = Joi.object().keys({
  gab: Joi.string().max(255).required()
});

module.exports = GabSchema;
