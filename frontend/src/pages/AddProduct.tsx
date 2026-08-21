import { useState } from "react";
import api from "../services/api";

import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

interface AddProductProps {
  onProductCreated: () => Promise<void>;
  onResetPage: () => void;
  onCancel: () => void;
  onSuccess: (message: string) => void;
}

function AddProduct({
  onProductCreated,
  onResetPage,
  onCancel,
  onSuccess,
}: AddProductProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const categories = [
    "Electronics",
    "Smartphones",
    "Laptops",
    "Home",
    "Furniture",
    "Beauty",
    "Groceries",
  ];

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setCategory("");
    setBrand("");
    setStock("");
    setRating("");
    setImage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("brand", brand);
      formData.append("stock", stock);
      formData.append("rating", rating);

      if (image) {
        formData.append("image", image);
      }

      const response = await api.post("/products", formData);

      if (response.data.success) {
        resetForm();
        onResetPage();

        await onProductCreated();

        onSuccess("Product added successfully");
      }
    } catch (error) {
      console.error("Failed to add product:", error);

      onSuccess("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
  sx={{
    width: "auto",
    maxWidth: "100%",
    boxSizing: "border-box",
    p: { xs: 1, sm: 1.5 },
    overflowX: "hidden",
  }}
>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
            },
            gap: 2,
          }}
        >
          <TextField
            label="Product Title"
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Brand"
            size="small"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Price"
            type="number"
            size="small"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            required
            slotProps={{
              htmlInput: {
                min: 0,
              },
            }}
          />

          <TextField
            label="Stock"
            type="number"
            size="small"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            fullWidth
            required
            slotProps={{
              htmlInput: {
                min: 0,
              },
            }}
          />

          <TextField
            select
            label="Category"
            size="small"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            required
          >
            {categories.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Rating"
            type="number"
            size="small"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            fullWidth
            required
            slotProps={{
              htmlInput: {
                min: 0,
                max: 5,
                step: 0.1,
              },
            }}
          />
        </Box>

        <TextField
          label="Description"
          size="small"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          fullWidth
          required
        />

        <Box
          sx={{
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 2,
            p: 2,
            display: "flex",
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
            justifyContent: "space-between",
            gap: 2,
            flexDirection: {
              xs: "column",
              sm: "row",
            },
          }}
        >
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                mb: 0.5,
              }}
            >
              Product Image
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Select an image to upload
            </Typography>

            {image && (
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 0.5,
                  maxWidth: 350,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {image.name}
              </Typography>
            )}
          </Box>

          <Button variant="outlined" component="label" size="small">
            Choose Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files?.[0] || null);
              }}
            />
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.5,
            pt: 1,
          }}
        >
          <Button
            type="button"
            variant="outlined"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AddProduct;
