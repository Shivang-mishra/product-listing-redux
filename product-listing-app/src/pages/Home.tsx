import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";


function Home() {
    const products = useSelector((state: any) => state.product.products);
console.log(products);
  return (
    
    <div>
      <h1>All Products</h1>

    {products.map((product: any) => (
  <ProductCard
    key={product.id}
    product={product}
  />
))}
    </div>
  );
}

export default Home;