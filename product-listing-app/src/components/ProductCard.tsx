import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useSelector, useDispatch } from "react-redux";
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
    (item) => item.id === product.id
  );

  const wishlistItem = wishlistItems.find(
    (item) => item.id === product.id
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
      dispatch(removeFromWishlist(product.id));
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
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          borderRadius: 3,
          transition: "0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 8,
          },
        }}
      >
        
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 2,
          }}
        >
          <IconButton onClick={handleWishlist}>
            {wishlistItem ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Box>

        
        <CardMedia
          component="img"
          image={product.thumbnail}
          alt={product.title}
          sx={{
    width:130,
    height:130,
    objectFit:"contain",
    background:"#f8fafc",
    borderRadius:"12px",
    p:1
}}
        />

        <CardContent>
          <Typography
            component="h2"
            variant="h6"
            sx={{
              minHeight: 64,
              fontWeight: 500,
            }}
          >
            {product.title}
          </Typography>

          <Typography
            component="p"
            variant="body1"
            sx={{
              mt: 1,
              mb: 2,
              fontWeight: "bold",
            }}
          >
            ₹{product.price}
          </Typography>

          {!cartItem ? (
            <Button
              variant="contained"
              fullWidth
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                mt: 1,
              }}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{
                  minWidth: 40,
                  width: 40,
                  borderRadius:"10px",
                  height: 40,
                }}
                onClick={() =>
                  dispatch(decreaseQuantity(product.id))
                }
              >
                -
              </Button>

              <Typography
                component="span"
                sx={{
                  width: 30,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {cartItem.quantity}
              </Typography>

              <Button
                variant="contained"
                size="small"
                sx={{
                  minWidth: 40,
                  width: 40,
                  borderRadius:"10px",
                  height: 40,
                }}
                onClick={() =>
                  dispatch(increaseQuantity(product.id))
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