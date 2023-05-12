import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Product from '../Components/product';

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
  
  const [{ loading, error, products }, dispatch] = useReducer((reducer), {
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
            <Row>
              {products.map((product) => (
                <Col key={product.token} lg={3} md={4} sm={6} className="mb-3">
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
