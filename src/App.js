import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './components/login/index.js'
import Home from './components/home/index.js'
import { connect } from 'react-redux'

function App({ isLogged }) {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          {isLogged ? <Redirect to="/home" /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

const mapStateToProps = state => {
  return {
    isLogged: state.isLogged
  }
}
export default connect(mapStateToProps)(App)
