import { CartActionTypes } from '../../action-types/cart';

interface SetCartItem {
  type: CartActionTypes.SET_CART_ITEMS;
  payload?: any;
}

export type Action = SetCartItem;
