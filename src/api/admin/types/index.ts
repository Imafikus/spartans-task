import Joi from 'joi';

export const AdminReqSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export interface AdminReqType {
  username: string,
  password: string
}