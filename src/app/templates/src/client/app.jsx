import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { reduxReactRouter, ReduxRouter } from 'redux-router';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import createHistory from 'history/lib/createBrowserHistory';
import reducer from '../universal/reducers';
import routes from '../universal/routes';

const state = window.__INITIAL_STATE__;

Object.keys(state).forEach(( key ) => {
  state[ key ] = Immutable.fromJS(state[ key ]);
});

const store = compose(
  applyMiddleware(thunk),
  reduxReactRouter({
    routes,
    createHistory,
  })
)(createStore)(reducer, state);

render(
  <Provider store={store}>
    <ReduxRouter children={routes} />
  </Provider>,
  document.getElementById('app')
);
