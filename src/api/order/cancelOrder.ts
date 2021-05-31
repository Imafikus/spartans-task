import { Request, Response } from 'express';

export const cancelOrder = async (req: Request, res: Response): Promise<void> => {
  res.status(200).send({ msg: "cancel order" });
}