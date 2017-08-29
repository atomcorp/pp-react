import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import './App.css';

import Game from './containers/game.jsx';
import SignUp from './containers/sign-up.jsx';
import SignIn from './containers/sign-in.jsx';

import Profile from './components/profile.jsx';
import Leagues from './components/leagues.jsx';
import {makeCancelable} from './make-cancelable.js';
import {bootstrapApp} from './xhr-requests';
import {auth, storageKey, isAuthenticated} from './firebase-connect.js';

import UnauthorisedLayout from './layouts/unauthorised-layout.jsx';
import AuthorisedLayout from './layouts/authorised-layout.jsx';

// import SetFixtures from './xhr-requests/set-fixtures';
// SetFixtures();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: '/',
      game: {},
      player: {},
      loggedIn: false,
      uid: null,
      bootstrappedGame: false
    };

    this.handleGameBootstrap = this.handleGameBootstrap.bind(this);
  }

  componentDidMount() {
    // onAuthStateChanged listen for loggin in/out status
    // if user logs out will update app
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.handleGameBootstrap(user.uid);
        window.localStorage.setItem(storageKey, user.uid);
        this.setState({
          uid: user.uid,
          loggedIn: true
        });
      } else {
        window.localStorage.removeItem(storageKey);
        this.setState({
          uid: null,
          loggedIn: false,
          bootstrappedGame: false
        });
      }
    });
  }

  handleGameBootstrap(uid) {
    const cancelablePromise = makeCancelable(
      bootstrapApp(uid).then((request) => {
        this.setState({
          ...this.state, 
          game: request.game,
          bootstrappedGame: true,
          player: request.player
        });
      })
    );
    cancelablePromise
      .promise
      .then((a) => {
        console.log('a')
      })
      .catch((reason) => console.log('isCanceled', reason.isCanceled));
    cancelablePromise.cancel(); // Cancel the promise

  }

  render() {
console.log(isAuthenticated())
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/auth" component={UnauthorisedLayout} />
            {
              isAuthenticated()
                ? <Route path="/app">
                    <AuthorisedLayout canRender={this.state.bootstrappedGame} player={this.state.player} game={this.state.game} />
                  </Route>
                : null
            }
            <Redirect to="/auth" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
