import { createContext, useReducer } from 'react';
import { storeReducer } from '../Reducers/storeReducer';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
  },
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};


const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const value = { state, dispatch };

  // Every child element will get "reducer" of cart
  return <Store.Provider value={value}> {props.children} </Store.Provider>;
};
export default StoreProvider;
