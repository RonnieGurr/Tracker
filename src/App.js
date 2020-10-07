import React from 'react';
import Header from './components/public/Header';
import Login from './components/public/Login';
import Dashboard from './components/private/Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, BrowserRouter, Redirect
} from "react-router-dom";

const Auth = require('./components/helpers/checkAuth');

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      authed : Auth.isAuthed()
    }
  }

  render() {
    return (
      <div>
        <Header />

        <BrowserRouter>
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/dashboard'>
              {this.state.authed ? 
              <Dashboard />
              :
              <Redirect to='/login'/>
            }
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;