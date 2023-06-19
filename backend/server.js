import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import seedRouter from './Routes/seedRoutes.js';
import productRouter from './Routes/productRoutes.js';
import userRouter from './Routes/userRoutes.js';
import orderRouter from './Routes/orderRoutes.js';
import path from 'path'

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();


app.use(express.static(path.join('backend', 'build')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRouter)
app.use('/api/v1/seed', seedRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);
app.use((err, req, res, next) => {
  console.log('error: '+ err.message)
  res.status(500).send({ message: err.message+ 'from SERVER' })
});
// Define the catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join('backend', 'build', 'index.html'));
});

// MONGO_CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Failed to connect to MongoDB: ${error.message}`);
  });
