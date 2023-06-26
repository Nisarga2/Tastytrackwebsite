import Wrapper from "../../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <Wrapper>
      <div
        style={{
          color: "white",
        }}
        className="container page"
      >
        {/* info */}
        <div className="info">
          <h1>
            Tasty <span>Tracker</span>
          </h1>
          <p
            style={{
              color: "white",
            }}
          >
            Tasty track is a platform that allows customers to order food from
            local restaurants through a website. These Application typically
            partner with restaurants to provide a wide variety of cuisine
            options for customers to choose from. <br /> The Tasty track allows
            customers to create a account, browse restaurant options in their
            area, select items from the menu, and pay for their order online.
            Once the order is placed, the restaurant is notified and begins
            preparing the food. The food is then delivered to the customer’s
            location or made available for pickup.
            <br /> Online food ordering web application have become increasingly
            popular in recent years due to their convenience and accessibility.
            Tasty track offer a simple and efficient way for customers to order
            food without the need to leave their home or office.
            <br /> This is also beneficial for restaurants, as they provide a
            way to increase sales and reach a wide audience.
            <br /> Overall, the Tasty track have revolutionized the way people
            order food and have become an essential tool for both customers and
            restaurants.
          </p>
          <Link to="/" className="btn btn-hero">
            Ready to Tasty Track
          </Link>
        </div>
        <img src={"about.svg"} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default AboutUs;
