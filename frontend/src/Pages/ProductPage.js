import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';
import Badge from 'react-bootstrap/esm/Badge';
import { useParams } from 'react-router-dom';
import Rating from '../Components/Rating';
import Loading from '../Components/Shared/Loading';
import MessageBox from '../Components/Shared/MessageBox';
import { getError, CallingAddToCartHandler } from '../Utils';
import { Store } from '../Context/Store';
import { productReducer } from '../Reducers/productReducer';
import Title from '../Components/Shared/Title';
import { GET_REQUEST, GET_SUCCESS, GET_FAIL } from '../Actions';

const ProductPage = () => {
  const params = useParams();
  const { token } = params;

  const [{ loading, error, product }, dispatch] = useReducer(productReducer, {
    loading: true,
    error: '',
    product: [],
  });

  // Calling reducer from Store context to add elements to cart
  const { state, dispatch: cxtDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = () => {
    CallingAddToCartHandler(product, cart, cxtDispatch);
  };

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: GET_REQUEST }); // Dispatches action to set loading state

      try {
        const res = await axios.get(`/api/v1/products/token/${token}`); // Sends a GET request to retrieve product data with the given token

        dispatch({ type: GET_SUCCESS, payload: res.data }); // Dispatches action to set the retrieved product data in the state
      } catch (error) {
        dispatch({ type: GET_FAIL, payload: getError(error) }); // Dispatches action to set the error message in the state if an error occurs
      }
    };

    getProduct(); // Calls the getProduct function when the component mounts or the token changes
  }, [token]); // The effect depends on the 'token' variable, so it will be triggered when 'token' changes

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
            <ListGroup>
              <ListGroup.Item>
                <Title title={product.title} />
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
                        <Button
                          onClick={() => addToCartHandler(product)}
                          variant="primary"
                        >
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
