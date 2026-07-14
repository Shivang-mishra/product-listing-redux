import { Card,  CardMedia,CardContent,Typography,Button,} from "@mui/material";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}
function ProductCard({product}:ProductCardProps) {
  return (
    <Card sx={{width:280}}>
      <CardMedia
        component="img"
        height="200"
       image={product.thumbnail}
        alt="Product"
      />

      <CardContent>

        <Typography variant="h6">
          {product.title}
        </Typography>

        <Typography variant="body1">
          ₹{product.price}
        </Typography>

        <Button
          variant="contained"
          fullWidth
        >
          Add To Cart
        </Button>

      </CardContent>
    </Card>
  );
}

export default ProductCard;