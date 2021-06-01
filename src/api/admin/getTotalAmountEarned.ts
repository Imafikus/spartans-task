import { Request, Response } from 'express';
import { getAllFinishedOrders } from '../../db';
import { envVal } from '../../envVal';
import { validateReqType } from "../../types";
import { InvalidReqStructureResponse, sendResponse, Statuses } from "../ApiResponse";
import { calculateCost } from '../order/utils';
import { AdminReqSchema, AdminReqType } from './types';
export const getTotalAmountEarned = async (req: Request, res: Response): Promise<void> => {
  
  const reqBody: AdminReqType = req.body;
  
  if(!validateReqType(reqBody, AdminReqSchema)) {
    return sendResponse(res, InvalidReqStructureResponse);
  }
  
  if(req.body.username !== envVal.adminUser || req.body.password !== envVal.adminPass) {
    res.status(Statuses.forbidden).send({ msg: 'Bad credentials'});
  }
  
  const finishedOrders = await getAllFinishedOrders();
  
  let totalAmountEarned = 0;
  
  for (const order of finishedOrders) {
    totalAmountEarned += await calculateCost(order);
  }
  

  
  res.status(Statuses.ok).send({ totalAmountEarned });
}