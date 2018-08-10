/**
 * @name Async Resolution Middleware
 * @description Middleware looks for an action.payload which contains a .then() function (promise). The middleware resolves the promise and dispatches a new action.
 * @augments state
 *
 */
export default ({ dispatch }) => next => action => {
  // Check to see if the action contains a promise on payload
  if (!action.payload || !action.payload.then) {
    return next(action); //bail out
  }

  // resolve the promise and dispatch a new action with data
  action.payload.then(response => {
    const resolvedAction = { ...action, payload: response };
    dispatch(resolvedAction);
  });
};
