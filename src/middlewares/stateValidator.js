import tv4 from "tv4"; // tiny validation library for json
import commentValidationSchema from "../lib/commentValidationSchema.json";

/**
 * @name State Validation Middleware
 * @description quickly validate state to make sure there are the proper types throughout state
 * @augments state
 */
export default ({ dispatch, getState }) => next => action => {
  next(action);

  if (!tv4.validate(getState(), commentValidationSchema)) {
    console.warn("Invalid comment state schema detected");
  }
};
