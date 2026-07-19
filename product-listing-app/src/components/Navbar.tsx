import { AppBar, Toolbar, Typography, Badge, IconButton,  Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
function Navbar() {
  const totalQuantity = useSelector(
    (state: any) => state.cart.totalQuantity
  );

  const wishlistCount = useSelector(
    (state: any) => state.wishlist.wishlistItems.length
  );

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Product Store
        </Typography>
<Button
  color="inherit"
  component={Link}
  to="/"
  sx={{
    mr: 3,
    textTransform: "none",
    fontSize: "16px",
    fontWeight: "bold",
  }}
>
  Home
</Button>
        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton
            color="inherit"
            component={Link}
            to="/wishlist"
          >
            <Badge badgeContent={wishlistCount} color="error">
              <FavoriteIcon />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            component={Link}
            to="/cart"
          >
            <Badge badgeContent={totalQuantity} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;