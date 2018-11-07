import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS,SET_CURRENT_USER } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      history.push("/login");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login User
export const LoginUser = (userData,history) => dispatch => {
    axios
      .post("/api/users/login", userData)
      .then(res => {
          // Save to localstorage
          const {token} = res.data;
          localStorage.setItem('jwtToken',token);
          // Set token to Auth header
          setAuthToken(token);
          // Decode toekn to get user data
          const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        history.push("/");
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  // Set Logedin user
  export const setCurrentUser = (decoded)=>{
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
  }

  // Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  };