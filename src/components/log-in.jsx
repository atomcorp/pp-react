import React, {Component} from 'react';

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {
        tooShort: false
      }
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
      console.log('Submit!');
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
    console.log(this.state);
    return (
      <div>
        <h1>Log in</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            User name:
            <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
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
