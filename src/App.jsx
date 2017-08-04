import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'; 
import './App.css';

import Predictions from './containers/predictions.jsx';

import Profile from './components/profile.jsx';
import LogIn from './components/log-in.jsx';

import {auth, storageKey} from './firebase-connect.js';

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
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid);
        this.setState({
          uid: user.uid,
          loggedIn: true
        });
      } else {
        window.localStorage.removeItem(storageKey);
        this.setState({
          uid: null,
          loggedIn: false
        });
      }
    });
  }

  render() {

    if (!this.state.loggedIn) {
      return <div>Loading...</div>
    }
    const pages ={
      home: <Predictions user={this.state.uid} gameData={this.state.game} route={this.changeRoute} />,
      profile: <Profile user={this.state.uid} />,
      logIn: <LogIn />
    }

    return (
      // we will return 
      // - <FixtureList />
      // --- <Fixture />
      // ----- Home & Away Team 
      <Router>
        <div className="container">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/login">Log in</Link></li>
          </ul>
          
          <Route exact path="/" component={() => pages.home}/>
          <Route exact path="/login" component={() => pages.logIn}/>
          <Route exact path="/profile" component={() => pages.profile}/>
        </div>
      </Router>
      
    );
  }
}


export default App;
