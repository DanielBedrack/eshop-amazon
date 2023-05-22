import React, { useContext, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import MessageBox from '../Components/Shared/MessageBox'
import { Card, Col, ListGroup, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Store } from '../Context/Store'

const CartPage = () => {
  const { state, dispatch: cxtDispatch } = useContext(Store)
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const navigate = useNavigate()
  const {
    cart: { cartItems }
  } = state

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/v1/products/${item._id}`)
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock')
      return
    }
    cxtDispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity } })
  }

  const removeCartHandler = async (item) => {
    // const { data } = await axios.get(`/api/v1/products/${item._id}`)

    cxtDispatch({ type: 'REMOVE_FROM_CART', payload: item })
  }

  const checkoutHandler = () => {  
    navigate('/signin?redirect=/shipping');    
  }

// handle drag sorting
const handleSort = () => {
  // Check if dragItem and dragOverItem are valid and not equal
  if (dragItem.current === null || dragOverItem.current === null || dragItem.current === dragOverItem.current) {
    return; // Return early if no sorting is needed
  }

  const _cartItems = [...cartItems];
  const draggedItemContent = _cartItems[dragItem.current];

  // Remove the dragged item from the original position
  _cartItems.splice(dragItem.current, 1);

  // Insert the dragged item at the new position
  _cartItems.splice(dragOverItem.current, 0, draggedItemContent);

  // Reset the drag item references
  dragItem.current = null;
  dragOverItem.current = null;

  // Dispatch the updated cart items
  cxtDispatch({ type: 'UPDATE_CART', payload: _cartItems });
};

  // save reference for dragItem and dragOverItem



  return (
    <div>
      <Helmet>
        <title>Shopping Curt</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty.
              <Link to="/">Home</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item, index) => (
                <ListGroup.Item
                  key={item._id}
                  draggable
                  onDragStart={(e) => dragItem.current=index}
                  onDragEnter={(e) => dragOverItem.current=index}
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
                      <Link to={`/products/${item.token}`}>{item.title}</Link>
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
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items:) : ${' '}
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
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
}

export default CartPage
