import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import api from "./services/api";
import { setProducts } from "./redux/productSlice";

import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await api.get("/products");

        dispatch(setProducts(response.data.products));

      } catch (error) {

        console.log(error);

      }

    };

    fetchProducts();

  }, [dispatch]);

  return (

    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/cart" element={<Cart />} />

    </Routes>

  );

}

export default App;