import React, {Component} from 'react';
import { Redirect } from 'react-router'

import {auth} from '../firebase-connect.js';

export default class LogOut extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    auth.signOut().then(function() {
      console.log('Signed out');
    }, function(error) {
      console.log(error);
    });
  }

  render() {
    return (
      <button onClick={this.handleClick}>Log out</button>
    );
  }
}