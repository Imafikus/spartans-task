import { Request, Response } from 'express';
import { CancelOrderReqType, CancelOrderReqSchema } from './types';
import { InvalidReqContentResponse, InvalidReqStructureResponse, sendResponse, Statuses } from "../ApiResponse";
import { validateReqType } from "../../types";
import { getOrderById, deleteOrderById } from '../../db';
import { Types } from 'mongoose';


export const cancelOrder = async (req: Request, res: Response): Promise<void> => {
  
  const reqBody: CancelOrderReqType = req.body;
  if(!validateReqType(reqBody, CancelOrderReqSchema)) {
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
  
  if(!order.active) {
    res.status(Statuses.forbidden).send({ msg: 'Order is no longer active' });
    return;
  }
  
  await deleteOrderById(reqBody.id);
  res.status(200).send({ msg: "Order canceled" });
}