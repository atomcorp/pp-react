import React, {Component} from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';

import {auth} from '../firebase-connect.js';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {
        tooShort: false
      },
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
  }

  handleChange(event) {
    // out of the docs = https://facebook.github.io/react/docs/forms.html
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  canSubmit() {
    if (!this.state.errors.tooShort) {
      const error = {};
      auth.createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
        console.log(error, Object.keys(error).length);
        error = error;
      }).then((response) => {
        console.log(response);
        if(response) {
          // send off the uid to the database
          this.setState({redirect: true})
        }
        
      });
    }
  }

  handleSubmit(event) {
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
        {redirect ? <Router><Redirect to="/"/></Router> : null}
        <h1>Sign up</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            User name:
            <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label>
            User name:
            <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className="errors">{errors}</div>
      </div>
    );
  }
}
