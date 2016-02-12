import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { fromJS as makeImmutable } from 'immutable';
import reducer from '../universal/reducers';
import routes from '../universal/routes';

const state = makeImmutable(window.__INITIAL_STATE__);
const store = createStore(reducer, state, applyMiddleware(thunk));
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: ( state ) => state.get('router'),
});

render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);
