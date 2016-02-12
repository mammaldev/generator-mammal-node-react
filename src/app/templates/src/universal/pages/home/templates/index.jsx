import React from 'react';
import { connect } from 'react-redux';
import { homePageSelector } from '../selectors';

class HomePage extends React.Component {

  constructor() {
    super();
  }

  render() {

    return (
      <h1>Welcome</h1>
    );
  }
}

export default connect(homePageSelector)(HomePage);
