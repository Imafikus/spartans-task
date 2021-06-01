import { model, Schema } from 'mongoose';
import { PostOrderReqType } from '../../../api/order/types';
import { getConnection } from '../../db';


const schema = new Schema<PostOrderReqType>({
  ingredients: {type: [String] , required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  active: {type: Boolean, required: true}
})

const OrderModel = model<PostOrderReqType>('orders', schema);

export const saveOrder = async (order: PostOrderReqType) => {
  await getConnection();
  
  const doc = new OrderModel({
    ...order,
    active: true
  });
  console.log('Doc id', doc._id);
  
  doc.save();
  return doc._id
}

export const getAllActiveOrders = async() => {
  await getConnection();
  return OrderModel.find({active: true});
}

export const getOrderById = async (id: string) => {
  await getConnection();
}