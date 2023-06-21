import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../Components/product';
import Loading from '../Components/Shared/Loading';
import MessageBox from '../Components/Shared/MessageBox';
import { getError } from '../Utils';
import { homeReducer } from '../Reducers/homeReducer';
import Title from '../Components/Shared/Title';
import { GET_REQUEST, GET_SUCCESS, GET_FAIL } from '../Actions';

const HomePage = () => {
  const [{ loading, error, products }, dispatch] = useReducer(homeReducer, {
    loading: true,
    error: '',
    products: [],
  });

  useEffect(() => {
    const getProducts = async () => {
      try {
        // Dispatch GET_REQUEST action to indicate loading state
        dispatch({ type: GET_REQUEST });
        const res = await axios.get(`/api/v1/products`);
        // Dispatch GET_SUCCESS action with the received data
        dispatch({ type: GET_SUCCESS, payload: res.data });
      } catch (err) {
        // Dispatch GET_FAIL action with the error message
        dispatch({ type: GET_FAIL, payload: getError(err) });
      }
    };
    getProducts();
  }, []);

  return (
    <div className="home-page">
      <Title title="eShop" />
      <div className="main-inner">
        {loading ? (
          // Show loading component while fetching data
          <Loading />
        ) : error ? (
          // Show error message if there's an error
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          // Render the products when data is loaded successfully
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
