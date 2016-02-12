import { LOCATION_CHANGE } from 'react-router-redux';
import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';

// Import specific reducers.
import { homePageReducer } from './pages/home/reducers';

// Export a single combined reducer.
export default combineReducers({
  router: routerReducer,
  home: homePageReducer,
});

//
// App-wide reducers.
//

function routerReducer( state = Immutable.Map(), action ) {

  if ( action.type === LOCATION_CHANGE ) {
    return state.merge({
      location: action.payload,
    });
  }

  return state;
}
