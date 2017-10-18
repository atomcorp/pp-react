// @flow

import React, {Component} from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import {makeCancelable} from '../make-cancelable.js';
import {errorCodes, checkInputsAreValidStrings} from '../helpers.js';
import {auth, db} from '../firebase-connect.js';

type State = {
  email: string,
  password: string,
  username: string,
  teamName: string,
  redirect: boolean,
  message: string,
  error: boolean
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
      redirect: false,
      error: false,
      message: ''
    };
    const self: any = this;
    self.handleChange = this.handleChange.bind(this);
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
    const code = checkInputsAreValidStrings(this.state.teamName, this.state.username);
    if (code) {
      self.setState({
        error: true,
        message: errorCodes(code)
      });
      return;
    }
      
    const cancelablePromise = makeCancelable(
      auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        console.log(error);
        self.setState({
          error: true,
          message: errorCodes(error.code)
        });
        return null;
      })
      .then((response) => {
        console.log(response)
        if(response) {
          db.ref(`users/${response.uid}`).set({
            id: response.uid,
            name: this.state.username,
            team: this.state.teamName,
          })       
          this.setState({redirect: true});
        }
      })
    );
    cancelablePromise.promise.then(() => {
      console.log('resolved')
    }).catch((reason) => console.log('isCanceled', reason.isCanceled));
    cancelablePromise.cancel(); // Cancel the promise
  }

  render() {
    const redirect = this.state.redirect;
    return (
      <section className="main">
        <div className="sign-in">
          <div className="form">
            {redirect ? <Router><Redirect to="/"/></Router> : null}
            <div className="form__header">Sign up</div>
            {
              this.state.error 
                ? <div className="errors">{this.state.message}</div>
                : null
            }
            <form onSubmit={(event) => this.canSubmit(event)}>
              <label>
                <div className="form__label">Username:</div>
                <input name="username" type="username" value={this.state.username} onChange={this.handleChange} />
              </label>
              <label>
                <div className="form__label">Team name:</div>
                <input name="teamName" type="teamName" value={this.state.teamName} onChange={this.handleChange} />
              </label>
              <label>
                <div className="form__label">Email:</div>
                <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
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
