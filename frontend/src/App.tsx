import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Wishlist from "./pages/Wishlist";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

import api from "./services/api";
import { setProducts, setLoading, setError } from "./redux/productSlice";

function App() {
  const dispatch = useDispatch();

  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("All");
  const fetchProducts = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await api.get(
        `/products?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}&category=${category}`,
      );

      dispatch(setProducts(response.data.data));
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch products:", error);

      dispatch(setError("Failed to load products"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [dispatch, sortBy, order, page, limit, category]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            sortBy={sortBy}
            order={order}
            setSortBy={setSortBy}
            setOrder={setOrder}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            category={category}
            setCategory={setCategory}
          />
        }
      />

      <Route path="/cart" element={<Cart />} />

      <Route path="/wishlist" element={<Wishlist />} />
     
    </Routes>
  );
}

export default App;
