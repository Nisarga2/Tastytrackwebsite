import Wrapper from "../../assets/wrappers/DashboardFormPage";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import { FaSearch, FaStar, FaHeart } from "react-icons/fa";
import InputBase from "@mui/material/InputBase";
import { useAppContext } from "../../context/appContext";
import { useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import {
  AppBar,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  Rating,
  TextField,
  Toolbar,
  Typography,
  colors,
} from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#222",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Stats = () => {
  const { getHotels, hotels, isLoading } = useAppContext();
  const [hotelList, setHotelList] = useState([]);
  const [open, setOpen] = useState(false);
  const [hotel, setHotel] = useState();
  const [rating, setRating] = useState([]);
  const [foods, setFoods] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [value, setValue] = useState(2);

  const handleOpen = (e) => {
    let selectedHotel = hotelList.find((r) => r._id === e.target.id);
    setHotel(selectedHotel);
    for (let i = 0; i < selectedHotel.rating; i++) {
      rating.push(i);
    }
    let foodsMap = [];
    selectedHotel.foods.forEach((f, index) => {
      console.log(f);
      foodsMap.push({ id: index, food: f, offer: 20 });
    });
    for (let k = 0; k < foodsMap.length; k++) {
      foodsMap[k].cost = selectedHotel.cost[k];
      foodsMap[k].image = selectedHotel.foodImage[k]
        ? selectedHotel.foodImage[k].i
        : "https://picsum.photos/300/300?random=2";
    }
    console.log(foodsMap);
    setFoods(foodsMap);
    setOpen(true);

    setTimeout(() => {
      handleROpen();
    }, 5000);
  };
  const handleClose = () => {
    setOpen(false);
    console.log(hotelList);
    setRating([]);
  };

  useEffect(() => {
    getHotels();
  }, []);
  setTimeout(() => {
    setHotelList(hotels);
  }, 1000);

  const [cart, setCart] = useState([]);
  const onAddToCart = (v) => {
    // debugger;
    // if (cart == []) {
    cart.push(v);
    alert("Added to Cart Successfully");
    // } else {
    // cart.forEach((item) => {
    //   if (item.id != v.id) cart.push(v);
    // });
    // }
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
  };

  const [filterHotel, setFilterText] = useState("");

  const onfilter = (e) => {
    // setText(e.target.value);
    // Specify your filter criteria here
    let text = e.target.value;
    console.log(text);
    const filteredHotel = hotels.filter((hotel) => {
      return (
        hotel.name.toUpperCase() === text.toUpperCase() ||
        hotel.location.toUpperCase() === text.toUpperCase()
      );
    });
    setFilterText(filteredHotel);
    if (e.target.value == "") {
      setFilterText("");
    }
  };

  const onClearFilter = () => {
    setFilterText("");
  };
  const [wishlist, setWishlist] = useState([]);

  const onAddToWishList = (v) => {
    // debugger;
    // if (cart == []) {
    wishlist.push(v);
    alert("Added to wishlist Successfully");
    // } else {
    // cart.forEach((item) => {
    //   if (item.id != v.id) cart.push(v);
    // });
    // }
    localStorage.setItem("FoodWishlist", JSON.stringify(wishlist));
    console.log(wishlist);
  };

  const [Ropen, setROpen] = useState(false);
  const handleROpen = () => {
    setROpen(true);
  };
  const handleRClose = () => {
    setROpen(false);
  };

  return (
    <Box>
      <Box sx={{}}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            sx={{
              backgroundColor: "#66e137",
            }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                Tasty Tracker
              </Typography>
              <Search onChange={onfilter}>
                <SearchIconWrapper>
                  <FaSearch />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              {/* <Button
                sx={{
                  backgroundColor: "#6C63FF",
                  "&:hover": {
                    backgroundColor: "#6C63FF",
                  },
                }}
                variant="contained"
              >
                Search
              </Button> */}
              {/* <Box
                sx={{
                  margin: "0px 15px 0px 15px",
                  fontSize: "25px",
                }}
              >
                <FaHeart />
              </Box> */}
            </Toolbar>
          </AppBar>
        </Box>
      </Box>

      <Box
        component="form"
        // onSubmit={onBookSubmit}
        sx={{
          flexGrow: 1,
         // backgroundImage: `url(${"dashboard.svg"})`,
          // backgroundRepeat: "no-repeat",
          p: "20px",
          color: "white",
        }}
      >
        <Typography
          sx={{
            m: "10px",
          }}
          variant="h4"
        >
          Restaurants and Hotel
        </Typography>
        <div>
          
  <Carousel
    showThumbs={false}
    style={{ height: '300px', width: '100px', backgroundColor: 'gray', borderRadius: '10px' }}
  >
    {/* Carousel items */}
    
    <div>
      <img src={"cur.png"} alt="Photo 2" height="500" width="100" />
    </div>
    <div>
      <img src={"cur2.png"} alt="Photo 2" height="500" width="100" />
    </div>
    <div>
      <img src={"cur.png"} alt="Photo 2" height="500" width="100" />
    </div>
    <div>
      <img src={"cur.png"} alt="Photo 2" height="500" width="100" />
    </div>
    <div>
      <img src={"cur.png"} alt="Photo 2" height="500" width="100" />
    </div>
    {/* Add more carousel items as needed */}
  </Carousel>
</div>


        {filterHotel.length != 0 ? (
          <Box display={"flex"} justifyContent={"space-between"}>
            <h4>Filtered Hotel</h4>
            <Button
              onClick={onClearFilter}
              sx={{
                color: "#66e137",
              }}
            >
              {" "}
              Clear Filter
            </Button>
          </Box>
        ) : (
          ""
        )}
        <Grid container sx={{ paddingBottom: "40px" }} spacing={2}>
          {filterHotel
            ? filterHotel.map((hotel) => (
                <Grid item xs={4} sx={{}}>
                  <Card
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography
                          sx={{ fontSize: 14 }}
                          // color
                          gutterBottom
                        >
                          Word of the Food
                        </Typography>
                        <Typography variant="h5" component="div">
                          {hotel.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }}>
                          {hotel.location}
                        </Typography>
                        <Typography variant="body2">
                          {hotel.description.slice(0, 10)}
                          <br />
                          {'"a benevolent smile"'}
                        </Typography>
                        <CardActions>
                          <Button
                            sx={{
                              color: "#66e137",
                            }}
                            onClick={handleOpen}
                            id={hotel._id}
                            size="small"
                          >
                            Order food
                          </Button>
                        </CardActions>
                      </CardContent>
                    </Box>
                    <CardMedia
                      component="img"
                      sx={{ width: 200 }}
                      image={hotel.image}
                      backgroundSize="cover"
                      alt="Live from space album cover"
                    />
                  </Card>
                </Grid>
              ))
            : ""}
        </Grid>

        <Grid container spacing={2}>
          {hotelList ? (
            hotelList.map((hotel, index) => {
              return (
                <Grid item xs={4} sx={{}}>
                  <Card
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography
                          sx={{ fontSize: 14 }}
                          // color
                          gutterBottom
                        >
                          Word of the Food
                        </Typography>
                        <Typography variant="h5" component="div">
                          {hotel.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }}>
                          {hotel.location}
                        </Typography>
                        <Typography variant="body2">
                          {hotel.description.slice(0, 10)}
                          <br />
                          {'"a benevolent smile"'}
                        </Typography>
                        <CardActions>
                          <Button
                            sx={{
                              color: "#66e137",
                            }}
                            onClick={handleOpen}
                            id={hotel._id}
                            size="small"
                          >
                            Order food
                          </Button>
                        </CardActions>
                      </CardContent>
                    </Box>
                    <CardMedia
                      component="img"
                      sx={{ width: 200 }}
                      image={hotel.image}
                      backgroundSize="cover"
                      alt="Live from space album cover"
                    />
                  </Card>
                </Grid>
              );
            })
          ) : (
            <h3>isLoading</h3>
          )}
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          {hotel ? (
            <Box
              sx={{
                ...style,
                width: 1400,
                height: 600,
                overflowY: "scroll",
                backgroundImage: `url(${"booking.svg"})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                color: "white",
              }}
            >
              <h2 id="parent-modal-title">{hotel ? hotel.name : ""}</h2>
              <img src={hotel ? hotel.image : ""} style={{ width: 930 }} />
              {/* <p>{hotel.location}</p> */}

              <p id="parent-modal-description">
                {hotel ? hotel.description : ""}
              </p>
              {rating.map((r) => (
                <FaStar />
              ))}

              <h4 id="parent-modal-title"></h4>
              <Grid container spacing={2}>
                {foods.map((f, index) => (
                  <Grid item xs={3}>
                    {/* <Card
                      sx={{
                        minWidth: 275,
                        backgroundColor: "black",
                        color: "white",
                      }}
                    >
                      <CardMedia
                        sx={{ height: 150 }}
                        image={f.image}
                        title="green iguana"
                      />
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {f.food}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }}>
                          price: {f.cost ? f.cost : "--"}Rs
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          sx={{
                            color: "#66e137",
                          }}
                          size="small"
                          onClick={() => onAddToCart(f)}
                        >
                          Add to Cart
                        </Button>
                      </CardActions>
                    </Card> */}
                    <Card
                      sx={{
                        backgroundColor: "black",
                        color: "white",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Box
                            style={{
                              display: "flex",
                              // flexDirection: "row",
                              justifyContent: "space-between",
                              // alignItems: "",
                            }}
                          >
                            <Typography variant="h5" component="div">
                              {f.food}
                            </Typography>
                            <FaHeart
                              color="#ff0000"
                              onClick={() => onAddToWishList(f)}
                            />
                          </Box>
                          <Typography sx={{ mb: 1.5 }}>
                            price: {f.cost ? f.cost : "--"}Rs
                          </Typography>

                          <CardActions>
                            <Button
                              sx={{
                                color: "#66e137",
                              }}
                              size="small"
                              onClick={() => onAddToCart(f)}
                            >
                              Add to Cart
                            </Button>
                          </CardActions>
                        </CardContent>
                      </Box>
                      <CardMedia
                        component="img"
                        sx={{ width: 150 }}
                        image={f.image}
                        backgroundSize="cover"
                        alt="Live from space album cover"
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <h2>loading</h2>
          )}
        </Modal>
      </Box>
      <Box>
        {/* <Button onClick={handleROpen}>Order food</Button> */}
        <Modal
          open={Ropen}
          onClose={handleRClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 500, color: "#fff" }}>
            <h2 id="child-modal-title"> Rate the Hotel</h2>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <p id="child-modal-description">Thank you for your Feedback 😊</p>
            <Button
              sx={{
                color: "#66e137",
              }}
              onClick={handleRClose}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Stats;

function ChildModal() {
  const [Ropen, setROpen] = useState(false);
  const handleROpen = () => {
    setROpen(true);
  };
  const handleRClose = () => {
    setROpen(false);
  };

  return (
    <Box>
      <Button onClick={handleROpen}>Order food</Button>
      <Modal
        open={Ropen}
        onClose={handleRClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <img width="400px" height="400px" src="tasty.png" />
          <h2 id="child-modal-title">Ordered Food successfully</h2>
          <h2>💳 Processing Payment</h2>
          <p id="child-modal-description">Thank you for your order 😊</p>
          <Button onClick={handleRClose}>Close</Button>
        </Box>
      </Modal>
    </Box>
  );
}
