import React, { useContext, useEffect, useReducer, useState } from 'react';
import OrderHistory from '../Components/OrderHistory';
import { CREATE_FAILED, CREATE_REQUEST, CREATE_SUCCEEDED } from '../Actions';
import { Store } from '../Context/Store';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_REQUEST:
      return { ...state, loading: true };
    case CREATE_SUCCEEDED:
      return { ...state, loading: false };
    case CREATE_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

const HistoryOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [{ loading }, dispatch] = useReducer(reducer, { loading: false });

  const {
    state: { userInfo },
  } = useContext(Store);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: CREATE_REQUEST });

        const { data } = await axios.get(
          `/api/v1/orders/history/${userInfo._id}`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );

        setOrders(data);
        dispatch({ type: CREATE_SUCCEEDED });
      } catch (error) {
        console.error('Error fetching orders:', error);
        dispatch({ type: CREATE_FAILED });
      }
    };

    if (userInfo) {
      fetchOrders();
    }
  }, [userInfo]);

  return (
    <div>
      <h1 className='title'>All Orders</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        orders.map((order) => (
          <div key={order._id}>
            <OrderHistory order={order} />
          </div>
        ))
      )}
    </div>
  );
};

export default HistoryOrderPage;
