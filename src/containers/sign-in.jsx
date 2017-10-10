// @flow

import React, {Component} from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import {errorCodes} from '../helpers.js';
import {auth} from '../firebase-connect.js';

type State = {
  email: string,
  password: string,
  error: boolean,
  message: string,
  redirect: boolean
};

type Props = {};

export default class SignIn extends Component<void, Props, State> {
  state: State

  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: false,
      message: '',
      redirect: false
    };
    const self: any = this;
    self.handleChange = this.handleChange.bind(this);
    // self.handleSubmit = this.handleSubmit.bind(this);
    self.canSubmit = this.canSubmit.bind(this);
  }

  handleChange(event: Event) {
    if (event.currentTarget instanceof HTMLInputElement) {
      // out of the docs = https://facebook.github.io/react/docs/forms.html
      const target = event.currentTarget;
      const name = target.name;
      this.setState({
        [name]: target.value
      });
    }

  }

  canSubmit(event: Event) {
    event.preventDefault();
    const self = this;
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        console.log(error, Object.keys(error).length);
        self.setState({
          error: true,
          message: errorCodes(error.code)
        });
      })
      .then((response) => {
        console.log(response);
        self.setState({redirect: true});     
      });
  }

  render() {
    const redirect = this.state.redirect;
    return (
      <div className="sign-in">
        {redirect ? <Router><Redirect to="/app"/></Router> : null}
        <h1>Sign in</h1>
        <form onSubmit={(event) => this.canSubmit(event)}>
          <label>
            Email:
            <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label>
            Password:
            <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {
          this.state.error 
            ? <div className="errors">{this.state.message}</div>
            : null
        }
        
      </div>
    );
  }
}

