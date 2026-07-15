import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
function Home() {
  const products = useSelector((state: any) => state.product.products);
 const cart = useSelector((state: any) => state.cart);

return (
  <>
  <Navbar/>
  <div style={{ padding: "20px", }}>
    
    <h1>All Products</h1>

    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent:"space-between",
      }}
    >
      {products.map((product: any) => (
        <ProductCard 
        
          key={product.id}
          product={product}
        />
      ))}
    </div>
  </div>
  </>
);
}

export default Home;