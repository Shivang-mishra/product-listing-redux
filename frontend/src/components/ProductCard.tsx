import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import type { Product } from "../types/product";
import type { RootState } from "../redux/store";

import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";

import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlistSlice";

import CustomSnackbar from "./CustomSnackbar";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state: RootState) => state.cart.cartItems
  );

  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.wishlistItems
  );

  const cartItem = cartItems.find(
    (item) => item._id === product._id
  );

  const wishlistItem = wishlistItems.find(
    (item) => item._id === product._id
  );

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setSnackbarMessage("Product added to cart");
    setOpenSnackbar(true);
  };

  const handleWishlist = () => {
    if (wishlistItem) {
      dispatch(removeFromWishlist(product._id));
      setSnackbarMessage("Removed from wishlist");
    } else {
      dispatch(addToWishlist(product));
      setSnackbarMessage("Added to wishlist");
    }

    setOpenSnackbar(true);
  };

  return (
    <>
      <Card
        sx={{
          width: 260,
          height: 335,
          borderRadius: 3,
          boxShadow: 3,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          transition: "0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 8,
          },
        }}
      >
        {/* Wishlist */}

        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 5,
            bgcolor: "#fff",
            borderRadius: "50%",
            boxShadow: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={handleWishlist}
          >
            {wishlistItem ? (
              <FavoriteIcon color="error"fontSize="small" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>
        </Box>

        {/* Product Image */}

        <Box
          sx={{
            height: 150,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#fafafa",
            p: 1.5,
          }}
        >
          <Box
            component="img"
            src={product.thumbnail}
            alt={product.title}
            sx={{
              width: 130,
              height: 130,
              objectFit: "contain",
            }}
          />
        </Box>
        {/* Product Details */}

        <CardContent
          sx={{
            flexGrow: 1,
            p: 2,
            pt: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                fontSize: "1rem",
                lineHeight: 1.4,
                minHeight: 42,
                mb: 1,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {product.title}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                mt: 1.5,
                fontWeight: "bold",
                color: "#000",
              }}
            >
              ₹{product.price}
            </Typography>
          </Box>

          {!cartItem ? (
            <Button
              variant="contained"
              fullWidth
              onClick={handleAddToCart}
              sx={{
                mt: 2,
                height: 42,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: "0.95rem",
                textTransform: "uppercase",
              }}
            >
              ADD TO CART
            </Button>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                mt: 2,
              }}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{
                  minWidth: 42,
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                }}
                onClick={() =>
                  dispatch(decreaseQuantity(product._id))
                }
              >
                -
              </Button>

              <Typography
                sx={{
                  minWidth: 24,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {cartItem.quantity}
              </Typography>

              <Button
                variant="contained"
                size="small"
                sx={{
                  minWidth: 42,
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                }}
                onClick={() =>
                  dispatch(increaseQuantity(product._id))
                }
              >
                +
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      <CustomSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
      />
    </>
  );
}

export default ProductCard;