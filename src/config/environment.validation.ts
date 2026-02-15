import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production', 'staging')
    .default('development'),
  // Railway provides DATABASE_URL or individual DB vars
  DATABASE_URL: Joi.string().optional(),
  DB_PORT: Joi.number().port().optional().default(5432),
  DB_PASSWORD: Joi.string().optional(),
  DB_HOST: Joi.string().optional(),
  DB_USERNAME: Joi.string().optional(),
  DB_NAME: Joi.string().optional(),
  DB_SYNC: Joi.string().optional(),
  DB_AUTOLOAD: Joi.string().optional(),
  DB_ENV: Joi.string().optional(),
  PROFILE_API_KEY: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_TOKEN_AUDIENCE: Joi.string().required(),
  JWT_TOKEN_ISSUER: Joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: Joi.number().required(),
  JWT_REFRESH_TOKEN_TTL: Joi.number().required(),
  API_VERSION: Joi.string().required(),
  MAIL_HOST: Joi.string().required(),
  SMTP_USERNAME: Joi.string().required(),
  SMTP_PASSWORD: Joi.string().required(),
});
