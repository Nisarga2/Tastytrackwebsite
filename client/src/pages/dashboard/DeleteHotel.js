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
  const { getHotels, hotels, isLoading, deleteHotel } = useAppContext();
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
      console.log(selectedHotel.cost[k]);
      foodsMap[k].cost = selectedHotel.cost[k];
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
  const handleDelete = (e) => {
    console.log(e.target.id);
  };

  useEffect(() => {
    getHotels();
  }, []);
  setTimeout(() => {
    setHotelList(hotels);
  }, 1000);

  return (
    <Box>
      {/* <Box sx={{}}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            sx={{
              backgroundColor: "#6C63FF",
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
                  backgroundColor: "#6C63FF",
                  "&:hover": {
                    backgroundColor: "#6C63FF",
                  },
                }}
                variant="contained"
              >
                Search
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </Box> */}

      <Box
        component="form"
        // onSubmit={onBookSubmit}
        sx={{
          flexGrow: 1,
          backgroundImage: `url(${"dashboard.svg"})`,
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
          Delete Restaurants and Hotels
        </Typography>
        <Grid container spacing={2}>
          {hotelList ? (
            hotelList.map((hotel, index) => {
              return (
                <Grid item xs={3}>
                  <Card
                    sx={{
                      minWidth: 275,
                      backgroundColor: "black",
                      color: "white",
                    }}
                  >
                    <CardMedia
                      sx={{ height: 150 }}
                      image={hotel.image}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} gutterBottom>
                        Word of the Food
                      </Typography>
                      <Typography variant="h5" component="div">
                        {hotel.name}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }}>{hotel.location}</Typography>
                      <Typography variant="body2">
                        {hotel.description}
                        <br />
                        {'"a benevolent smile"'}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        sx={{
                          color: "#66e137",
                        }}
                        onClick={() => deleteHotel(hotel._id)}
                        id={hotel._id}
                        size="small"
                      >
                        Delete Hotel
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
      </Box>
    </Box>
  );
};

export default Stats;

function ChildModal() {
  const [open, setOpen] = useState(false);
  const [bookAlert, setBookAlert] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      setBookAlert(true);
    }, 5000);
  };
  const handleClose = () => {
    setBookAlert(false);
    setOpen(false);
  };

  return (
    <Box>
      <Button onClick={handleOpen}>Order food</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <img width="400px" height="400px" src="tasty.png" />
          {bookAlert ? (
            <h2 id="child-modal-title">Ordered Food successfully</h2>
          ) : (
            <h2>💳 Processing Payment</h2>
          )}
          <p id="child-modal-description">Thank you for your order 😊</p>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </Box>
  );
}
