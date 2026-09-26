import { useState, type Dispatch, type SetStateAction, useEffect } from "react";

import { useSelector } from "react-redux";
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
  Skeleton,
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
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  categories: string[];
  fetchProducts: () => void;
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
  search,
  setSearch,
  categories,
  fetchProducts,
}: HomeProps) {
  const products = useSelector(
    (state: any) => state.product.products,
  ) as Product[];

  const loading = useSelector((state: any) => state.product.loading);
  const [openAddProduct, setOpenAddProduct] = useState(false);

  // Debounce search state
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(localSearch);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [localSearch, setSearch, setPage]);

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
            value={localSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value);
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
          <Grid container spacing={3}>
            {Array.from(new Array(8)).map((_, index) => (
              <Grid
                key={index}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                  lg: 3,
                }}
              >
                <Box sx={{ p: 1 }}>
                  <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
                  <Skeleton variant="text" sx={{ mt: 2, fontSize: '1.5rem' }} />
                  <Skeleton variant="text" width="60%" />
                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="circular" width={40} height={40} />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : products.length === 0 ? (
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
            {products.map((product) => (
              <Grid
                key={product._id}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                  lg: 3,
                }}
              >
                <ProductCard product={product} fetchProducts={fetchProducts} />
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
              fetchProducts(); // Refresh products
            }}
            onResetPage={() => {
              setPage(1);
            }}
            onCancel={() => {
              setOpenAddProduct(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Home;
