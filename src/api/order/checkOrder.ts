import { Request, Response } from 'express';

export const checkOrder = async (req: Request, res: Response): Promise<void> => {
  res.status(200).send({ msg: "check order" });
}