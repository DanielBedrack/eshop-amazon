import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
  UPDATE_CART,
  USER_SIGNIN,
  USER_SIGNOUT,
  USER_SIGNUP,
} from '../Actions';

export const storeReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART: {
      // Getting new item that was added to cart with new parameter: QUANTITY
      const newItem = payload;

      const existingItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );

      // If new item already exist in cart,it replace an old item to new with new QUANTITY ,else adding new item in cart.cartItems
      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            item._id === existingItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case REMOVE_FROM_CART: {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== payload._id
      );

      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case UPDATE_CART:
      return { ...state, cart: { ...state.cart, cartItems: payload } };

    case USER_SIGNIN:
      return { ...state, userInfo: payload };

    case USER_SIGNUP:
      return { ...state, userInfo: payload };

    case USER_SIGNOUT:
      return { ...state, userInfo: null };

    case SAVE_SHIPPING_ADDRESS: {
      return { ...state, cart: { ...state.cart, shippingAddress: payload } };
    }
    case SAVE_PAYMENT_METHOD: {
      return { ...state, cart: { ...state.cart, paymentMethod: payload } };
    }


    default:
      return state;
  }
};
