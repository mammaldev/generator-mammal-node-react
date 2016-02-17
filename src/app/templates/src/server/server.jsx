import path from 'path';
import helmet from 'helmet';
import express from 'express';
import Immutable from 'immutable';
<%_ if ( useKudu ) { _%>
import Kudu from 'kudu';
<%_ } _%>
<%_ if ( kuduAdapter === 'couchdb' ) { _%>
import CouchAdapter from 'kudu-adapter-couch';
<%_ } _%>
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { RouterContext, createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import reducer from '../universal/reducers';
import routes from '../universal/routes';
<%_ if ( useKudu ) { _%>
import models from './models';
<%_ } _%>

// Configure directories.
const STATIC_DIRS = [
  path.join(__dirname, '..', '..', 'dist'),
  path.join(__dirname, '..', '..', 'resources'),
];
<%_ if ( useKudu ) { _%>
const MODELS_DIR = path.join(__dirname, 'models');
<%_ } _%>

// Configure Express.
const app = express();
app.use(helmet());

for ( let dir of STATIC_DIRS ) {
  app.use(express.static(dir));
}

<%_ if ( useKudu ) { _%>
// Configure Kudu.
<%_ if ( kuduAdapter === 'couchdb' ) { _%>
const kuduConfig = {
  adapter: {
    type: CouchAdapter,
    config: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      path: process.env.DB_PATH,
    },
  },
  <%_ if ( apiBaseURL ) { _%>
  router: {
    baseURL: '<%= apiBaseURL %>',
  },
  <%_ } _%>
};
<%_ } _%>
const kudu = new Kudu(app<%_ if ( kuduAdapter === 'couchdb' ) { _%>, kuduConfig<%_ } _%>);
kudu.createGenericRoutes();

for ( let modelFactory of models ) {
  modelFactory(kudu);
}
<%_ } _%>

// Catch-all route handler to render the client app.
app.use(( req, res ) => {

  const initialState = Immutable.Map();
  const store = createStore(reducer, initialState);
  const history = syncHistoryWithStore(createMemoryHistory(), store, {
    selectLocationState: ( state ) => state.get('router'),
  });

  match({
    location: req.url,
    history,
    routes,
  }, ( err, redirectLocation, renderProps ) => {

    if ( err ) {
      return res.status(500).end();
    }

    if ( !renderProps ) {
      return res.status(404).end();
    }

    const Component = (
      <Provider store={store}>
        <RouterContext {...renderProps} />
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
  });
});

// Start the web server.
const server = app.listen(process.env.PORT, () => {

  const { port } = server.address();
  console.log(`Server running on port ${ port }`);
});
