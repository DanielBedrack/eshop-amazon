import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../Models/orderModel.js'
import User from '../Models/userModel.js';
import { isAuth } from '../utils.js'

const orderRouter = express.Router();

orderRouter.get(
  '/history/:_id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const userById = await User.findById(req.params._id);
      const orders = await Order.find({ user: userById });

      res.status(201).send(orders);
    } catch (err) {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order not found' });
    }
  })
);

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    console.log('total price: '+req.body.totalPrice);
    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
  })
);

export default orderRouter;
