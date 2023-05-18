import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import seedRouter from './Routes/seedRoutes.js';
import data from './data.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/seed', seedRouter);

app.use('/api/v1/product/token/:token', async (req, res) => {
  const product = await data.products.find((p) => p.token === req.params.token);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

app.use('/api/v1/products/:id', async (req, res) => {
  const product = await data.products.find((p) => p.id == req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

//Endpoints
app.get('/api/v1/products', (req, res) => {
  res.send(data.products);
});

// MONGO_CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to Mongo');
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Failed to connect to Mongo: ${error.message}`);
  });
