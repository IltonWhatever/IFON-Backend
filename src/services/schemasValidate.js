const Joi = require('joi');

const Shemas = {
  areaValidate: Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .pattern(new RegExp('^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$'))
      .required(),
  }),

  userValidate: Joi.object({
    name: Joi.string().min(3).max(30).pattern(new RegExp('[A-Z][a-z]* [A-Z][a-z]*')).required(),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required(),

    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

    telephone: Joi.string().pattern(new RegExp('^([1-9]{2}) (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$')),

    is_ifce: Joi.boolean().truthy('1'),

    is_active: Joi.boolean().truthy('1'),

    campus_id: Joi.string()
      .guid({
        version: ['uuidv4', 'uuidv5'],
      })
      .required(),

    permissions_id: Joi.string()
      .guid({
        version: ['uuidv4', 'uuidv5'],
      })
      .required(),
  }),

  campiValidate: Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),

    adress: Joi.string().min(5).max(150).required(),
  }),

  fileValidate: Joi.object({
    publications_id: Joi.string()
      .guid({
        version: ['uuidv4', 'uuidv5'],
      })
      .required(),
  }),

  permissaoValidade: Joi.object({
    name: Joi.string().alphanum().min(3).max(50).required(),
  }),

  newPasswordValidade: Joi.object({
    password: Joi.string().alphanum().min(8).max(50).required(),
  }),

  publicationValidade: Joi.object({
    title: Joi.string().min(3).max(250).required(),
    content: Joi.required(),
    isInternalIfce: Joi.boolean().truthy('1'),
    status: Joi.boolean().truthy('1'),
    typeId: Joi.string()
      .guid({
        version: ['uuidv4', 'uuidv5'],
      })
      .required(),
    shares_quantity: Joi.number().integer(),
    areas: Joi.array().optional(),
    userId: Joi.string()
      .guid({
        version: ['uuidv4', 'uuidv5'],
      })
      .required(),
    cover: Joi.any().optional(),
    attachments: Joi.any().optional(),
  }),
};

module.exports = Shemas;
