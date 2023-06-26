import React from "react";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <Wrapper
      style={{
        background: `url('bg.jpeg') no-repeat center/cover`,
      }}
    >
      <nav>{/* <Logo /> */}</nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1
            style={{
              color: "white",
              // Add additional CSS styles here
              fontSize: "36px",
              fontWeight: "bold",
            }}
          >
            Tasty <span>Track</span>
          </h1>
          <p
            style={{
              color: "white",
              // Add additional CSS styles here
              fontSize: "18px",
            }}
          >
            The social food delivery network
          </p>
          <Link
            to="/register"
            className="btn btn-hero"
            style={{
              // Add additional CSS styles here
              backgroundColor: "blue",
              color: "white",
              padding: "10px 20px",
              textDecoration: "none",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          >
            Login/Register
          </Link>
        </div>
        {/* <img src={main} alt="job hunt" className="img main-img" /> */}
        {/* <img src="landing.svg" alt="job hunt" className="img main-img" /> */}
      </div>
    </Wrapper>
  );
}

export default Landing;
