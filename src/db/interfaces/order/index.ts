import { model, Schema } from 'mongoose';
import { PostOrderReqType } from '../../../api/order/types';
import { getConnection } from '../../db';


interface Order {
  ingredients: Array<string>,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  active: boolean,
  size: string,
  timestamp: number
}

const schema = new Schema<Order>({
  ingredients: {type: [String] , required: true},
  size: {type: String, enum: ['small', 'medium', 'large'], required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  active: {type: Boolean, required: true},
  timestamp: {type: Number, required: true}
})

const OrderModel = model<Order>('orders', schema);

export const saveOrder = async (order: PostOrderReqType) => {
  await getConnection();
  
  console.log('saving: ', order);
  
  const doc = new OrderModel({
    ...order,
    active: true,
    timestamp: Date.now()
  });
  console.log('Doc id', doc._id);
  
  doc.save();
  return doc._id
}

export const getAllActiveOrders = async() => {
  await getConnection();
  return OrderModel.find({active: true});
}

export const getAllFinishedOrders = async() => {
  await getConnection();
  return OrderModel.find({active: false});
}

export const getOrderById = async (id: string) => {
  await getConnection();
  return await OrderModel.findById(id);
}

export const deleteOrderById = async (id: string) => {
  await getConnection();
  return await OrderModel.findByIdAndDelete(id);
}