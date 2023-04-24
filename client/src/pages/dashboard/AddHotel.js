import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";
import { HotelService } from "../../service/HotelService";

const AddHotel = () => {
  const onBookSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let bookObj = {
      name: data.get("hotelName"),
      description: data.get("description"),
      type: data.get("hotelType"),
      location: data.get("location"),
      address: data.get("address"),
      rating: data.get("rating"),
    };
    try {
      let response = await HotelService.CreateHotel(bookObj);
      console.log(response);
      console.log(response.data);
      console.log(response.data.data);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      {/* <form className="form"> */}
      <Box
        component="form"
        onSubmit={onBookSubmit}
        sx={{ flexGrow: 1, backgroundColor: "white", p: "20px" }}
      >
        <Typography
          sx={{
            m: "10px",
          }}
          variant="h4"
        >
          ADD HOTEL
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TextField
              size="small"
              id="hotelName"
              name="hotelName"
              label=" Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              size="small"
              id="description"
              name="description"
              label=" Description"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              size="small"
              id="hotelType"
              name="hotelType"
              label=" Type"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              size="small"
              id="location"
              name="location"
              label="Location"
              variant="outlined"
            />
          </Grid>
          {/* <Grid item xs={2}>
            <TextField
              size="small"
              id=""
              name=""
              label=""
              variant="outlined"
            />
          </Grid> */}
          <Grid item xs={2}>
            <TextField
              // fullWidth
              size="small"
              id="address"
              name="address"
              label="Address"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              id="rating"
              name="rating"
              label="Rating"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            m: "10px",
          }}
        >
          <Button
            sx={{
              backgroundColor: "#2BC1CB",
              // color: "#2BC1CB",
            }}
            variant="contained"
            type="submit"
          >
            Add Hotel
          </Button>
        </Box>
      </Box>
      {/* </form> */}
    </div>
  );
};

export default AddHotel;
