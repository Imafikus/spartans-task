import { getAllActiveOrders, getIngredientByName, getOrderById } from "../../../db";
import { PostOrderReqType } from "../types"

export const calculatePreparationTime = async (order: PostOrderReqType) => {
  let preparationTime = 0;
  
  for (const ingredientName of order.ingredients) {
    const ingredient = await getIngredientByName(ingredientName);
    console.log('Current ingredient: ', ingredient);
    if(ingredient) {
      preparationTime += ingredient.time;
    }
  }
    
  if (order.size === 'small') {
    preparationTime += 1000;
  }
  if (order.size === 'medium') {
    preparationTime += 2000;
  }
  if (order.size === 'large') {
    preparationTime += 3000;
  }
  
  return preparationTime;
}

export const findPlaceInQueueAndWaitTime = async (id: string) => {
  const allOrders = await getAllActiveOrders();
  allOrders.sort((a, b) => {
    return a.timestamp - b.timestamp;
  })
  
  let placeInQueue = 0
  const targetOrder = await getOrderById(id);
  if(!targetOrder) {
    return;
  }
  let waitTime = await calculatePreparationTime(targetOrder);
  
  for(const order of allOrders) {
    if (order._id == id) {
      break;
    }
    placeInQueue += 1;
    waitTime += await calculatePreparationTime(order);
  }
  
  return {
    placeInQueue,
    waitTime
  };
}

export const calculateOrderWaitTime = async(id: string) => {
  // const order = await getOrderById(id);
  // if(order) {
  //   return await calculatePreparationTime(order);
  // }
  console.log(await findPlaceInQueueAndWaitTime(id));
}