import { GET_GA_DATA, GET_GA_USER } from "../actions/types";

const INITIAL_STATE = {
  analytics: {},
  user: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_GA_DATA:
      return { ...state, analytics: action.payload };
    case GET_GA_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
