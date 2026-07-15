import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box
} from "@mui/material";
function Cart() {

  const cartItems = useSelector(
    (state: any) => state.cart.cartItems
  );
  console.log(cartItems);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Shopping Cart</h1>

      {cartItems.map((item: any) => (
        <Card
          key={item.id}
          sx={{
            display: "flex",
            marginBottom: 2,
            padding: 2,
          }}
        >
         <CardMedia
  component="img"
  image={item.thumbnail}
  alt={item.title}
  sx={{
    width: 150,
    height: 150,
  }}
/>
<CardContent>
<Typography variant="h6">
  {item.title}
</Typography>

<Typography variant="body1">
  ₹ {item.price}
</Typography>
</CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Cart;