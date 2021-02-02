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
    vttLoaded: false,
    currentTime: 0,
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
    //console.log('App.js - componentDidMount');
    // Axios call to get ALL of the mysteries
    axios.get(`${window.$R_URL}${window.$R_ROSARY}${window.$R_MYSTERY}`)
      .then(result => {
        let currentIndex = result.data.findIndex(mystery =>
          mystery.code === this.state.currentMystery[0].code)
        if (currentIndex !== -1) {
          result.data[currentIndex].active = 1
          this.setState({ mysteries: result.data })
          //console.log('App.js - mysteries => ', result.data)
        }
      })
      .catch(err => console.log('Error=>', err.response));
  };

  activeMysteryHandler = () => {
    this.setState({ mysteryStatus: !this.state.mysteryStatus });
  }

  currentMysteryHandler = (currentMystery) => {
    this.setState({ currentMystery: currentMystery });
  };

  mysteriesHandler = (newMysteries) => {
    this.setState({ mysteries: newMysteries });
  };

  currentPlaybackHandler = (vttLoaded, currentTime) => {
    this.setState({ vttLoaded: vttLoaded });
    this.setState({ currentTime: currentTime });
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
              mysteries={this.state.mysteries}
              currentMystery={this.state.currentMystery}
              handleCurrentMystery={this.currentMysteryHandler}
              vttLoaded={this.state.vttLoaded}
              currentTime={this.state.currentTime}
              handleCurrentPlayback={this.currentPlaybackHandler}
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