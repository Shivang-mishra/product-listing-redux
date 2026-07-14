import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "./services/api";
import { setProducts } from "./redux/productSlice";
import Home from "./pages/Home";

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

  return <Home />;

}

export default App;