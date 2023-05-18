import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';
import Badge from 'react-bootstrap/esm/Badge';
import { useNavigate, useParams } from 'react-router-dom';
import Rating from '../Components/Rating';
import { Helmet } from 'react-helmet-async';
import Loading from '../Components/Loading';
import MessageBox from '../Components/MessageBox';
import { getError } from '../Utils';
import { Store } from '../Context/Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_REQUEST':
      return { ...state, loading: true };
      console.log(state);
    case 'GET_SUCCESS':
      
      return { ...state, product: action.payload, loading: false };
    case 'GET_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { token } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    product: [],
  });

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: 'GET_REQUEST' });
      try {
        const res = await axios.get(`/api/v1/product/token/${token}`);

        dispatch({ type: 'GET_SUCCESS', payload: res.data });
      } catch (error) {
        dispatch({ type: 'GET_FAIL', payload: getError(error) });
      }
    };
    
    getProduct();
  }, [token]);

  // Calling reducer from Store context to add elemnts to cart
  const { state, dispatch: cxtDispatch } = useContext(Store)
  const { cart } = state

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x.id === product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    //const { data } = await axios.get(`/api/v1/products/${product.id}`);
    if (product.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    cxtDispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity }
    });
    navigate('/cart');
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
          <Row>
            <Col md={6}>
              <img
                className="img-large"
                src={product.image}
                alt={product.title}
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Helmet>
                    <title>{product.title}</title>
                  </Helmet>
                  <h1>{product.title}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product.rating.rate}
                    numReviews={product.rating.count}
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item>Pirce : ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description : <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>${product.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0 ? (
                            <Badge bg="success">In Stock</Badge>
                          ) : (
                            <Badge bg="danger">Unavailable</Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <div className="d-grid">
                          <Button onClick={() => addToCartHandler(product)} variant="primary">
                            Add to Cart
                          </Button>
                        </div>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
      )}
    </div>
  );
};
export default ProductPage;
