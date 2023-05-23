import axios from 'axios';

export const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export const CallingAddToCartHandler = async (product, cart, ctxDispatch) => {
  const existItem = cart.cartItems.find((x) => x._id === product._id);
  const quantity = existItem ? existItem.quantity + 1 : 1;
  const { data } = await axios.get(`/api/v1/products/${product._id}`);

  if (data.countInStock < quantity) {
    window.alert('Sorry. Product is out of stock');
    return;
  }
  ctxDispatch({
    type: 'ADD_TO_CART',
    payload: { ...product, quantity },
  });
};

// handleSort.js

export const CallingSortHandler = (cartItems, dragItem, dragOverItem, cxtDispatch) => {
  if (
    dragItem.current === null ||
    dragOverItem.current === null ||
    dragItem.current === dragOverItem.current
  ) {
    return; // Return early if no sorting is needed
  }

  const _cartItems = [...cartItems];
  const draggedItemContent = _cartItems[dragItem.current];

  _cartItems.splice(dragItem.current, 1);
  _cartItems.splice(dragOverItem.current, 0, draggedItemContent);

  dragItem.current = null;
  dragOverItem.current = null;

  cxtDispatch({ type: 'UPDATE_CART', payload: _cartItems });
};
