import React from 'react';

export default class App extends React.Component {

  constructor() {
    super();
  }

  render() {

    return (
      <div id="view">
        {this.props.children}
      </div>
    );
  }
}
