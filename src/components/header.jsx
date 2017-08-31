import React from 'react';
import { Link } from 'react-router-dom';
import LogOut from '../containers/log-out.jsx';

export default function Header(props) {
  return (
    <header className="header">
      <div className="logo"><h1>Four Four Too</h1></div>
      <div className="header__authorisation">
        {
          props.isAuth
            ? loggedIn()
            : loggedOut()
        }
      </div>
    </header>
  );
}

function loggedIn() {
  return (
    <div className="header__authorised">
      <ul className="list-inline">
        <li><Link to="/app/">Home</Link></li>
        <li><Link to="/app/profile">Profile</Link></li>
        <li><Link to="/app/leagues">Leagues</Link></li>
      </ul>
      <LogOut />
    </div>
  );
}

function loggedOut() {
  return (
    <div className="header__unauthorised">
      <ul>
        <li><Link to="/auth/sign-up">Sign up</Link></li>
        <li><Link to="/auth/sign-in">Sign in</Link></li>
      </ul>
    </div>
  );
}