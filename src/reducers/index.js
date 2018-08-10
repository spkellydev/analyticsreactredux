import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import commentsReducer from "./comments";
import authReducer from "./auth";

export default combineReducers({
  comments: commentsReducer,
  auth: authReducer,
  form: formReducer
});
