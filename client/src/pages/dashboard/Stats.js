import Wrapper from "../../assets/wrappers/DashboardFormPage";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import { FaSearch, FaStar } from "react-icons/fa";
import InputBase from "@mui/material/InputBase";
import { useAppContext } from "../../context/appContext";
import { useEffect, useState } from "react";

import {
  AppBar,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  TextField,
  Toolbar,
  Typography,
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
  bgcolor: "background.paper",
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

  const handleOpen = (e) => {
    let selectedHotel = hotelList.find((r) => r._id === e.target.id);
    setHotel(selectedHotel);
    for (let i = 0; i < selectedHotel.rating; i++) {
      rating.push(i);
    }
    let foodsMap = [];
    selectedHotel.foods.forEach((f, index) => {
      foodsMap.push({ id: index, food: f });
    });
    for (let k = 0; k < foodsMap.length; k++) {
      console.log(selectedHotel.foodImage[k]);
      foodsMap[k].image = selectedHotel.foodImage[k]
        ? selectedHotel.foodImage[k].i
        : "https://picsum.photos/300/300?random=2";
    }
    console.log(foodsMap);
    setFoods(foodsMap);
    setOpen(true);
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

  return (
    <Box>
      <Box sx={{}}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            sx={{
              backgroundColor: "#2cb1bc",
            }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                BOOK LIBRARY
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <FaSearch />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <Button
                sx={{
                  backgroundColor: "#2cb1bc",
                  "&:hover": {
                    backgroundColor: "#177178",
                  },
                }}
                variant="contained"
              >
                Search
              </Button>
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
        sx={{ flexGrow: 1, backgroundColor: "white", p: "20px" }}
      >
        <Typography
          sx={{
            m: "10px",
          }}
          variant="h4"
        >
          Restaurants and Hotels
        </Typography>
        <Grid container spacing={2}>
          {hotelList ? (
            hotelList.map((hotel, index) => {
              return (
                <Grid item xs={3}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardMedia
                      sx={{ height: 150 }}
                      image={hotel.image}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Word of the Food
                      </Typography>
                      <Typography variant="h5" component="div">
                        {hotel.name}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {hotel.location}
                      </Typography>
                      <Typography variant="body2">
                        {hotel.description}
                        <br />
                        {'"a benevolent smile"'}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={handleOpen} id={hotel._id} size="small">
                        Order food
                      </Button>
                    </CardActions>
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
              sx={{ ...style, width: 1400, height: 600, overflowY: "scroll" }}
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
                    <Card sx={{ minWidth: 275 }}>
                      <CardMedia
                        sx={{ height: 150 }}
                        image={f.image}
                        title="green iguana"
                      />
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {f.food}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          price: 40Rs
                        </Typography>
                        <ButtonGroup
                          size="small"
                          variant="outlined"
                          id={index}
                          aria-label="outlined primary button group"
                        >
                          <Button
                            onClick={() =>
                              setQuantity(quantity >= 0 ? 0 : quantity - 1)
                            }
                          >
                            -
                          </Button>
                          <Button>{quantity >= 0 ? quantity : 0}</Button>
                          <Button onClick={() => setQuantity(quantity + 1)}>
                            +
                          </Button>
                        </ButtonGroup>
                      </CardContent>
                      <CardActions>
                        {/* <Button onClick={handleOpen} size="small">
                        Order food
                      </Button> */}
                        <ChildModal />
                      </CardActions>
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
    </Box>
  );
};

export default Stats;

function ChildModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button onClick={handleOpen}>Order Food</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <h2 id="child-modal-title">Ordered Food successfully</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </Box>
  );
}
