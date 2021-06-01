import { Request, Response } from 'express';
import { PostOrderReqType, PostOrderReqSchema } from './types';
import { validateReqType } from "../../types";
import { InternalServerErrorResponse, InvalidReqContentResponse, InvalidReqStructureResponse, sendResponse, Statuses } from "../ApiResponse";

export const postOrder = async (req: Request, res: Response): Promise<void> => {

  const reqBody: PostOrderReqType = req.body;
  
  if(!validateReqType(reqBody, PostOrderReqSchema)) {
    return sendResponse(res, InvalidReqStructureResponse);
  }
  
  console.log(reqBody);
  
  
  res.status(200).send({ msg: "post order" });
}