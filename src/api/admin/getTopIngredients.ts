import { Request, Response } from 'express';
import { getAllFinishedOrders } from '../../db';
import { envVal } from '../../envVal';
import { validateReqType } from "../../types";
import { InvalidReqStructureResponse, sendResponse, Statuses } from "../ApiResponse";
import { AdminReqSchema, AdminReqType } from './types';
export const getTopIngredients = async (req: Request, res: Response): Promise<void> => {
  
  const reqBody: AdminReqType = req.body;
  
  if(!validateReqType(reqBody, AdminReqSchema)) {
    return sendResponse(res, InvalidReqStructureResponse);
  }
  
  if(req.body.username !== envVal.adminUser || req.body.password !== envVal.adminPass) {
    res.status(Statuses.forbidden).send({ msg: 'Bad credentials'});
  }
  
  const finishedOrders = await getAllFinishedOrders();
  
  const usedIngredients = {};
  
  for (const order of finishedOrders) {
    for (const ingredient of order.ingredients) {
      if (ingredient in usedIngredients) {
        usedIngredients[ingredient] += 1;
      } else {
        usedIngredients[ingredient] = 1;
      }
    }
  }
  
  const usedIngredientsArray = Object.keys(usedIngredients).map(key => {
    return [key, usedIngredients[key]]
  });
  
  const filteredArray = usedIngredientsArray
    .sort((a, b) => {
      return (b[1] - a[1])
    })
    .map(e => e[0])
    
  
  let finalArray = filteredArray; 
  
  if (filteredArray.length >= 5) {
    finalArray = finalArray.slice(0, 5)
  }
  
  res.status(200).send({ usedIngredients: finalArray });
}