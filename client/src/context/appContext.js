import React, { useReducer, useContext } from "react";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  GET_HOTEL_BEGIN,
  GET_HOTEL_SUCCESS,
  DELETE_HOTEL_BEGIN,
  DELETE_HOTEL_ERROR,
} from "./action";
import reducer from "./reducer";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alerttext: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  jobLocation: userLocation || "",
  showSidebar: false,
};

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios setup
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalstorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };
  const removeUserToLocalstorage = () => {
    localStorage.setItem("user");
    localStorage.setItem("token");
    localStorage.setItem("location");
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await axios.post(`api/v1/auth/${endPoint}`, currentUser);
      // console.log(response);
      const { user, token, location } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });
      // local storage later
      addUserToLocalstorage({ user, token, location });
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserToLocalstorage();
  };

  const getHotels = async () => {
    let url = `/hotel`;

    dispatch({ type: GET_HOTEL_BEGIN });
    try {
      const { data } = await authFetch(url);
      // console.log(data);
      // const { books } = data;
      dispatch({
        type: GET_HOTEL_SUCCESS,
        payload: {
          data,
        },
      });
    } catch (error) {
      console.log(error.response);
      // logoutUser();
    }
    clearAlert();
  };

  const deleteHotel = async (hotelId) => {
    dispatch({ type: DELETE_HOTEL_BEGIN });
    try {
      await authFetch.delete(`/hotel/${hotelId}`);
      getHotels();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_HOTEL_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        getHotels,
        deleteHotel,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
