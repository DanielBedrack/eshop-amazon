import React, { useContext } from 'react';
import { Store } from '../Context/Store';
import { Helmet } from 'react-helmet-async';
import { Row, Col, Button, Card } from 'react-bootstrap';
import MessageBox from '../Components/MessageBox';
import { Link, useNavigate } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';

const CartPage = () => {
  const { state, dispatch: cxtDispatch } = useContext(Store);
  const navigate = useNavigate();
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/v1/products/${item.id}`);
        console.log('before first if');

    if (quantity === 0) {
        removeCartHandler(item)
        return
    }
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    console.log("before dispatch")
    cxtDispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity } });
  };

  const removeCartHandler = async (item) => {
    const { data } = await axios.get(`/api/v1/products/${item.id}`);

    cxtDispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };
  
  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };
  const validChecker = async (item, quantity) => {
    const { data } = await axios.get(`/api/v1/products/${item.id}`);

    if (data.countInStock < quantity) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.Length === 0 ? (
            <MessageBox>
              Your cart is empty. &nbsp;
              <Link to="/">Home</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        className="img-fluid rounded img-thumbnail"
                        src={item.image}
                        alt={item.title}
                      />{' '}
                      <Link to={`/products/${item.token}`}>{item.title}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        disabled={item.quantity === 0}
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="light"
                        disabled={() => validChecker(item, item.quantity)}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        disabled={item.quantity === 0}
                        onClick={() => removeCartHandler(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items:) : ${' '}
                    {cartItems
                      .reduce((a, c) => a + c.price * c.quantity, 0)
                      .toFixed(2)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
