import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
export const store = configureStore({
  reducer: {
     product: productReducer,
      cart:cartReducer,
       wishlist: wishlistReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;