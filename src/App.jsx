import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import './App.css';

import Game from './containers/game.jsx';
import SignUp from './containers/sign-up.jsx';
import LogOut from './containers/log-out.jsx';
import SignIn from './containers/sign-in.jsx';

import Profile from './components/profile.jsx';
import Leagues from './components/leagues.jsx';
import {makeCancelable} from './make-cancelable.js';
import {bootstrapApp} from './xhr-requests';
import {auth, storageKey} from './firebase-connect.js';

import UnauthorisedLayout from './layouts/unauthorised-layout.jsx';

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
          loggedIn: false
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

    if (!this.state.bootstrappedGame && this.state.loggedIn) {
      return(
        <div>
          Loading game...
        </div>
      );
    }

    if (!this.state.loggedIn) {
//       return (
//         <div>
//           <SignIn />
//           <SignUp />
//         </div>
//       );
    }
    const pages ={
      home: <Game player={this.state.player} gameData={this.state.game} route={this.changeRoute} />,
      profile: <Profile player={this.state.player} />,
      leagues: <Leagues uid={this.state.uid} />,
      signUp: <SignUp />,
      logIn: <LogOut />
    }

    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/auth" component={UnauthorisedLayout} />
            <Redirect to="/auth" />
          </Switch>
        </div>
      </BrowserRouter>
    );

//    return (
      // we will return 
      // - <FixtureList />
      // --- <Fixture />
      // ----- Home & Away Team 
//      <Router>
//        <div className="container">
//          {this.state.loggedIn ? <LogOut /> : null}
//          <ul>
//            <li><Link to="/">Home</Link></li>
//            <li><Link to="/profile">Profile</Link></li>
//            <li><Link to="/leagues">Leagues</Link></li>
//            {this.state.loggedIn ? null : <li><Link to="/sign-up">Sign up</Link></li>}
//            {this.state.loggedIn ? null : <li><Link to="/log-in">Log in</Link></li>}
//
//          </ul>
//          
//          <Route exact path="/" component={() => pages.home}/>
//          <Route exact path="/leagues" component={() => pages.leagues}/>
//          <Route exact path="/sign-up" component={() => pages.signUp}/>
//          <Route exact path="/profile" component={() => pages.profile}/>
//          <Route exact path="/log-in" component={() => pages.logIn}/>
//        </div>
//      </Router>
//    );
  }
}


export default App;
