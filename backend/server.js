import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import seedRouter from './Routes/seedRoutes.js';
import productRouter from './Routes/productRoutes.js';
import userRouter from './Routes/userRoutes.js';
import orderRouter from './Routes/orderRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse incoming requests with URL-encoded payloads

app.use('/api/v1/users', userRouter); // Mount the user routes
app.use('/api/v1/seed', seedRouter); // Mount the seed routes
app.use('/api/v1/products', productRouter); // Mount the product routes
app.use('/api/v1/orders', orderRouter); // Mount the order routes

app.use((err, req, res, next) => {
  // Error handling middleware
  console.log('error: ' + err.message);
  res.status(500).send({ message: err.message + ' from SERVER' });
});

mongoose
  .connect(process.env.MONGO_URI) // Connect to MongoDB using the provided URI
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Failed to connect to MongoDB: ${error.message}`);
  });
