import axios from "axios";
import { SAVE_COMMENT, FETCH_COMMENTS, CHANGE_AUTH, AUTH_USER } from "./types";

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
export function changeAuth(loginState) {
  return {
    type: CHANGE_AUTH,
    payload: loginState
  };
}

export const signUp = ({ email, password }) => dispatch => {
  axios.post("http://localhost:5000/signup", {
    email,
    password
  });
};
