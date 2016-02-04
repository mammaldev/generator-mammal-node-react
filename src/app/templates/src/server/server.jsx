import path from 'path';
import helmet from 'helmet';
import express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { renderToString } from 'react-dom/server';
import createHistory from 'history/lib/createMemoryHistory';
import { reduxReactRouter, match } from 'redux-router/server';
import reducer from '../universal/reducers';
import routes from '../universal/routes';

// Configure directories.
const STATIC_DIRS = [
  path.join(__dirname, '..', '..', 'dist'),
  path.join(__dirname, '..', '..', 'resources'),
];

// Configure Express.
const app = express();
app.use(helmet());

for ( let dir of STATIC_DIRS ) {
  app.use(express.static(dir));
}

// Catch-all route handler to render the client app.
app.use(( req, res ) => {

  const initialState = {};
  const store = reduxReactRouter({
    createHistory,
    routes,
  })(createStore)(reducer, initialState);

  store.dispatch(match(req.url, ( err, redirectLocation, routerState ) => {

    if ( err ) {
      return res.status(500).end();
    }

    if ( !routerState ) {
      return res.status(404).end();
    }

    const Component = (
      <Provider store={store}>
        <ReduxRouter />
      </Provider>
    );
    const componentMarkup = renderToString(Component);
    const state = store.getState();
    const markup = `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title></title>
          <link rel="stylesheet" href="/css/app.css">
        </head>
        <body>
          <div id="app">${ componentMarkup }</div>
          <script>
            window.__INITIAL_STATE__ = ${ JSON.stringify(state) };
          </script>
          <script src="/js/app.js"></script>
        </body>
      </html>
    `;

    res.status(200).send(markup);
  }));
});

// Start the web server.
const server = app.listen(process.env.PORT, () => {

  const { port } = server.address();
  console.log(`Server running on port ${ port }`);
});
