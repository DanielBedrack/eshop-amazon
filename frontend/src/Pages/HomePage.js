import { Link } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_REQUEST':
      return { ...state, loading: true };
    case 'GET_SUCCSESS':
      return { ...state, products: action.payload, loading: false };
    case 'GET_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const HomePage = () => {
  
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: '',
    products: [],
  });

  useEffect(() => {
    dispatch({ type: 'GET_REQUEST' });
    try {
      const getProducts = async () => {
        const res = await axios.get('/api/v1/products');
        dispatch({ type: 'GET_SUCCSESS', payload: res.data });
      };
      getProducts();
    } catch (error) {
      dispatch({ type: 'GET_FAIL', payload: error.message });
    }
  }, []);

  return (
    <div className="App">
      <main>
        <h1>Products</h1>
        <div className="products">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            products.map((product) => (
              <div className="product" key={product.token}>
                <Link to={`/product/${product.token}`}>
                  <img src={product.image} alt={product.name}></img>
                </Link>
                <div className="product-desk">
                  <p>{product.name}</p>
                  <strong>
                    <p>{product.price}</p>
                  </strong>
                  <button>Add To Cart</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
