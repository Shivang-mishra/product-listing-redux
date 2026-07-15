import { AppBar, Toolbar, Typography, Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Navbar() {
  const totalQuantity = useSelector(
    (state: any) => state.cart.totalQuantity
  );

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Product Store
        </Typography>

     <IconButton
  color="inherit"
  component={Link}
  to="/cart"
>
  <Badge badgeContent={totalQuantity} color="error">
    <ShoppingCartIcon />
  </Badge>
</IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;