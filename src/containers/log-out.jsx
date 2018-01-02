// @flow

import React, {Component} from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';

import {auth} from '../firebase-connect.js';

type State = {
  redirect: boolean
};

type Props = {
  class: string
};

export default class LogOut extends Component<void, Props, State> {
  state: State;
  
  constructor(props: Props) {
    super(props);
    this.state = {
      redirect: false
    }
    const self: any = this;
    self.handleClick = this.handleClick.bind(this);
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
      <div className={`${this.props.class ? this.props.class : 'logout'}`}>
        {this.state.redirect ? <Router><Redirect to="/auth"/></Router> : null}
        <button onClick={this.handleClick}>Log out</button>
      </div>
    );
  }
}