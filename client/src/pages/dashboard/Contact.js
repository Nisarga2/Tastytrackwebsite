import { Box, Button, Grid, TextField, TextareaAutosize } from "@mui/material";
import Wrapper from "../../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";
import Iframe from "react-iframe";
import { useState } from "react";
import React, { useRef} from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
const Contact = () => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_gb66xcj', 'template_l1itqwk', form.current, 'JmlLZEzcjb9hl3ZVc')
      .then(
        (result) => {
          console.log(result.text);
          setIsSent(true); // Set success status to true
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <Wrapper>
      <div className="container page">
        {/* info */}
        <img src={"contact.svg"} alt="job hunt" className="img main-img" />
        <div
          style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "10px",
          }}
          className="info"
        >
          <h2>
            Tasty <span>Tracker</span>
          </h2>
          <form ref={form} onSubmit={sendEmail}>
          <label htmlFor="name">Name</label>
          <input type="text" name="user_name" id="name" />
          <label htmlFor="email">Email</label>
          <input type="email" name="user_email" id="email" />
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" />
          <input type="submit" value="Send" />
          {isSent && <p>Message sent successfully!</p>}
          {/* Display success message if isSent is true */}
        </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
