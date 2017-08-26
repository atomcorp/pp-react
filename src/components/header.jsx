import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
  console.log(props);
  return (
    <header className="header">
      <div className="logo">Champions's Choices</div>
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
      <div className="header__name">
        Name
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/leagues">Leagues</Link></li>
      </ul>
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