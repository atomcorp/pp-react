import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import {makeCancelable} from './make-cancelable.js';
import {bootstrapApp} from './xhr-requests';
import {auth, storageKey} from './firebase-connect.js';

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
      bootstrappedGame: false,
      loaded: false
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
          loggedIn: true,
          loaded: true
        });
      } else {
        window.localStorage.removeItem(storageKey);
        this.setState({
          uid: null,
          loggedIn: false,
          bootstrappedGame: false,
          loaded: true
        });
      }
    });
  }

  handleGameBootstrap(uid) {
    const cancelablePromise = makeCancelable(
      bootstrapApp(uid).then((request) => {
        console.log(request);
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
    if (!this.state.loaded) {
      return <div>Loading...</div>;
    }
    if (this.state.loggedIn && !this.state.bootstrappedGame) {
      return <div>Loading your game...</div>; 
    }
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/auth" component={UnauthorisedLayout} />
            {
              this.state.loggedIn
                ? <Route path="/app">
                  <AuthorisedLayout canRender={this.state.bootstrappedGame} player={this.state.player} game={this.state.game} />
                </Route>
                : null
            }
            
            {
              this.state.loggedIn
                ? <Redirect to="/app" />
                : <Redirect to="/auth" />
            }
            
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
