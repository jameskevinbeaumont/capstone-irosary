import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
// Import Styles
import './styles/App.scss';
// Import Components
import { Nav, ProtectedRoute, Login, Rosary } from './components';

function App() {

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

export default App;