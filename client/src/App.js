import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
// Import Styles
import './styles/App.scss';
// Import Components
import { Nav, ProtectedRoute, Login, Rosary, Mysteries } from './components';

class App extends Component {
  state = {
    mysteryStatus: false,
    mysteries: [],
    currentMystery: [{
      code: '',
      description: '',
      image: '',
      mediaFile: '',
      vttFile: ''
    }]
  };

  componentDidMount() {
    this._isMounted = true;
    // console.log('componentDidMount => App.js');
    // Axios call to get ALL of the mysteries
    axios.get(`${window.$R_URL}${window.$R_ROSARY}${window.$R_MYSTERY}`)
      .then(result => {
        // console.log('mysteries (App.js) => ', result.data)
        // console.log('currentMystery (App.js) => ', this.state.currentMystery);
        let currentIndex = result.data.findIndex(mystery =>
          mystery.code === this.state.currentMystery[0].code)
        // console.log(currentIndex)
        result.data[currentIndex].active = 1
        this.setState({ mysteries: result.data })
      })
      .catch(err => console.log('Error=>', err.response));
  };

  activeMysteryHandler = () => {
    this.setState({ mysteryStatus: !this.state.mysteryStatus });
  }

  currentMysteryHandler = (currentMystery) => {
    // console.log('currentMystery (App.js) => ', currentMystery);
    this.setState({ currentMystery: currentMystery });
  };

  mysteriesHandler = (newMysteries) => {
    // console.log('newMysteries (App.js) => ', newMysteries);
    this.setState({ mysteries: newMysteries });
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Nav
            mysteryStatus={this.state.mysteryStatus}
            handleActiveMystery={this.activeMysteryHandler}
          />
          <Mysteries
            mysteryStatus={this.state.mysteryStatus}
            mysteries={this.state.mysteries}
            currentMystery={this.state.currentMystery}
            handleCurrentMystery={this.currentMysteryHandler}
            handleMysteries={this.mysteriesHandler}
          />
          <Switch>
            <Route path="/login"><Login /></Route>
            <ProtectedRoute path="/rosary"
              component={Rosary}
              mysteryStatus={this.state.mysteryStatus}
              currentMystery={this.state.currentMystery}
              handleCurrentMystery={this.currentMysteryHandler}
            />
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