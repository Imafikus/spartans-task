import { calculatePreparationTime } from './api/order/utils';
import { getAllActiveOrders, markOrderAsDone } from './db';


export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   


async function main() {
  while (true) {
    
    const allOrders = await getAllActiveOrders();
    allOrders.sort((a, b) => {
      return a.timestamp - b.timestamp;
    })
    
    console.log('Number of active orders: ', allOrders.length);
    
    if(allOrders.length === 0) {
      continue;
    }
    
    const orderToProcess = allOrders[0];
    const prepTime = await calculatePreparationTime(orderToProcess);
    
    await sleep(prepTime);
    await markOrderAsDone(orderToProcess._id);
    console.log('Finished with order: ', orderToProcess._id);
  }  
  
}

main().catch((e) => console.error(e));