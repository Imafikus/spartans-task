import { Request, Response } from 'express';
import { DuplicateOrderReqType, DuplicateOrderReqSchema, PostOrderReqType } from './types';
import { InvalidReqContentResponse, InvalidReqStructureResponse, sendResponse, Statuses } from "../ApiResponse";
import { validateReqType } from "../../types";
import { getOrderById, saveOrder } from '../../db';
import { Types } from 'mongoose';
import { findPlaceInQueueAndWaitTime } from './utils';


export const duplicateOrder = async (req: Request, res: Response): Promise<void> => {
  
  const reqBody: DuplicateOrderReqType = req.body;
  if(!validateReqType(reqBody, DuplicateOrderReqSchema)) {
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
  
  const newOrder: PostOrderReqType = {
    firstName: reqBody.firstName,
    lastName: reqBody.lastName,
    phoneNumber: reqBody.phoneNumber,
    ingredients: order.ingredients,
    size: order.size
  };
  
  const id = await saveOrder(newOrder);
  res.status(Statuses.ok).send({ msg: await findPlaceInQueueAndWaitTime(id) });
}