const Joi = require('joi');

const addGenreSchema = Joi.object()
  .options({
    abortEarly: false,
  })
  .keys({    
      name: Joi.string().min(3).max(40).required(),
  });

module.exports = addGenreSchema;