import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
// Import Styles
import './styles/App.scss';
// Import Components
import { Nav, ProtectedRoute, Login, Rosary } from './components';

class App extends Component {
  state = {
    mysteryStatus: false
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Nav />
          <Switch>
            <Route path="/login"><Login /></Route>
            <ProtectedRoute path="/rosary" component={Rosary} />
            <Route exact path="/">
              <Redirect exact from="/" to="/rosary" />
            </Route>
            <Route path="*">
              <Redirect exact from="/" to="/rosary" />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  };
};

export default App;