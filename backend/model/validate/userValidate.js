const Joi = require('joi');

// schema to validate signup
const user_schema = Joi.object({
    username : Joi.string().required(),
    email : Joi.string().email().required(),
    password: Joi.string().required()
});


// schema to validate login
const user_login_schema = Joi.object({
    email : Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = {user_schema,user_login_schema};