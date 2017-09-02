// @flow

import React, {Component} from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import {makeCancelable} from '../make-cancelable.js';
import {auth, db} from '../firebase-connect.js';

type State = {
  email: string,
  password: string,
  username: string,
  teamName: string,
  errors: {
    tooShort: boolean
  },
  redirect: boolean
};

type Props = {};

export default class SignUp extends Component<void, Props, State> {
  state: State

  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      teamName: '',
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
      const cancelablePromise = makeCancelable(
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
          console.log(error);
        }).then((response) => {
          if(response) {
            db.ref(`users/${response.uid}`).set({
              id: response.uid,
              name: this.state.username,
              team: this.state.teamName,
            })       
          }
        })
      );
      cancelablePromise.promise.then(() => {
        this.setState({redirect: true});
        console.log('resolved')
      }).catch((reason) => console.log('isCanceled', reason.isCanceled));
      cancelablePromise.cancel(); // Cancel the promise
    }
  }

  handleSubmit(event: Event) {
    if (event.currentTarget instanceof HTMLInputElement) {
      event.preventDefault();
      const tooShort = this.state.password.length < 6 ? true : false;
      // https://stackoverflow.com/a/43639228/2368141
      const errors = Object.assign({}, this.state.errors);
      errors.tooShort = tooShort;
      this.setState({errors}, () => this.canSubmit());
    }
  }

  render() {
    const errors = this.state.errors.tooShort ? 'Password too short' : 'No errors';
    const redirect = this.state.redirect;
    return (
      <div>
        {redirect ? <Router><Redirect to="/"/></Router> : null}
        <h1>Sign up</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label>
            Password:
            <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          </label>
          <label>
            Username:
            <input name="username" type="username" value={this.state.username} onChange={this.handleChange} />
          </label>
          <label>
            Team name:
            <input name="teamName" type="teamName" value={this.state.teamName} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className="errors">{errors}</div>
      </div>
    );
  }
}
