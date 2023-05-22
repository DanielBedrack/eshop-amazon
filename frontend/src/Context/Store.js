import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      // Getting new item that was added to cart with new parameter: QUANTITY
      const newItem = action.payload;

      const existingItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );

      // If new item already exist in cart,it replace an old item to new with new QUANTITY ,else adding new item in cart.cartItems
      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            item._id === existingItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      console.log(state.cart);

      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'REMOVE_FROM_CART': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'UPDATE_CART':
      return { ...state, cart: { ...state.cart, cartItems: action.payload } };
    default:
      return state;
  }
};

const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  // Every child element will get "reducer" of cart
  return <Store.Provider value={value}> {props.children} </Store.Provider>;
};
export default StoreProvider;
