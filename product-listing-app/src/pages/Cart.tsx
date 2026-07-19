import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";
import CustomSnackbar from "../components/CustomSnackbar";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";
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
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                alignItems: {
                  xs: "center",
                  md: "center",
                },
                gap: 3,
              }}
            >
              <CardMedia
                component="img"
                image={item.thumbnail}
                alt={item.title}
                sx={{
                  width: {
                    xs: 90,
                    md: 120,
                  },
                  height: {
                    xs: 90,
                    md: 120,
                  },
                  objectFit: "contain",
                }}
              />

              <CardContent
                sx={{
                  flex: 1,
                  width: "100%",
                  textAlign: {
                    xs: "center",
                    md: "left",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#666",
                    mb: 0.5,
                  }}
                >
                  Price : ₹{item.price}
                </Typography>

                <Typography
                  sx={{
                    color: "#666",
                    mb: 0.5,
                  }}
                >
                  Quantity : {item.quantity}
                </Typography>

                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#1976d2",
                    fontSize: "20px",
                    mt: 1,
                  }}
                >
                  Total : ₹{(item.price * item.quantity).toFixed(2)}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: {
                      xs: "center",
                      md: "flex-start",
                    },
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
                    sx={{
                      width: {
                        xs: "100%",
                        sm: "170px"
                      },
                      mt: {
                        xs: 1,
                        md: 0
                      }
                    }}
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
              <Divider
                sx={{
                  my: 3,
                  borderColor: "#e5e7eb",
                }}
              />
            )}
          </Box>
        ))}

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            mt: 3,
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#1976d2",
            color: "#fff",
            borderRadius: "15px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
            }}
          >
            Grand Total
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
            }}
          >
            ₹ {totalPrice.toFixed(2)}
          </Typography>

        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
          }}
        >
          <Button
            variant="outlined"
            component={Link}
            to="/"
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              px: 3,
            }}
          >
            Continue Shopping
          </Button>

          <Button
            variant="contained"
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              px: 4,
            }}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default Cart;