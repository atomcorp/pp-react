// @flow

import React, {Component} from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';

import {auth} from '../firebase-connect.js';

type State = {
  email: string,
  password: string,
  errors: {
    tooShort: boolean
  },
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
      errors: {
        tooShort: false
      },
      redirect: false
    };
    const self: any = this;
    self.handleChange = this.handleChange.bind(this);
    self.handleSubmit = this.handleSubmit.bind(this);
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

  canSubmit() {
    if (!this.state.errors.tooShort) {
      auth.signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
        console.log(error, Object.keys(error).length);
      }).then((response) => {
        console.log(response);
        this.setState({redirect: true});
        
      });
    }
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const tooShort = this.state.password.length < 6 ? true : false;
    // https://stackoverflow.com/a/43639228/2368141
    const errors = Object.assign({}, this.state.errors);
    errors.tooShort = tooShort;
    this.setState({errors}, () => this.canSubmit());
  }

  render() {
    const errors = this.state.errors.tooShort ? 'Password too short' : 'No errors';
    const redirect = this.state.redirect;
    return (
      <div>
        {redirect ? <Router><Redirect to="/app"/></Router> : null}
        <h1>Sign in</h1>
        <form onSubmit={this.handleSubmit}>
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
        <div className="errors">{errors}</div>
      </div>
    );
  }
}
