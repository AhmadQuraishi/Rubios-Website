import { Dispatch } from "redux";
import { CartActionTypes } from "../../action-types/cart";
import { Action } from "../../actions/cart";

export const SetCartItem = (cartItem: any) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: CartActionTypes.SET_CART_ITEMS,
      payload: cartItem,
    });
  };
};
