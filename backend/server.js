import  express  from "express";
import data from "./data.js";

const PORT = process.env.PORT || 8000;
const app = express();

//Endpoints
app.get('/api/v1/products', (req,res) =>{
    res.send(data.products);
});

app.listen(PORT, () => {
    console.log(`listening from server on port ${PORT}`);
})
