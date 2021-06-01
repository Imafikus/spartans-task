import { Request, Response } from 'express';
import { PostOrderReqType, PostOrderReqSchema } from './types';
import { validateReqType } from "../../types";
import { InvalidReqContentResponse, InvalidReqStructureResponse, sendResponse, Statuses } from "../ApiResponse";
import { getAllIngredientNames, getAllActiveOrders, saveOrder } from '../../db';

const duplicatesExist = (arr: Array<string>): boolean => {
  return new Set(arr).size !== arr.length;
}

const containsValidIngredients = async (ingredientList: Array<string>): Promise<boolean> => {
  
  if(duplicatesExist(ingredientList)) {
    return false;
  }
  
  const allIngredientNames = await getAllIngredientNames();
  return ingredientList.every(val => allIngredientNames.includes(val));
}

export const postOrder = async (req: Request, res: Response): Promise<void> => {

  const reqBody: PostOrderReqType = req.body;
  
  if(!validateReqType(reqBody, PostOrderReqSchema)) {
    return sendResponse(res, InvalidReqStructureResponse);
  }
  
  const allActiveOrders = await getAllActiveOrders();
  
  if(allActiveOrders.length > 15) {
    res.status(Statuses.notAllowed).send({msg: 'Too many active orders, try again later'});
    return;
  }
  
  if(! await containsValidIngredients(reqBody.ingredients)) {
    return sendResponse(res, InvalidReqContentResponse);
  }
  
  const id = await saveOrder(reqBody);
  res.status(Statuses.ok).send({ msg: `Order saved, id: ${id}` });
}