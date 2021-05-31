import { Request, Response } from 'express';

export const getRecentOrders = async (req: Request, res: Response): Promise<void> => {
  res.status(200).send({ msg: "get recent orders" });
}