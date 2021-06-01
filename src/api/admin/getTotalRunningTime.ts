import { Request, Response } from 'express';
import { getAllOrders } from '../../db';
import { envVal } from '../../envVal';
import { validateReqType } from "../../types";
import { InvalidReqStructureResponse, sendResponse, Statuses } from "../ApiResponse";
import { AdminReqSchema, AdminReqType } from './types';
export const getTotalRunningTime = async (req: Request, res: Response): Promise<void> => {
  
  const reqBody: AdminReqType = req.body;
  
  if(!validateReqType(reqBody, AdminReqSchema)) {
    return sendResponse(res, InvalidReqStructureResponse);
  }
  
  if(req.body.username !== envVal.adminUser || req.body.password !== envVal.adminPass) {
    res.status(Statuses.forbidden).send({ msg: 'Bad credentials'});
  }
  
  const allOrders = await getAllOrders();
  allOrders.sort((a, b) => {
    return b.timestamp - a.timestamp;
  })
  
  const totalTimeInMs = allOrders[0].timestamp - allOrders.slice(-1)[0].timestamp;
  

  
  res.status(Statuses.ok).send({ totalTimeInMs });
}