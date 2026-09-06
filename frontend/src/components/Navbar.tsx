import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

interface NavbarProps {
  onAddProductClick?: () => void;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function Navbar({ onAddProductClick, darkMode, setDarkMode }: NavbarProps) {
  const totalQuantity = useSelector(
    (state: any) => state.cart.totalQuantity
  );

  const wishlistCount = useSelector(
    (state: any) => state.wishlist.wishlistItems.length
  );

  const location = useLocation();

  const [menuAnchor, setMenuAnchor] =
    useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(menuAnchor);
  const isHomePage = location.pathname === "/";

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleAddProduct = () => {
    handleMenuClose();

    if (onAddProductClick) {
      onAddProductClick();
    }
  };

  const handleThemeToggle = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            gap: 0.5,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 500,
            }}
          >
            Product Store
          </Typography>

          {isHomePage && (
            <>
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                size="small"
                aria-label="More options"
              >
                <MoreVertIcon />
              </IconButton>

              <Menu
                anchorEl={menuAnchor}
                open={isMenuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={handleAddProduct}>
                  Add Product
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>

        <IconButton
          color="inherit"
          onClick={handleThemeToggle}
          sx={{
            mr: 2,
          }}
          aria-label="Toggle theme"
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        <IconButton
          color="inherit"
          component={Link}
          to="/"
          sx={{
            mr: 2,
            fontWeight: "bold",
          }}
        >
          <Typography
            sx={{
              color: "inherit",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Home
          </Typography>
        </IconButton>

        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <IconButton
            color="inherit"
            component={Link}
            to="/wishlist"
          >
            <Badge
              badgeContent={wishlistCount}
              color="error"
            >
              <FavoriteIcon />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            component={Link}
            to="/cart"
          >
            <Badge
              badgeContent={totalQuantity}
              color="error"
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;