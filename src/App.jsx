import React, { Component } from 'react';
import page from 'page';
import './App.css';

import Predictions from './containers/predictions.jsx';

import UserPage from './components/user-page.jsx';

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
    this.getPage = this.getPage.bind(this);
    this.getRoute = this.getRoute.bind(this);
  }

  componentDidMount() {
    this.requestUser();
  }

  getPage(ctx) {
    console.log(ctx);
  }

  requestUser() {
    getUser("tomisgreat", this.setRequest);
  }

  getRoute(event, route) {
    event.preventDefault();
    this.setState({route: route})
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

    const pages ={
      home: <Predictions user={this.state.user} gameData={this.state.game} route={this.changeRoute} />,
      user: <UserPage user={this.state.user} />
    }


    return (
      // we will return 
      // - <FixtureList />
      // --- <Fixture />
      // ----- Home & Away Team 
      <div className="container">
        <a href="/" onClick={(event) => this.getRoute(event, "/")}>Home</a>&nbsp;
        <a href="/user" onClick={(event) => this.getRoute(event, "user")}>List</a>
        {this.state.loggedIn && this.state.route === '/' ? pages.home : null}
        {this.state.loggedIn && this.state.route === 'user' ? pages.user : <div>User loggin in...</div>}
      </div>
    );
  }
}


export default App;
