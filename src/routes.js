import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './components/Home';
import Practice from './containers/Practice';
import ReactStormpath, { Router, HomeRoute, LoginRoute, AuthenticatedRoute } from 'react-stormpath';
import LoginPage from './components/Login';
import VerifyEmailPage from './components/VerifyEmailPage';
import RegisterPage from './components/RegisterPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import ProfilePage from './containers/ProfilePage';
import Team from './components/Team';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <LoginRoute path='/login' component={LoginPage} />
    <Route path='/verify' component={VerifyEmailPage} />
    <Route path='/register' component={RegisterPage} />
    <Route path='/forgot' component={ResetPasswordPage} />
    <AuthenticatedRoute>
      <Route path="/profile" component={ProfilePage} />
    </AuthenticatedRoute>
    <AuthenticatedRoute>
      <Route path="/practice" component={Practice} />
    </AuthenticatedRoute>
    <Route path="/team" component={Team} />
  </Route>
);
