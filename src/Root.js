import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import asyncRedux from "./middlewares/async";
import PropTypes from "prop-types";

import reducers from "./reducers";

const Root = ({ children, initialState = {} }) => {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(asyncRedux)
  );
  return <Provider store={store}>{children}</Provider>;
};

Root.propTypes = {
  children: PropTypes.node.isRequired,
  initialState: PropTypes.func
};

export default Root;
