import { Card,  CardMedia,CardContent,Typography,Button,} from "@mui/material";
import type { Product } from "../types/product";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
interface ProductCardProps {
  product: Product;
}
function ProductCard({product}:ProductCardProps) {
  const dispatch = useDispatch();
  
  return (
    <Card sx={{width:280,height:"420",justifyContent:"space-between" ,display:"flex", flexDirection: "column",}} >
      <CardMedia
        component="img"
        height="200"
       image={product.thumbnail}
        alt="Product"
      />

      <CardContent >

        <Typography variant="h6">
          {product.title}
        </Typography>

        <Typography variant="body1">
          ₹{product.price}
        </Typography>

       <Button
  variant="contained"
  fullWidth
  onClick={() => dispatch(addToCart(product))}
>
  Add To Cart
</Button>

      </CardContent>
    </Card>
  );
}

export default ProductCard;