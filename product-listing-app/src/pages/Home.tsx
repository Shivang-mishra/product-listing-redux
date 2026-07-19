import { useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

import {
  Container,
  Grid,
  Typography,
  Toolbar,
  TextField,
  InputAdornment,
  Box,
  Chip,
  
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import type { Product } from "../types/product";

function Home() {
  const products = useSelector(
    (state: any) => state.product.products
  ) as Product[];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const categories = [
    "All",
    ...Array.from(
      new Set(products.map((product) => product.category))
    ),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />
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
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
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
  {categories.map((category) => (
    <Chip
      key={category}
      label={category}
      clickable
      color={
        selectedCategory === category
          ? "primary"
          : "default"
      }
      variant={
        selectedCategory === category
          ? "filled"
          : "outlined"
      }
      onClick={() => setSelectedCategory(category)}
      sx={{
        textTransform: "capitalize",
        borderRadius: "20px",
      }}
    />
  ))}
</Box>
        </Box>

        {filteredProducts.length === 0 ? (
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
                key={product.id}
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
      </Container>
    </>
  );
}

export default Home;