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
      <section className="main">
        <div className="sign-in">
          <div className="form">
            {redirect ? <Router><Redirect to="/app"/></Router> : null}
            <div className="form__header">
              Sign in
            </div>
            {
              this.state.error 
                ? <div className="errors">{this.state.message}</div>
                : null
            }
            <form onSubmit={(event) => this.canSubmit(event)}>
              <label>
                <div className="form__label">Email:</div>
                <input name="email" type="email" value={this.state.email} onChange={this.handleChange} />
              </label>
              <label>
                <div className="form__label">Password:</div>
                <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
              </label>
              <input className="form__submit" type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </section>
    );
  }
}

