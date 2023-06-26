import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

// *custume Error Api
import { BadRequestError, unAuthenticatedError } from "../errors/index.js";
// * custume Error Api

const register = async (req, res) => {
  const { name, email, password, role, image } = req.body;

  if (!name || !email || !password || !role) {
    throw new BadRequestError("please provide all values");
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }

  const user = await User.create({ name, email, password, role, image });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastname,
      location: user.location,
      name: user.name,
      image: user.image,
      role: user.role,
    },
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide all values");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new unAuthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new unAuthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const updateUser = async (req, res) => {
  res.send("Update User");
};

export { register, login, updateUser };
