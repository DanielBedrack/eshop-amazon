import express from 'express';
import Product from '../Models/productModel.js';

const productRouter = express.Router();

productRouter.use('/token/:token', async (req, res) => {
  const product = await Product.findOne({token: req.params.token});
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

productRouter.use('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

//Endpoints
productRouter.get('/', async (req, res) => {
    const products = await Product.find()
  res.send(products);
});
export default productRouter;
