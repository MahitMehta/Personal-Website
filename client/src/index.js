import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import View from "./components/view";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" render={() => (
          <View section="home" />
        )}/>
        <Route exact path="/timeline" render={() => (
          <View section="timeline" />
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