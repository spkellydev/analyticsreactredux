import tv4 from "tv4";
import commentValidationSchema from "../lib/commentValidationSchema.json";
export default ({ dispatch, getState }) => next => action => {
  next(action);

  if (!tv4.validate(getState(), commentValidationSchema)) {
    console.warn("Invalid comment state schema detected");
  }
};
