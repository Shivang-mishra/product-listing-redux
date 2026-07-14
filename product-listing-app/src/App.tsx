import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./redux/cartSlice";
import { useEffect } from "react";
import api from "./services/api";
function App() {
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchProducts();
}, []);
  const dispatch = useDispatch();

  const cart = useSelector((state: any) => state.cart);

  const handleClick = () => {
    dispatch(
      addToCart({
        id: 1,
        title: "iPhone 16",
        price: 120000,
      })
    );
  };

  console.log(cart);

  return (
    <div>
      <h1>Redux Dispatch Example</h1>

      <button onClick={handleClick}>
        Add Product
      </button>
    </div>
  );
}

export default App;