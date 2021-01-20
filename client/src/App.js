import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Import Styles
import './styles/App.scss';
// Import Components
import Nav from './components/Nav';
import Rosary from './components/Rosary';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/" exact component={Rosary} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;