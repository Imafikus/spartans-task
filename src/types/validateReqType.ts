import Joi from "joi";

export const validateReqType = (req: any, schema: Joi.ObjectSchema<any>): boolean => {

  const validation = schema.validate(req);

  if(validation.error){
    console.log(validation);
    return false;
  }
  return true;
};
