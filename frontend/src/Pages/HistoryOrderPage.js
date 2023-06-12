import React, { useContext, useEffect, useReducer, useState } from 'react'
import OrderHistory from '../Components/OrderHistory';
import { CREATE_FAILED, CREATE_REQUEST, CREATE_SUCCEEDED } from '../Actions';
import { Store } from '../Context/Store';
import axios from 'axios';


const reducer = (state, { type }) => {
  switch (type) {
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

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {  userInfo } = state;

    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const { data } = await axios.get(
            `api/v1/orders/history/${userInfo._id}`,
            {
              headers: { authorization: `Bearer ${userInfo.token}` },
            }
          );

          setOrders(data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };

      fetchOrders();
    }, [userInfo]);

  return (
    <div>
      <h1>All Orders</h1>
      {orders.map((order) => (
        <div key={order._id}>
          <OrderHistory order={order}/>
        </div>
      ))}
    </div>
  );
}

export default HistoryOrderPage
