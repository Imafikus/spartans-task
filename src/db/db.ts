import mongoose from 'mongoose';
import { envVal } from '../envVal';

export const getConnection = async () => {
  const db = await mongoose.connect(
    envVal.mongoConnectionString,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  ) 
  return db.connection; 
}
