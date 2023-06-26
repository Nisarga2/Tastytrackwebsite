import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const 
style = {
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
  color: "white",
}

const initialState = {
  address: "",
  landmark: "",
  pincode: "",
  contact: "",
};

const Cart = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const [total, setTotal] = useState(0);
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleQuantityChange = (event, item) => {
    const { value } = event.target;
    const updatedCart = cart.map((c) => {
      if (c.id === item.id) {
        return {
          ...c,
          quantity: parseInt(value),
        };
      }
      return c;
    });
    setCart(updatedCart);
  };

  const handleRemoveItem = (item) => {
    const updatedCart = cart.filter((c) => c.id !== item.id);
    setCart(updatedCart);
  };

  useEffect(() => {
    let amount = 0;
    let totalCount = 0;

    cart.forEach((item) => {
      const itemCost = parseInt(item.cost) * item.quantity;
      amount += itemCost;
      totalCount += item.quantity;
    });

    setTotal(amount);
  }, [cart]);

  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Item>
          <Typography variant="h5">Delivery Address</Typography>

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="address"
                value={values.address}
                onChange={handleChange}
                variant="filled"
                label="Delivery Address"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="filled"
                label="Contact No"
                name="contact"
                value={values.contact}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="filled"
                label="Landmark"
                name="landmark"
                value={values.landmark}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                variant="filled"
                label="PINCODE"
                name="pincode"
                value={values.pincode}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Item>
      </Grid>
      <Grid item xs={8}>

          <Item>
            <Typography variant="h5">Foods items "{cart.length}"</Typography>
            {cart ? (
              cart.map((c) => (
                <Card sx={{ display: "flex", my: "10px" }} key={c.id}>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={c.image}
                    alt="Live from space album cover"
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5">
                        {c.food}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        Rs {c.cost}.00
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              ))
            ) : (
              ""
            )}
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <Typography variant="h5">Cart Payment</Typography>
            {cart ? (
              cart.map((c) => (
                <Box display={"flex"} justifyContent={"space-between"} m={2} key={c.id}>
                  <Box
                    sx={{
                      width: "15%",
                    }}
                  >
                    <TextField
                      defaultValue={c.quantity}
                      id={c.id}
                      onChange={(e) => handleQuantityChange(e, c)}
                      type="number"
                      size="small"
                    ></TextField>
                  </Box>
                  <Typography variant="p"> {c.food} </Typography>
                  <Typography variant="p"> Rs {c.cost}.00 </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleRemoveItem(c)}
                  >
                    Remove
                  </Button>
                </Box>
              ))
            ) : (
              ""
            )}

            <hr />
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography variant="h5">Amount Payable</Typography>
              <Typography variant="p">Rs {total}.00</Typography>
            </Box>
            <ChildModal data={values} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;

function ChildModal(props) {
  const [open, setOpen] = useState(false);
  const [bookAlert, setBookAlert] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      setBookAlert(true);
    }, 10000);
  };
  const handleClose = () => {
    setBookAlert(false);
    setOpen(false);
  };

  return (
    <Box>
      <Button
        sx={{
          backgroundColor: "#66e137",
        }}
        fullWidth
        variant="contained"
        onClick={handleOpen}
        disabled={props.data.address === ""}
      >
        Place Order Now
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{  ...style, width: 500
        }}
        
        >
          <img width="400px" height="400px" src="tasty.png" alt="Tasty Food" />
          {bookAlert ? (
            <h2 id="child-modal-title">✅ Ordered Food successfully</h2>
          ) : (
            <h2>💳 Processing Payment</h2>
          )}
          <p id="child-modal-description">
            Your Order will be Delivered to
            <br /> {props.data.address} - {props.data.landmark}
            <br />
            {props.data.pincode}
          </p>
          <p id="child-modal-description">Thank you for your order 😊</p>
          <Button
            sx={{
              backgroundColor: "#66e137",
            }}
            fullWidth
            variant="contained"
            onClick={handleClose}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
