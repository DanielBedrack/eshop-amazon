import React, { useContext, useRef } from 'react';
import MessageBox from '../Components/Shared/MessageBox';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Context/Store';
import Title from '../Components/Shared/Title';
import { CallingSortHandler } from '../Utils';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../Actions';

const CartPage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const navigate = useNavigate();
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/v1/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({ type: ADD_TO_CART, payload: { ...item, quantity } });
  };

  const removeCartHandler = async (item) => {
    ctxDispatch({ type: REMOVE_FROM_CART, payload: item });
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  const handleSort = () => {
    CallingSortHandler(cartItems, dragItem, dragOverItem, ctxDispatch);
  };

  return (
    <div>
      <Title title="Shopping Cart" />
      <h1 className='title'>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>Cart is empty.</MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item, index) => (
                <ListGroup.Item
                  key={item._id}
                  draggable
                  onDragStart={() => (dragItem.current = index)}
                  onDragEnter={() => (dragOverItem.current = index)}
                  onDragEnd={handleSort}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="img-fluid rounded img-thumbnail"
                      />{' '}
                      <Link
                        to={`/product/${item.token}`}
                        className="product-title"
                      >
                        <strong>{item.title}</strong>
                      </Link>
                    </Col>
                    <Col md={3}>
                      {/* ------ */}
                      <Button
                        variant="light"
                        disabled={item.quantity === 1}
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>
                      <span>{item.quantity}</span>
                      {/* +++++ */}
                      <Button
                        variant="light"
                        disabled={item.quantity === item.countInStock}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>{item.price}</Col>
                    <Col md={2}>
                      <Button
                        variant="light"
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
                    {/* Counts the items the cart */}
                    Subtotal ({cartItems.reduce(
                      (a, c) => a + c.quantity,
                      0
                    )}{' '}
                    {/* Calculates the overall price */}
                    Items) : $
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
                      onClick={() => checkoutHandler()}
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
