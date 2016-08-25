import React from 'react';
import { Link } from 'react-router';

import { LoginLink, LogoutLink, NotAuthenticated, Authenticated } from 'react-stormpath';

export default class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div id="navbar-collapse" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><Link to="/" className="navbar-brand">SpeakMirror</Link></li>
              <Authenticated>
                <li>
                  <Link to="/practice">Practice</Link>
                </li>
              </Authenticated>
              <Authenticated>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              </Authenticated>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <NotAuthenticated>
                <li>
                  <LoginLink />
                </li>
              </NotAuthenticated>
              <Authenticated>
                <li>
                  <LogoutLink />
                </li>
              </Authenticated>
              <NotAuthenticated>
                <li>
                  <Link to="/register">Create Account</Link>
                </li>
              </NotAuthenticated>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
