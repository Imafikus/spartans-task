import { Request, Response } from 'express';
import { CheckOrderReqType, CheckOrderReqSchema } from './types';
import { InvalidReqContentResponse, InvalidReqStructureResponse, sendResponse, Statuses } from "../ApiResponse";
import { validateReqType } from "../../types";
import { getOrderById } from '../../db';
import { Types } from 'mongoose';
import { calculateOrderWaitTime } from './utils';


export const checkOrder = async (req: Request, res: Response): Promise<void> => {
  
  const reqBody: CheckOrderReqType = req.body;
  if(!validateReqType(reqBody, CheckOrderReqSchema)) {
    return sendResponse(res, InvalidReqStructureResponse);
  }
  
  if(!Types.ObjectId.isValid(reqBody.id)) {
    return sendResponse(res, InvalidReqContentResponse); 
  }
  
  const order = await getOrderById(reqBody.id);
  if(!order) {
    res.status(Statuses.badRequest).send({ msg: 'Order doesnt exist' });
    return;
  }
  
  // if(order.active) {
  //   res.status(Statuses.ok).send({ msg: 'Order is still being processed' });
  //   return;
  // }
  const waitTime = await calculateOrderWaitTime(reqBody.id);
  console.log('Order wait time: ', waitTime);
  
  res.status(Statuses.ok).send({ msg: "Order is finished" });
}