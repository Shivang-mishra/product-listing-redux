import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart, } from "../redux/cartSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomSnackbar from "../components/CustomSnackbar";
import Navbar from "../components/Navbar";

import { useState } from "react";
import { Link } from "react-router-dom";

import { Box, Button, Card, CardContent, CardMedia, Divider, Grid, Toolbar, Typography, } from "@mui/material";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: any) => state.cart.cartItems);

  const totalPrice = useSelector((state: any) => state.cart.totalPrice);

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
            fontWeight: "bold",
          }}
        >
          🛒 Your Cart is Empty
        </Typography>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Toolbar />

      <CustomSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
      />

      <Box
        sx={{
          p: 4,
          background: "#f5f7fb",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 4,

            position: "sticky"
          }}
        >
          🛒 Shopping Cart
        </Typography>

        <Grid container spacing={3}>
          

          <Grid size={{ xs: 12, md: 8 }}>
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
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={item.thumbnail}
                      alt={item.title}
                      sx={{
                        width: 140,
                        height: 140,
                        background: "#fafafa",
                        borderRadius: 2,
                        p: 1,
                        objectFit: "contain",
                      }}
                    />

                    <CardContent sx={{ flex: 1 }}>
                      <Typography
                        variant="h5"

                        gutterBottom
                        sx={{
                          fontWeight: "bold",
                          mb: 2,
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Typography color="text.secondary">
                        Price : ₹{item.price}
                      </Typography>

                      <Typography color="text.secondary">
                        Quantity : {item.quantity}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 1,
                          color: "#1976d2",
                          fontWeight: "bold",
                          fontSize: 22,
                        }}
                      >
                        Total : ₹
                        {(item.price * item.quantity).toFixed(2)}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          flexWrap: "wrap",
                          mt: 2,
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid #d1d5db",
                            borderRadius: "10px",
                            overflow: "hidden",
                            width: "fit-content",
                          }}
                        >
                          <Button
                            onClick={() => {
                              dispatch(decreaseQuantity(item.id));
                              setSnackbarMessage("Quantity decreased");
                              setOpenSnackbar(true);
                            }}
                            sx={{ minWidth: 45 }}
                          >
                            -
                          </Button>

                          <Typography
                            sx={{
                              px: 2,
                              fontWeight: "bold",
                            }}
                          >
                            {item.quantity}
                          </Typography>

                          <Button
                            onClick={() => {
                              dispatch(increaseQuantity(item.id));
                              setSnackbarMessage("Quantity increased");
                              setOpenSnackbar(true);
                            }}
                            sx={{ minWidth: 45 }}
                          >
                            +
                          </Button>
                        </Box>

                        <Button
                          color="error"
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          onClick={() => {
                            dispatch(removeFromCart(item.id));
                            setSnackbarMessage("Item removed from cart");
                            setOpenSnackbar(true);
                          }}
                        >
                          Remove
                        </Button>
                      </Box>
                    </CardContent>
                  </Box>

                  {index !== cartItems.length - 1 && (
                    <Divider sx={{ my: 3 }} />
                  )}
                </Box>
              ))}
            </Card>
          </Grid>
          

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                p: 3,
                borderRadius: 3,
                position: "sticky",
                alignSelf: "flex-start",
                top: 90,
                boxShadow: 4,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                }}
              >
                Order Summary
              </Typography>
              <Typography
                sx={{
                  color: "#666",
                  mb: 3,
                }}
              >
                Items ({cartItems.length})
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography>Subtotal</Typography>

                <Typography>
                  ₹ {totalPrice.toFixed(2)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography>Tax (10%)</Typography>

                <Typography>
                  ₹ {(totalPrice * 0.1).toFixed(2)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography>Delivery Charge</Typography>

                <Typography>
                  ₹ 50.00
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Typography>Discount</Typography>

                <Typography
                  color="success.main"
                >
                  - ₹ 100.00
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                  }}
                >
                  Grand Total
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                  }}
                  color="primary"
                >
                  ₹{" "}
                  {(
                    totalPrice +
                    totalPrice * 0.1 +
                    50 -
                    100
                  ).toFixed(2)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  mb: 2,
                  py: 1.5,
                  textTransform: "none",
                  borderRadius: 2,
                }}
              >
                Proceed to Checkout
              </Button>

              <Button
                component={Link}
                to="/"
                variant="outlined"
                fullWidth
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                }}
              >
                Continue Shopping
              </Button>
              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Estimated Delivery
                </Typography>

                <Typography color="text.secondary">
                  2-3 Business Days
                </Typography>
                <Box sx={{ mt: 3 }}>

                  <Typography color="success.main">
                    ✔ Secure Checkout
                  </Typography>

                  <Typography color="success.main">
                    ✔ Free Delivery above ₹500
                  </Typography>

                  <Typography color="success.main">
                    ✔ 7 Days Return Policy
                  </Typography>

                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
export default Cart;