import express  from "express";
import data from "./data.js";
import mongo from 'mongoose';
import cors from 'cors';

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors())

//Endpoints
app.get('/api/v1/products', (req, res) => {
    res.send(data.products);
});

//mongo.connect()
app.listen(PORT, () => {
    console.log(`listening from server on port ${PORT}`);
})
