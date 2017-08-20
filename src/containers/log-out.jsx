import React, {Component} from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';

import {auth} from '../firebase-connect.js';

export default class LogOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    auth.signOut().then(() => {
      console.log('Signed out');
      this.setState({redirect: true});
    }, function(error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        {this.state.redirect ? <Router><Redirect to="/"/></Router> : null}
        <button onClick={this.handleClick}>Log out</button>
      </div>
    );
  }
}