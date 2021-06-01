import { Request, Response } from 'express';
import { CancelOrderReqType, CancelOrderReqSchema } from './types';
import { InvalidReqContentResponse, InvalidReqStructureResponse, sendResponse, Statuses } from "../ApiResponse";
import { validateReqType } from "../../types";

export const cancelOrder = async (req: Request, res: Response): Promise<void> => {
  
  const reqBody: CancelOrderReqType = req.body;
  if(!validateReqType(reqBody, CancelOrderReqSchema)) {
    return sendResponse(res, InvalidReqStructureResponse);
  }
  
  
  res.status(200).send({ msg: "Order canceled" });
}