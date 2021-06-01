import { model, Schema } from 'mongoose';
import { getConnection } from '../../db';

interface Ingredient {
  name: string,
  price: number,
  time: number
}

const schema = new Schema<Ingredient>({
  name: {type: String, required: true },
  price: {type: Number, required: true },
  time: {type: Number, required: true }
});

const IngredientModel = model<Ingredient>('ingredients', schema);

export const getIngredient = async () => {
  
  await getConnection();
  
  const res = await IngredientModel.find();
  return res;
  console.log(res);
}