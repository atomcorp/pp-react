import React, { Component } from 'react';
import './App.css';

import Predictions from './containers/predictions.jsx';
// import SetFixtures from './xhr-requests/set-fixtures';
// SetFixtures();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: '/'
    }
    this.changeRoute = this.changeRoute.bind(this);
  }

  changeRoute(route) {
    this.setState({route: route});
  }

  render() {
    return (
      // we will return 
      // - <FixtureList />
      // --- <Fixture />
      // ----- Home & Away Team 
      <div className="container">
        <div className="fixture-list">
          <Predictions route={this.changeRoute} />
          { this.state.route === '/' ? '/' : 'users/'}
        </div>
      </div>
    );
  }
}


export default App;
