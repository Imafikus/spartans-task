import { Request, Response } from 'express';
import { getIngredient } from '../../db';

export const getRecentOrders = async (req: Request, res: Response): Promise<void> => {
  const allIngredients = await getIngredient();
  res.status(200).send({ msg: allIngredients });
}