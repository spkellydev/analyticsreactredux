import { GET_GA_DATA } from "../actions/types";

const INITIAL_STATE = {
  analytics: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_GA_DATA:
      return { ...state, analytics: action.payload };
    default:
      return state;
  }
}
