import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";
import CustomSnackbar from "../components/CustomSnackbar";
import Navbar from "../components/Navbar";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Toolbar,
  Divider,
} from "@mui/material";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state: any) => state.cart.cartItems
  );

  const totalPrice = useSelector(
    (state: any) => state.cart.totalPrice
  );

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <Toolbar />

        <Typography
          variant="h5"
          sx={{
            mt: 5,
            textAlign: "center",
          }}
        >
          Your Cart is Empty
        </Typography>
      </>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Navbar />
      <Toolbar />

      <CustomSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
      />

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 4,
          color: "#1f2937"
        }}
      >
        🛒 Shopping Cart
      </Typography>



      <Card
        sx={{
          p: 3,
          borderRadius: 3,
        }}
      >
        {cartItems.map((item: any, index: number) => (
          <Box key={item.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                py: 2,
              }}
            >
              <CardMedia
                component="img"
                image={item.thumbnail}
                alt={item.title}
                sx={{
                  width: 120,
                  height: 120,
                  objectFit: "contain",
                }}
              />

              <CardContent sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold" }}
                >
                  {item.title}
                </Typography>

                <Typography>
                  Price : ₹{item.price}
                </Typography>

                <Typography>
                  Quantity : {item.quantity}
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    fontWeight: "bold",
                  }}
                >
                  Total : ₹
                  {(item.price * item.quantity).toFixed(2)}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => {
                      dispatch(decreaseQuantity(item.id));

                      setSnackbarMessage(
                        "Quantity decreased"
                      );

                      setOpenSnackbar(true);
                    }}
                  >
                    -
                  </Button>

                  <Typography variant="h6">
                    {item.quantity}
                  </Typography>

                  <Button
                    variant="outlined"
                    onClick={() => {
                      dispatch(increaseQuantity(item.id));

                      setSnackbarMessage(
                        "Quantity increased"
                      );

                      setOpenSnackbar(true);
                    }}
                  >
                    +
                  </Button>

                  <Button
                    color="error"
                    variant="contained"
                    sx={{ ml: 2 }}
                    onClick={() => {
                      dispatch(removeFromCart(item.id));

                      setSnackbarMessage(
                        "Item removed from cart"
                      );

                      setOpenSnackbar(true);
                    }}
                  >
                    Remove
                  </Button>
                </Box>
              </CardContent>
            </Box>

            {index !== cartItems.length - 1 && (
              <Divider sx={{ my: 2 }} />
            )}
          </Box>
        ))}

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold" }}
          >
            Grand Total
          </Typography>

          <Typography
            variant="h5"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            ₹ {totalPrice.toFixed(2)}
          </Typography>
          
        </Box>
      </Card>
    </Box>
  );
}

export default Cart;