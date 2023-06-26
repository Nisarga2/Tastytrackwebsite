import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const WishList = () => {
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("FoodWishlist"))
  );

  const [cart, setCart] = useState([]);

  const onAddToCart = (item) => {
    cart.push(item);
    alert("Added to Cart Successfully");
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
  };

  const onRemoveFromWishlist = (item) => {
    const updatedWishlist = wishlist.filter((w) => w.id !== item.id);
    setWishlist(updatedWishlist);
    localStorage.setItem("FoodWishlist", JSON.stringify(updatedWishlist));
  };

  const onClearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem("FoodWishlist");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Item
            sx={{
              margin: "20px",
              padding: "20px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Typography variant="h5">WishList</Typography>
            <Button
              sx={{
                float: "right",
                color: "#ff0000",
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "#ff0000",
                  color: "#fff",
                },
              }}
              onClick={onClearWishlist}
              className="clear-button"
            >
              Clear
            </Button>
            {wishlist && wishlist.length > 0 ? (
              wishlist.map((item) => (
                <Card
                  sx={{
                    display: "flex",
                    my: "5px",
                    animation: "slideInAnimation 0.5s ease-in-out",
                    transition: "transform 0.2s ease-in-out",
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                  }}
                  key={item.id}
                  className="wishlist-item"
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: 250,
                    }}
                  >
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5">
                        {item.food}
                      </Typography>

                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        Rs {item.cost ? item.cost : "--"}
                      </Typography>
                    </CardContent>
                    <Button
                      sx={{
                        color: "#66e137",
                        transition: "all 0.3s",
                        "&:hover": {
                          backgroundColor: "#66e137",
                          color: "#fff",
                        },
                      }}
                      onClick={() => onAddToCart(item)}
                      className="add-to-cart-button"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      sx={{
                        color: "#ff0000",
                        transition: "all 0.3s",
                        "&:hover": {
                          backgroundColor: "#ff0000",
                          color: "#fff",
                        },
                      }}
                      onClick={() => onRemoveFromWishlist(item)}
                      className="remove-button"
                    >
                      Remove
                    </Button>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{
                      width: 151,
                      cursor: "pointer",
                      animation: "none",
                    }}
                    image={item.image}
                    alt="Food item"
                    className="wishlist-image"
                    onClick={(event) => {
                      const image = event.target;
                      image.style.animation = "rotateAnimation 0.5s ease-in-out";
                      setTimeout(() => {
                        image.style.animation = "";
                      }, 500);
                    }}
                    
                  />
                </Card>
              ))
            ) : (
              <Typography variant="subtitle1">Empty wishlist</Typography>
            )}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WishList;
