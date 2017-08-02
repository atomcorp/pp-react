import React, { Component } from 'react';
import './App.css';

import Predictions from './containers/predictions.jsx';

import getUser from './xhr-requests/get-user.js';
// import SetFixtures from './xhr-requests/set-fixtures';
// SetFixtures();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: '/',
      game: {
        season: "14-15",
        gameweek: "gameweek1",
      },
      loggedIn: false
    }
    this.changeRoute = this.changeRoute.bind(this);
    this.requestUser = this.requestUser.bind(this);
    this.setRequest = this.setRequest.bind(this);
  }

  componentDidMount() {
    this.requestUser();
  }

  requestUser() {
    getUser("tomisgreat", this.setRequest);
  }

  setRequest(returnedRequest) {
    console.log(returnedRequest);
    this.setState((prevState) => {
      prevState = returnedRequest;
      returnedRequest.user ? prevState.loggedIn = true : prevState.loggedIn = false;
      return prevState;
    });
    console.log(this.state);
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
          {this.state.loggedIn ? 
            <Predictions user={this.state.user} gameData={this.state.game} route={this.changeRoute} /> :
            <div>Please log in</div>}
          
          { this.state.route === '/' ? '/' : 'users/'}
        </div>
      </div>
    );
  }
}


export default App;
