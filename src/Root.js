import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import asyncRedux from "./middlewares/async";
import stateValidator from "./middlewares/stateValidator";
import PropTypes from "prop-types";

import reducers from "./reducers";

const Root = ({
  children,
  initialState = {
    auth: { authenticated: localStorage.getItem("token") }
  }
}) => {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(asyncRedux, stateValidator, reduxThunk)
  );
  return <Provider store={store}>{children}</Provider>;
};

Root.propTypes = {
  children: PropTypes.node.isRequired,
  initialState: PropTypes.func
};

export default Root;
