// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import LogOut from '../containers/log-out.jsx';

type Props = {
  isAuth: boolean
};

export default function Header(props: Props) {
  return (
    <div className="header">
      <header className="header__container">
        <div className="header__logo">
          <Link to="/app/"><h1>44Too</h1></Link>
        </div>
        {
          props.isAuth
            ? primaryNavigation()
            : null
        }
        {
          props.isAuth
            ? loggedInAdmin()
            : null
        }
        {
          !props.isAuth
            ? loggedOut()
            : null
        }
      </header>
    </div>
  );
}

function primaryNavigation() {
  return (
    <ul className="header__navigation">
      <li><Link className="header__link" to="/app/">Predictions</Link></li>
      <li><Link className="header__link" to="/app/profile">Profile</Link></li>
      <li><Link className="header__link" to="/app/leagues">Leagues</Link></li>
    </ul>
  );
}

function loggedInAdmin() {
  return (
    <div className="header__user header__user--logged-in">
      <LogOut class="header__logout" />
    </div>
  );
}

function loggedOut() {
  return (
    <div className="header__user header__user--logged-out">
      <ul className="header__list">
        <li><Link to="/auth/sign-up">Sign up</Link></li>
        <li><Link to="/auth/sign-in">Sign in</Link></li>
      </ul>
    </div>
  );
}