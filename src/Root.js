import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import PropTypes from 'prop-types';

import reducers from './reducers';

const Root = ({ children, initialState = {} }) => {
  const store = createStore(reducers, initialState, applyMiddleware(reduxPromise));
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

Root.propTypes = {
  children: PropTypes.node.isRequired,
  initialState: PropTypes.objectOf.isRequired,
};

export default Root;
