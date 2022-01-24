import { CartActionTypes } from '../../action-types/cart/index';
import { Action } from '../../actions/cart/index';

const INITIAL_VALUES = {
  cartItems: [],
};

const cartReducer = (state = INITIAL_VALUES, action: Action) => {
  switch (action.type) {
    case CartActionTypes.SET_CART_ITEMS:
      return { ...state, cartItems: action.payload };
    default:
      return state;
  }
};

export default cartReducer;
