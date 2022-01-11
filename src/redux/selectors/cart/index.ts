import { createSelector } from "@reduxjs/toolkit";

const selectCart = (state: any) => state.cart;

export const selectCartTotal = createSelector(selectCart, (cart) =>
  cart.cartItems.reduce((total: any, item: any) => total + item.price, 0)
);

export const selectCartItems = createSelector(
  selectCart,
  (cart) => cart.cartItems
);
