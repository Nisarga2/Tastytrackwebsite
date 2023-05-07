import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";
import { HotelService } from "../../service/HotelService";
import { useState } from "react";

const AddHotel = () => {
  const [postImage, setPostImage] = useState({
    myFile: "",
  });
  const [postMultiImage, setMultiPostImage] = useState([]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
    console.log(postImage);
  };

  const handleMultipleFileUpload = async (e) => {
    const file = e.target.files;
    for (let i = 0; i < file.length; i++) {
      const base64 = await convertToBase64(file[i]);
      postMultiImage.push({ i: base64 });
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

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
      image: postImage.myFile,
      foods: data.get("foods").split(","),
      foodImage: postMultiImage,
    };
    console.log(bookObj);
    try {
      let response = await HotelService.CreateHotel(bookObj);
      console.log(response);
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
          <Grid item xs={2}>
            <TextField
              size="small"
              id="rating"
              name="rating"
              label="Rating"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              size="small"
              id="image"
              name="image"
              // label="Image"
              variant="outlined"
              type="file"
              accept=".png , .jpg, .jpeg"
              onChange={(e) => handleFileUpload(e)}
            />
          </Grid>
          <Grid item xs={9}>
            <TextField
              fullWidth
              size="small"
              id="foods"
              name="foods"
              label="foods"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              size="small"
              id="foodImage"
              name="foodImage"
              // label="FoodImage"
              variant="outlined"
              type="file"
              accept=".png , .jpg, .jpeg"
              inputProps={{
                multiple: true,
              }}
              onChange={(e) => handleMultipleFileUpload(e)}
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
