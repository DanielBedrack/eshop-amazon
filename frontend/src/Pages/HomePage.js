import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../Components/product';
import Loading from '../Components/Shared/Loading';
import MessageBox from '../Components/Shared/MessageBox';
import { getError } from '../Utils';
import { homeReducer } from '../Reducer/homeReducer';
import Title from '../Components/Shared/Title';



const HomePage = () => {
  const [{ loading, error, products }, dispatch] = useReducer(homeReducer, {
    loading: true,
    error: '',
    products: [],
  });

  useEffect(() => {
    const getProducts = async () => {
      try {
        dispatch({ type: 'GET_REQUEST' });
        const res = await axios.get(`/api/v1/products`); 
        dispatch({ type: 'GET_SUCCESS', payload: res.data });
      } catch (err) {
        dispatch({ type: 'GET_FAIL', payload: getError(err) });
      }
    };
    getProducts();
  }, []);

  return (
    <div>
      <Title title='eShop' />
      <h1>Products</h1>
      <div className="main-inner">
        {loading ? (
          <Loading />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
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
    </div>
  );
};

export default HomePage;
