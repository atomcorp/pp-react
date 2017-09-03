// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import LogOut from '../containers/log-out.jsx';

type Props = {
  isAuth: boolean
};

export default function Header(props: Props) {
  return (
    <header className="header">
      <div className="logo"><Link to="/app/"><h1>Four Four Too</h1></Link></div>
      {
        props.isAuth
          ? loggedIn()
          : loggedOut()
      }
    </header>
  );
}

function loggedIn() {
  return (
    <div className="header__links header__authorised">
      <ul className="header__list">
        <li><Link to="/app/profile">Profile</Link></li>
        <li><Link to="/app/leagues">Leagues</Link></li>
      </ul>
      <LogOut />
    </div>
  );
}

function loggedOut() {
  return (
    <div className="header__links header__unauthorised">
      <ul className="header__list">
        <li><Link to="/auth/sign-up">Sign up</Link></li>
        <li><Link to="/auth/sign-in">Sign in</Link></li>
      </ul>
    </div>
  );
}