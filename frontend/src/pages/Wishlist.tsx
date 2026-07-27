import {Box,Typography,Card,CardContent,CardMedia,Button,Toolbar,Container,Grid,Chip,} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";
import type { RootState } from "../redux/store";

import Navbar from "../components/Navbar";
import CustomSnackbar from "../components/CustomSnackbar";
import { useState } from "react";

function Wishlist() {
    const dispatch = useDispatch();

    const wishlistItems = useSelector(
        (state: RootState) => state.wishlist.wishlistItems
    );

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState("");

    const handleClose = () => {
        setOpenSnackbar(false);
    };

    if (wishlistItems.length === 0) {
        return (
            <>
                <Navbar />
                <Toolbar />

                <Container maxWidth="md">
                    <Box
                        sx={{
                            mt: 10,
                            textAlign: "center",
                        }}
                    >
                        <FavoriteIcon
                            sx={{
                                fontSize: 90,
                                color: "#ef5350",
                            }}
                        />

                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{
                                fontWeight: "bold",
                                mt: 2,
                            }}
                        >
                            Your Wishlist is Empty
                        </Typography>

                        <Typography
                            sx={{
                                mt: 2,
                                color: "#666",
                            }}
                        >
                            Save your favourite products here.
                        </Typography>

                        <Button
                            variant="contained"
                            sx={{
                                mt: 4,
                                textTransform: "none",
                            }}
                        >
                            Continue Shopping
                        </Button>
                    </Box>
                </Container>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <Toolbar />

            <CustomSnackbar
                open={openSnackbar}
                message={message}
                handleClose={handleClose}
            />

            <Container
                maxWidth="xl"
                sx={{
                    mt: 3,
                    mb: 5,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 4,
                        flexWrap: "wrap",
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        ❤️ My Wishlist
                    </Typography>

                    <Chip
                        color="primary"
                        label={`${wishlistItems.length} Items`}
                        sx={{
                            fontWeight: "bold",
                        }}
                    />
                </Box>

                <Grid container spacing={3}>
                    {wishlistItems.map((product) => (
                        <Grid
                            key={product._id}
                            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                        >
                            <Card
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRadius: 3,
                                    transition: "0.3s",
                                    overflow: "hidden",
                                    boxShadow: 3,

                                    "&:hover": {
                                        transform: "translateY(-6px)",
                                        boxShadow: 8,
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        background: "#fafafa",
                                        p: 2,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={product.thumbnail}
                                        alt={product.title}
                                        sx={{
                                            width: 180,
                                            height: 180,
                                            objectFit: "contain",
                                        }}
                                    />
                                </Box>

                                <CardContent
                                    sx={{
                                        flexGrow: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Typography
                                        component="h2"
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            minHeight: 60,
                                        }}
                                    >
                                        {product.title}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "#f57c00",
                                            fontSize: 18,
                                            mt: 1,
                                        }}
                                    >
                                        ★★★★☆
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "#1976d2",
                                            fontWeight: "bold",
                                            fontSize: 24,
                                            mt: 1,
                                        }}
                                    >
                                        ₹{product.price}
                                    </Typography>

                                    <Box sx={{ flexGrow: 1 }} />

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        startIcon={<ShoppingCartIcon />}
                                        sx={{
                                            mt: 3,
                                            mb: 1,
                                            textTransform: "none",
                                            borderRadius: 2,
                                        }}
                                        onClick={() => {
                                            dispatch(addToCart(product));

                                           dispatch(removeFromWishlist(product._id));

                                            setMessage("Moved to Cart");

                                            setOpenSnackbar(true);
                                        }}
                                    >
                                        Move to Cart
                                    </Button>

                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        sx={{
                                            textTransform: "none",
                                            borderRadius: 2,
                                        }}
                                        onClick={() => {
                                            dispatch(removeFromWishlist(product._id));

                                            setMessage("Removed from Wishlist");

                                            setOpenSnackbar(true);
                                        }}
                                    >
                                        Remove
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}

export default Wishlist;