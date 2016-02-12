import React from 'react';
import { Route } from 'react-router';

// Import route components.
import App from './components/app';
import Home from './pages/home/templates';

export default (
  <Route component={App}>
    <Route path="/" component={Home} />
  </Route>
);
