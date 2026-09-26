import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import api from "../services/api";
import { showSnackbar } from "../redux/uiSlice";
import type { Product } from "../types/product";
import type { RootState } from "../redux/store";
import EditProduct from "../pages/EditProduct";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlistSlice";

interface ProductCardProps {
  product: Product;
  fetchProducts?: () => void;
}

function ProductCard({ product, fetchProducts }: ProductCardProps) {
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

  const [openDetails, setOpenDetails] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openRatingDialog, setOpenRatingDialog] = useState(false);
  const [isRating, setIsRating] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { isAdmin } = useSelector((state: any) => state.auth);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    dispatch(showSnackbar({ message: "Added to cart", severity: "success" }));
  };

  const handleWishlist = () => {
    if (wishlistItem) {
      dispatch(removeFromWishlist(product._id));
      dispatch(showSnackbar({ message: "Removed from wishlist", severity: "info" }));
    } else {
      dispatch(addToWishlist(product));
      dispatch(showSnackbar({ message: "Added to wishlist", severity: "success" }));
    }
  };

  const handleRatingSubmit = async (value: number) => {
    const hasRated = localStorage.getItem(`rated_${product._id}`);
    if (hasRated) {
      dispatch(showSnackbar({ message: "You have already rated this product", severity: "warning" }));
      setOpenRatingDialog(false);
      return;
    }
    
    try {
      setIsRating(true);
      const res = await api.post(`/products/${product._id}/rating`, { rating: value });
      if (res.data.success) {
         localStorage.setItem(`rated_${product._id}`, "true");
         if (fetchProducts) fetchProducts();
         dispatch(showSnackbar({ message: "Rating submitted successfully", severity: "success" }));
      }
    } catch(e) {
       dispatch(showSnackbar({ message: "Failed to submit rating", severity: "error" }));
    } finally {
       setIsRating(false);
       setOpenRatingDialog(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await api.delete(`/products/${product._id}`);
      if (res.data.success) {
        setOpenDeleteDialog(false);
        dispatch(showSnackbar({ message: "Product deleted successfully", severity: "success" }));
        if (fetchProducts) fetchProducts();
      }
    } catch (e) {
      dispatch(showSnackbar({ message: "Unable to delete product", severity: "error" }));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Card
        sx={{
          width: 260,
          height: "100%",
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
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 5,
            display: "flex",
            gap: 1,
          }}
        >
          {isAdmin && (
            <>
            <Box
              sx={{
                bgcolor: "background.paper",
                borderRadius: "50%",
                boxShadow: 1,
              }}
            >
              <IconButton size="small" onClick={() => setOpenEdit(true)} title="Edit Product">
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box
              sx={{
                bgcolor: "background.paper",
                borderRadius: "50%",
                boxShadow: 1,
              }}
            >
              <IconButton size="small" onClick={() => setOpenDeleteDialog(true)} title="Delete Product">
                <DeleteIcon fontSize="small" color="error" />
              </IconButton>
            </Box>
            </>
          )}
          <Box
            sx={{
              bgcolor: "background.paper",
              borderRadius: "50%",
              boxShadow: 1,
            }}
          >
            <IconButton size="small" onClick={handleWishlist} title="Add to Wishlist">
              {wishlistItem ? (
                <FavoriteIcon color="error" fontSize="small" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            height: 150,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "background.default",
            p: 1.5,
          }}
        >
          <Box
            component="img"
            src={product.thumbnail}
            alt={product.title}
            onClick={() => setOpenDetails(true)}
            sx={{
              width: 130,
              height: 130,
              objectFit: "contain",
              cursor: "pointer",
            }}
          />
        </Box>

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
              variant="body2"
              color="text.primary"
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5, cursor: "pointer", fontWeight: "bold" }}
              onClick={() => setOpenRatingDialog(true)}
            >
              ⭐ {product.rating} ({product.ratingCount || 0})
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 1,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                cursor: "pointer",
              }}
              onClick={() => setOpenDetails(true)}
            >
              {product.description}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
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

      <Dialog
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>{product.title}</DialogTitle>
        <DialogContent dividers>
          <Box
            component="img"
            src={product.thumbnail}
            alt={product.title}
            sx={{
              width: "100%",
              maxHeight: 250,
              objectFit: "contain",
              mb: 2,
            }}
          />
          <Typography variant="body1" sx={{ mb: 2 }}>
            {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Brand:</strong> {product.brand}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Category:</strong> {product.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Rating:</strong> ⭐ {product.rating} ({product.ratingCount || 0})
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Stock:</strong> {product.stock}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 2, fontWeight: "bold" }}>
            ₹{product.price}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetails(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        fullWidth
        maxWidth="sm"
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            maxWidth: 640,
            maxHeight: "90vh",
            m: 2,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Edit Product</DialogTitle>
        <DialogContent
          sx={{
            overflowX: "hidden",
            px: { xs: 2, sm: 3 },
            pb: 2,
          }}
        >
          <EditProduct
            product={product}
            onProductUpdated={async () => {
              setOpenEdit(false);
              if (fetchProducts) fetchProducts();
            }}
            onCancel={() => setOpenEdit(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openRatingDialog} onClose={() => setOpenRatingDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold" }}>Rate this product</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
           <Button variant="outlined" onClick={() => handleRatingSubmit(1)} disabled={isRating}>{isRating ? "Submitting..." : "1 ⭐ Bad"}</Button>
           <Button variant="outlined" onClick={() => handleRatingSubmit(2)} disabled={isRating}>{isRating ? "Submitting..." : "2 ⭐ Bad"}</Button>
           <Button variant="outlined" onClick={() => handleRatingSubmit(3)} disabled={isRating}>{isRating ? "Submitting..." : "3 ⭐ Medium"}</Button>
           <Button variant="outlined" onClick={() => handleRatingSubmit(4)} disabled={isRating}>{isRating ? "Submitting..." : "4 ⭐ Good"}</Button>
           <Button variant="outlined" onClick={() => handleRatingSubmit(5)} disabled={isRating}>{isRating ? "Submitting..." : "5 ⭐ Best"}</Button>
        </DialogContent>
        <DialogActions>
           <Button onClick={() => setOpenRatingDialog(false)} disabled={isRating}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", color: "error.main" }}>Delete Product</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} disabled={isDeleting}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained" disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductCard;