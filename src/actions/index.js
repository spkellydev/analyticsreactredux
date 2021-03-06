import axios from "axios";
import {
  SAVE_COMMENT,
  FETCH_COMMENTS,
  AUTH_USER,
  AUTH_ERROR,
  GET_GA_DATA,
  GET_GA_USER,
  ERROR
} from "./types";

// save comment action to post
export function saveComment(comment) {
  return {
    type: SAVE_COMMENT,
    payload: comment
  };
}

// fetches all available comments
export function fetchComments() {
  // placeholder
  const response = axios.get("http://jsonplaceholder.typicode.com/comments");

  return {
    type: FETCH_COMMENTS,
    payload: response
  };
}

/**
 * successful login has been detected, and boolean loginState is changed
 * @param {boolean} loginState
 */
// export function changeAuth(loginState) {
//   return {
//     type: CHANGE_AUTH,
//     payload: loginState
//   };
// }

export const signUp = ({ email, password }, callback) => async dispatch => {
  try {
    const response = await axios.post("http://localhost:5000/signup", {
      email,
      password
    });
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: "Email is already in use" });
  }
};

export const signOut = () => {
  localStorage.removeItem("token");
  return {
    type: AUTH_USER,
    payload: ""
  };
};

export const signIn = ({ email, password }, callback) => async dispatch => {
  try {
    const response = await axios.post("http://localhost:5000/signin", {
      email,
      password
    });
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid login creditientials" });
  }
};

export const getAnalyticsProfile = token => async dispatch => {
  try {
    const data = await axios.post("http://localhost:5000/ga/user", {
      token
    });

    console.log(data.data);

    dispatch({ type: GET_GA_USER, payload: data.data });
  } catch (err) {
    console.log(err);
  }
};

export const getAnalyticsData = options => async dispatch => {
  try {
    const ga = await axios.post("http://localhost:5000/ga", {
      options
    });

    dispatch({ type: GET_GA_DATA, payload: ga.data });
  } catch (err) {
    dispatch({ type: ERROR, payload: "Error receiving analytics data" });
  }
};
