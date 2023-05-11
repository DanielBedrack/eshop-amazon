import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import seedRouter from './Routes/seedRoutes.js';

dotenv.config();


const PORT = process.env.PORT;
const app = express();
app.use('/api/v1/seed', seedRouter)

app.use(cors());

//Endpoints
app.get('/api/v1/products', (req, res) => {
  res.send(data.products);
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to Mongo');
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Failed to connect to Mongo: ${error.message}`);
  });