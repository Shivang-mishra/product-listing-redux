import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartState } from "../types/cart";

const loadCartFromStorage = (): CartState => {
  const data = localStorage.getItem("cart");

  if (data) {
    return JSON.parse(data);
  }

  return {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
  };
};

const saveCartToStorage = (state: CartState) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

const initialState: CartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
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

      saveCartToStorage(state);
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += item.price;

        saveCartToStorage(state);
      }
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          state.totalQuantity -= 1;
          state.totalPrice -= item.price;
        } else {
          state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem.id !== action.payload
          );

          state.totalQuantity -= 1;
          state.totalPrice -= item.price;
        }

        saveCartToStorage(state);
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (item) {
        state.totalQuantity -= item.quantity;

        state.totalPrice -= item.price * item.quantity;

        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload
        );

        saveCartToStorage(state);
      }
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;