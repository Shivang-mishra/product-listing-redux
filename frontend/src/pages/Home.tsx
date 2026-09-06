import { useState, type Dispatch, type SetStateAction } from "react";

import { useSelector } from "react-redux";
import CustomSnackbar from "../components/CustomSnackbar";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import AddProduct from "./AddProduct";

import {
  Container,
  Grid,
  Typography,
  Toolbar,
  TextField,
  InputAdornment,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import type { Product } from "../types/product";

interface HomeProps {
  sortBy: string;
  order: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  setOrder: Dispatch<SetStateAction<string>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

function Home({
  sortBy,
  order,
  setSortBy,
  setOrder,
  page,
  setPage,
  totalPages,
  category,
  setCategory,
  darkMode,
  setDarkMode,
}: HomeProps) {
  const products = useSelector(
    (state: any) => state.product.products,
  ) as Product[];

  const loading = useSelector((state: any) => state.product.loading);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddProduct, setOpenAddProduct] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const categories = [
    "All",
    ...Array.from(new Set(products.map((product) => product.category))),
  ];

  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleSortChange = (value: string) => {
    const [newSortBy, newOrder] = value.split("-");

    setSortBy(newSortBy);
    setOrder(newOrder);
    setPage(1);
  };

  return (
    <>
      <Navbar
        onAddProductClick={() => setOpenAddProduct(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Toolbar />

      <Container sx={{ py: 4 }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 4,
          }}
        >
          All Products
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            mb: 4,
          }}
        >
          <TextField
            size="small"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            sx={{
              width: {
                xs: "100%",
                sm: "80%",
                md: "55%",
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 1,
              mt: 1,
            }}
          >
            {categories.map((categoryItem) => (
              <Chip
                key={categoryItem}
                label={categoryItem}
                clickable
                color={category === categoryItem ? "primary" : "default"}
                variant={category === categoryItem ? "filled" : "outlined"}
                onClick={() => {
                  setCategory(categoryItem);
                  setPage(1);
                }}
                sx={{
                  textTransform: "capitalize",
                  borderRadius: "20px",
                }}
              />
            ))}
          </Box>

          <FormControl
            size="small"
            sx={{
              minWidth: 220,
              mt: 1,
            }}
          >
            <InputLabel>Sort By</InputLabel>

            <Select
              value={`${sortBy}-${order}`}
              label="Sort By"
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <MenuItem value="createdAt-desc">Latest</MenuItem>

              <MenuItem value="price-asc">Price: Low to High</MenuItem>

              <MenuItem value="price-desc">Price: High to Low</MenuItem>

              <MenuItem value="title-asc">Name: A to Z</MenuItem>

              <MenuItem value="title-desc">Name: Z to A</MenuItem>

              <MenuItem value="rating-desc">Rating: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              mt: 5,
            }}
          >
            Loading products...
          </Typography>
        ) : filteredProducts.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              mt: 5,
            }}
          >
            No products found.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid
                key={product._id}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                  lg: 3,
                }}
              >
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}

        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => {
            setPage(value);
          }}
          color="primary"
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
          }}
        />
      </Container>

      <Dialog
        open={openAddProduct}
        onClose={() => setOpenAddProduct(false)}
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
        <DialogTitle>Add Product</DialogTitle>

        <DialogContent
          sx={{
            overflowX: "hidden",
            px: { xs: 2, sm: 3 },
            pb: 2,
          }}
        >
          <AddProduct
            onProductCreated={async () => {
              setOpenAddProduct(false);
            }}
            onResetPage={() => {
              setPage(1);
            }}
            onCancel={() => {
              setOpenAddProduct(false);
            }}
            onSuccess={(message) => {
              setSnackbarMessage(message);
              setOpenSnackbar(true);
            }}
          />
        </DialogContent>
      </Dialog>

      <CustomSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
      />
    </>
  );
}

export default Home;
