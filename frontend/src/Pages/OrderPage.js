import { useContext, useReducer, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GET_REQUEST, GET_SUCCESS, GET_FAIL } from '../Actions';
import { Store } from '../Context/Store';
import axios from 'axios';
import { getError } from '../Utils';
import Loading from '../Components/Shared/Loading';
import MessageBox from '../Components/Shared/MessageBox';
import Title from '../Components/Shared/Title';
import { Row, Col, Card, ListGroup } from 'react-bootstrap';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case GET_REQUEST:
      return { ...state, loading: true, error: '' };
    case GET_SUCCESS:
      return { ...state, loading: false, order: payload, error: '' };
    case GET_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

const OrderPage = () => {
  const {
    state: { userInfo },
  } = useContext(Store);
  const params = useParams();
  const { id: orderId } = params;
  const naviagte = useNavigate();

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: null,
    error: '',
  });

  useEffect(() => {
    const getOrder = async () => {
      dispatch({ type: GET_REQUEST });

      try {
        const { data } = await axios.get(`/api/v1/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: GET_SUCCESS, payload: data });
      } catch (err) {
        dispatch({ type: GET_FAIL, payload: getError(err) });
      }
    };
    if (!userInfo) {
      naviagte('/signin');
    }
    if (!order || (order._id && orderId !== order._id)) {
      getOrder();
    }
  }, [naviagte, order, orderId, userInfo]);

  return loading ? (
    <Loading />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Title title="Order" />
      <h1 className="my-3">Order: {order._id.substr(order._id.length - 6)}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name: </strong> {order.shippingAddress.fullName} <br />
                <strong>Address: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city} ,{order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Delivered</MessageBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method: </strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Paid at {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Paid</MessageBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <Link to={`/product/${item.token}`}>{item.title}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${order.totalPrice}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default OrderPage;
