import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/product";
import type { WishlistState } from "../types/wishlist";

const loadWishlistFromStorage = (): WishlistState => {
  const data = localStorage.getItem("wishlist");

  if (data) {
    return JSON.parse(data);
  }

  return {
    wishlistItems: [],
  };
};

const saveWishlistToStorage = (state: WishlistState) => {
  localStorage.setItem("wishlist", JSON.stringify(state));
};

const initialState: WishlistState = loadWishlistFromStorage();

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const existingItem = state.wishlistItems.find(
        (item) => item._id === action.payload._id
      );

      if (!existingItem) {
        state.wishlistItems.push(action.payload);
        saveWishlistToStorage(state);
      }
    },

    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item._id !== action.payload
      );

      saveWishlistToStorage(state);
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;