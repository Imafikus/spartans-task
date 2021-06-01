import { Request, Response } from 'express';
import { getAllActiveOrders } from '../../db';

export const getRecentOrders = async (req: Request, res: Response): Promise<void> => {
  
  const activeOrders = await getAllActiveOrders();
  
  const orderIds = activeOrders.map(o => o._id);
  
  res.status(200).send({ recentOrders: orderIds});
}