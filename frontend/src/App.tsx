import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Wishlist from "./pages/Wishlist";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import CustomSnackbar from "./components/CustomSnackbar";
import { useSelector } from "react-redux";
import { hideSnackbar } from "./redux/uiSlice";
import type { RootState } from "./redux/store";

import api from "./services/api";
import { setProducts, setLoading, setError } from "./redux/productSlice";

interface AppProps {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

function App({ darkMode, setDarkMode }: AppProps) {
  const dispatch = useDispatch();

  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<string[]>(["All"]);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/products/categories");
      if (response.data.success) {
        setCategories(["All", ...response.data.data]);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await api.get(
        `/products?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}&category=${category}&search=${search}`
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
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, sortBy, order, page, limit, category, search]);

  const snackbar = useSelector((state: RootState) => state.ui.snackbar);

  return (
    <>
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
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            search={search}
            setSearch={setSearch}
            categories={categories}
            fetchProducts={fetchProducts}
          />
        }
      />

      <Route
        path="/cart"
        element={
          <Cart
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        }
      />

      <Route
        path="/wishlist"
        element={
          <Wishlist
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        }
      />

      <Route
        path="/login"
        element={
          <Login
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        }
      />
    </Routes>
    <CustomSnackbar 
      open={snackbar.open}
      message={snackbar.message}
      severity={snackbar.severity}
      handleClose={() => dispatch(hideSnackbar())}
    />
    </>
  );
}

export default App;