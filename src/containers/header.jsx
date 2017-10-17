// @flow
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import LogOut from '../containers/log-out.jsx';

type Props = {
  isAuth: boolean
};

export default class Header extends Component<void, Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      menuOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.loggedInAdmin = this.loggedInAdmin.bind(this);
    this.primaryNavigation = this.primaryNavigation.bind(this);
  }

  loggedInAdmin(menuState) {
    return (
      <div className={`header__user header__user--logged-in rc--menu-${this.state.menuOpen ? 'open' : 'closed'}`}>
        <LogOut class="header__logout" />
      </div>
    );
  }

  primaryNavigation(menuState) {
    return (
      <ul className={`header__navigation rc--menu-${this.state.menuOpen ? 'open' : 'closed'}`}>
        <li><Link className="header__link" to="/app/">Predictions</Link></li>
        {/*<li><Link className="header__link" to="/app/profile">Profile</Link></li>*/}
        <li><Link className="header__link" to="/app/leagues">Leagues</Link></li>
      </ul>
    );
  }

  loggedOut(menuState) {
    return (
      <div className={`header__user header__user--logged-out rc--menu-${this.state.menuOpen ? 'open' : 'closed'}`}>
        <ul className="header__navigation header__navigation--logged-out">
          <li><Link className="header__link" to="/auth/sign-up">Sign up</Link></li>
          <li><Link className="header__link" to="/auth/sign-in">Sign in</Link></li>
        </ul>
      </div>
    );
  }

  menuIcon() {
    return (
      <div className="header__menu" onClick={() => this.handleClick()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </div>
    );
  }

  handleClick() {
    this.setState(prevState => ({
      menuOpen: !prevState.menuOpen
    }));
  }

  render() {
    return (
      <div className="header">
        <header className="header__container">
          <div className={`header__logo${!this.props.isAuth ? ' header__logo--logged-out' : ''}`}>
            <Link to="/app/"><h1>44Too</h1></Link>
          </div>
          {
            this.props.isAuth
              ? this.primaryNavigation()
              : null
          }
          {
            this.props.isAuth
              ? this.loggedInAdmin()
              : null
          }
          {
            !this.props.isAuth
              ? this.loggedOut(this.state.menuOpen)
              : null
          }
          {
            this.menuIcon()
          }
        </header>
      </div>
    )
  }
}