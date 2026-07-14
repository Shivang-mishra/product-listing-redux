import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
        state.products = action.payload;
    },
    setLoading: (state) => {
    state.loading = true;
},
 setError: (state, action) => {
      state.error = action.payload;
    },
}
});
export const { setProducts, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;