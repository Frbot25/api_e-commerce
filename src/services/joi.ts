import Joi from 'joi';

// const userschema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string()
//     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
//     .required(),
//   password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
//   repeat_password: Joi.ref('password'),
//   access_token: [Joi.string(), Joi.number()],
// })
//   .with('username', 'birth_year')
//   .xor('password', 'access_token')
//   .with('password', 'repeat_password');
// const loginSchema = Joi.object({
//   email: Joi.string()
//     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
//     .required(),
//   password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
// });

export const validateLogin = (input: object) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
      .required(),
    password: Joi.string()
      .required()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  });
  return schema.validate(input);
};
