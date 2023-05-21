import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import seedRouter from './Routes/seedRoutes.js';
import productRouter from './Routes/productRoutes.js';
import userRouter from './Routes/userRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRouter)
app.use('/api/v1/seed', seedRouter);
app.use('/api/v1/products', productRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
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
