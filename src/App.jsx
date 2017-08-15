import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'; 
import './App.css';

import Game from './containers/game.jsx';
import SignUp from './containers/sign-up.jsx';
import LogOut from './containers/log-out.jsx';
import SignIn from './containers/sign-in.jsx';

import Profile from './components/profile.jsx';

import {bootstrapGame} from './xhr-requests';
import {auth, storageKey} from './firebase-connect.js';

// import SetFixtures from './xhr-requests/set-fixtures';
// SetFixtures();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: '/',
      game: {
        season: "",
        gameweek: "",
      },
      loggedIn: false,
      bootstrappedGame: false
    };

    this.handleGameBootstrap = this.handleGameBootstrap.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.handleGameBootstrap();
        window.localStorage.setItem(storageKey, user.uid);
        this.setState({
          uid: user.uid,
          loggedIn: true
        });
      } else {
        window.localStorage.removeItem(storageKey);
        this.setState();
      }
    });
  }

  handleGameBootstrap() {

    bootstrapGame.then((result) => {
      this.setState({
        ...this.state, game: {
          season: result.year,
          gameweek: result.currentMatchday,
        },
        bootstrappedGame: true
      });
    }).then(() => {
      console.log(this.state);
    })
  }

  render() {

    if (!this.state.bootstrappedGame) {
      return(
        <div>
          Loading...
        </div>
      );
    }

    if (!this.state.loggedIn) {
      return (
        <div>
          <SignIn />
          <SignUp />
        </div>
      );
    }
    const pages ={
      home: <Game user={this.state.uid} gameData={this.state.game} route={this.changeRoute} />,
      profile: <Profile user={this.state.uid} />,
      signUp: <SignUp />,
      logIn: <LogOut />
    }

    return (
      // we will return 
      // - <FixtureList />
      // --- <Fixture />
      // ----- Home & Away Team 
      <Router>
        <div className="container">
          {this.state.loggedIn ? <LogOut /> : null}
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            {this.state.loggedIn ? null : <li><Link to="/sign-up">Sign up</Link></li>}
            {this.state.loggedIn ? null : <li><Link to="/log-in">Log in</Link></li>}

          </ul>
          
          <Route exact path="/" component={() => pages.home}/>
          <Route exact path="/sign-up" component={() => pages.signUp}/>
          <Route exact path="/profile" component={() => pages.profile}/>
          <Route exact path="/log-in" component={() => pages.logIn}/>
        </div>
      </Router>
      
    );
  }
}


export default App;
