import express from 'express';
import Product from '../Models/productModel.js';
import expressAsyncHandler from 'express-async-handler';

const productRouter = express.Router();
const PAGE_SIZE = 6;

// Get all products
productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// Get distinct categories of products
productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

// Search products based on various filters
productRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    // Prepare filters based on query parameters

    // Filter by title if searchQuery is provided
    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            title: {
              $regex: searchQuery, // Case-insensitive search
              $options: 'i',
            },
          }
        : {};

    // Filter by category if category is provided
    const categoryFilter = category && category !== 'all' ? { category } : {};

    // Filter by rating if rating is provided
    const ratingFilter =
      rating && rating !== 'all'
        ? { 'rating.rate': { $gte: Number(rating) } }
        : {};

    // Filter by price range if price is provided
    const priceFilter =
      price && price !== 'all'
        ? {
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};

    // Determine the sorting order based on the 'order' parameter
    const sortOrder =
      order === 'lowest'
        ? { price: 1 } // Ascending order
        : order === 'highest'
        ? { price: -1 } // Descending order
        : order === 'toprated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    // Fetch products based on filters, sorting, pagination
    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    // Count total number of matching products
    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });

    // Send the response with the fetched products, pagination information, and total count
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);


// Get product by token
productRouter.use('/token/:token', async (req, res) => {
  const product = await Product.findOne({ token: req.params.token });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

// Get product by ID
productRouter.use('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

export default productRouter;
