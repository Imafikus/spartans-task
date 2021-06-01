import Joi from 'joi';

export interface PostOrderReqType {
  ingredients: Array<string>,
  size: string,
  firstName: string,
  lastName: string,
  phoneNumber: string
}

export const PostOrderReqSchema = Joi.object({
  ingredients: Joi.array().items(Joi.string()),
  size: Joi.string().valid('small', 'medium', 'large').required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phoneNumber: Joi.string().regex(/^[0-9]{10}$/).required()
});

export interface CancelOrderReqType {
  id: string
}

export const CancelOrderReqSchema = Joi.object({
  id: Joi.string().required(),
});

export interface CheckOrderReqType {
  id: string
}

export const CheckOrderReqSchema = Joi.object({
  id: Joi.string().required(),
});