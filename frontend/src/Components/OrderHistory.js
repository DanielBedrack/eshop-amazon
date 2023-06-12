import React from 'react';

const OrderHistory = ({ order }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">Order ID: {order._id}</div>
      <div className="card-body">
        <h5 className="card-title">Items:</h5>
        <ul className="list-group">
          {order.orderItems.map((item) => (
            <li className="list-group-item" key={item._id}>
              <div className="row">
                <div className="col-md-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-10">
                  <h6>{item.title}</h6>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {item.price}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <h5 className="mt-4">Shipping Address:</h5>
        <p>Name: {order.shippingAddress.name}</p>
        <p>Address: {order.shippingAddress.address}</p>
        <p>City: {order.shippingAddress.city}</p>
        <p>Postal Code: {order.shippingAddress.postalCode}</p>
        <p>Country: {order.shippingAddress.country}</p>
        <h5>Payment Method:</h5>
        <p>{order.paymentMethod}</p>
        <h5>Order Total:</h5>
        <p>{order.totalPrice}</p>
        <h5>Order Status:</h5>
        <p>{order.isDelivered ? 'Delivered' : 'Not Delivered'}</p>
      </div>
    </div>
  );
};

export default OrderHistory;
