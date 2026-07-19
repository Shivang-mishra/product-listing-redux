import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
    Toolbar
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistSlice";
import type { RootState } from "../redux/store";
import Navbar from "../components/Navbar";

function Wishlist() {
    const dispatch = useDispatch();

    const wishlistItems = useSelector(
        (state: RootState) => state.wishlist.wishlistItems
    );

    return (
        <Box sx={{ p: 3 }}>
            <Navbar/>
            <Toolbar/>
            <Typography
                component="h1"
                variant="h4"
                sx={{ mb: 3, fontWeight: "bold" }}
            >
                ❤️ My Wishlist
            </Typography>
            {wishlistItems.length === 0 ? (
                <Typography>Your wishlist is empty.</Typography>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 3,
                    }}
                >
                    {wishlistItems.map((product) => (
                        <Card
                            key={product.id}
                            sx={{
                                width: 280,
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="220"
                                image={product.thumbnail}
                                sx={{ objectFit: "contain", p: 2 }}
                            />

                            <CardContent>
                                <Typography
                                    variant="h6"
                                    sx={{ minHeight: 60 }}
                                >
                                    {product.title}
                                </Typography>

                                <Typography
                                    component="h2"
                                    variant="h6"
                                    sx={{
                                        fontWeight: "bold",
                                        mb: 2,
                                    }}
                                >
                                    ₹{product.price}
                                </Typography>

                                <Button
                                    fullWidth
                                    color="error"
                                    variant="contained"
                                    onClick={() =>
                                        dispatch(removeFromWishlist(product.id))
                                    }
                                >
                                    Remove
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
}

export default Wishlist;