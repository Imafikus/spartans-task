import { Request, Response } from 'express';

export const postOrder = async (req: Request, res: Response): Promise<void> => {
  res.status(200).send({ msg: "post order" });
}