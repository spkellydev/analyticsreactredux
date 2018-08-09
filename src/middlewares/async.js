export default ({ dispatch }) => next => action => {
  // Check to see if the action contains a promise on payload
  if (!action.payload || !action.payload.load) {
    return next(action); //bail out
  }

  // resolve the promise and dispatch a new action with data
  action.payload.then(response => {
    const resolvedAction = { ...action, payload: response };
    dispatch(resolvedAction);
  });
};
