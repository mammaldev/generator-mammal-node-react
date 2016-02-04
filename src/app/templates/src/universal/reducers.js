import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

// Import specific reducers.

// Export a single combined reducer.
export default combineReducers({
  router: routerStateReducer,
});
