import {GET_REQUEST, GET_SUCCESS, GET_FAIL} from '../Actions'

export const homeReducer = (state, action) => {
  switch (action.type) {
    case GET_REQUEST:
      return { ...state, loading: true };
    case GET_SUCCESS:
      return { ...state, products: action.payload, loading: false };
    case GET_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};