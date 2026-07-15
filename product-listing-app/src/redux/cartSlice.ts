import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [] as any[],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {

  const existingItem = state.cartItems.find(
    (item) => item.id === action.payload.id
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cartItems.push({
      ...action.payload,
      quantity: 1,
    });
  }

  state.totalQuantity += 1;
  state.totalPrice += action.payload.price;
},
},
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;