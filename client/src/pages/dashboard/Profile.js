
import { Avatar, Box } from "@mui/material";
import { useAppContext } from "../../context/appContext";
import "./profile.css"; // Import the CSS file

const Profile = () => {
  const { user } = useAppContext();
  const profileContainerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  };

  const avatarStyle = {
    width: 200,
    height: 200,
    boxShadow: "blue",
  };

  return (
    <Box className="profile-container">
      <marquee><h1>Profile page</h1></marquee>
      <div class="avtar">
      <Avatar alt="Remy Sharp" src={user.image} style={avatarStyle} />
      </div>
      <form className="profile-form">
        <label>
          Name:
          <input type="text" value={user.name} />
        </label>
        <label>
          Role:
          <input type="text" value={user.role} />
        </label>
        <label>
          Email:
          <input type="email" value={user.email} />
        </label>
        <input type="submit" value="Save" />
      </form>
    </Box>
  );
};

export default Profile;
