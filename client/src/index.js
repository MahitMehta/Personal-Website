import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import View from "./components/view";
import Photography from "./components/photography";

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

const name = "mahitm-proxy-token";
const pass = "d2621628-3d1c-40ca-98ad-c3897476d7ea";
const token = `${name}:${pass}`;
const encrytedToken = btoa(token);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" render={() => (
          <View section="home" token={encrytedToken}/>
        )}/>
        <Route exact path="/timeline" render={() => (
          <View section="timeline" token={encrytedToken}/>
        )}/>
        <Route exact path="/divisions"  render={() => (
          <Redirect to="/photography"/>
        )}/>
        <Route exact path="/photography" render={() => (
          <Photography token={encrytedToken} />
        )}/>
        <Redirect to="/"/>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();