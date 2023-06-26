import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";

const initialState = {
  name: "",
  email: "",
  password: "",
  role: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  // global state and useNavigate
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();
  const [postImage, setPostImage] = useState({
    myFile: "",
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
    console.log(postImage);
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

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSelect = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, role, isMember } = values;
    console.log(role);
    if (!email || !password || (!isMember && !name && !role)) {
      displayAlert();
      return;
    }
    let image = postImage.myFile;
    const currentUser = { name, email, password, role, image };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User Created! Redirecting...",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <Box
        sx={{
          backgroundImage: `${"url('bg.jpeg')"}`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100%",
        }}
      >
        <form className="form" onSubmit={onSubmit}>
          {/* <Logo /> */}
          <h3>{values.isMember ? "Login" : "Register"}</h3>
          {showAlert && <Alert />}
          {/* name input */}
          {!values.isMember && (
            <FormRow
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
            />
          )}
          {!values.isMember && (
            <div className="form-row">
              <label className="form-label">Role</label>
              <select
                className="form-input"
                name="role"
                value={values.role}
                onChange={handleSelect}
              >
                <option value=""></option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            // <FormRow
            //   type="text"
            //   name="role"
            //   value={values.role}
            //   handleChange={handleChange}
            // />
          )}
          {/* email input */}
          <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />
          {/* password input */}
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />
          {!values.isMember && (
            <TextField
              fullWidth
              size="small"
              id="image"
              name="image"
              // label="Image"
              variant="outlined"
              type="file"
              accept=".png , .jpg, .jpeg"
              onChange={(e) => handleFileUpload(e)}
            />
          )}
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            submit
          </button>
          <p>
            {values.isMember ? "Not a member ?" : "Already a member ?"}
            <button type="button" className="member-btn" onClick={toggleMember}>
              {values.isMember ? "Register" : "Login"}
            </button>
          </p>
        </form>
      </Box>
    </Wrapper>
  );
};
export default Register;
