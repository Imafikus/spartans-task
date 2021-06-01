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

export const getIngredientByName = async (name: string) => {
  
  await getConnection();
  
  return await IngredientModel.findOne({name});
}

export const getAllIngredientNames = async () => {
  
  await getConnection();
  
  const allIngredients = await IngredientModel.find();
  return allIngredients.map( i => i.name);
}