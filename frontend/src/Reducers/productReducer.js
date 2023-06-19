import { GET_REQUEST, GET_SUCCESS, GET_FAIL } from '../Actions';

export const productReducer = (state, action) => {
  switch (action.type) {
    case GET_REQUEST:
      return { ...state, loading: true };
    case GET_SUCCESS:
      return { ...state, product: action.payload, loading: false };
    case GET_FAIL:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
