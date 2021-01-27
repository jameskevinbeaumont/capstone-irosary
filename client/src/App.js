import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Import Styles
import './styles/App.scss';
// Import Components
import { Nav, Rosary } from './components';

class App extends React.Component {
  _isMounted = false;

  state = {
    currentMystery: {
      code: '',
      description: '',
      image: '',
      mediaFile: '',
      vttFile: ''
    }
  };

  componentDidMount() {
    this._isMounted = true;

    // Get current day of the week
    const currentDate = new Date();
    const currentDOW = currentDate.getDay();
    console.log(currentDOW);

    // Axios call to get the mystery based upon the
    // day of the week
    axios.get(`${window.$R_URL}${window.$R_ROSARY}${window.$R_MYSTERY}${currentDOW}`)
      .then(result => {
        this.setState({ currentMystery: result.data })
        //console.log(result.data)
      })
      .catch(err => console.log('Error=>', err.response));
  };

  componentDidUpdate() {
  };

  componentWillUnmount() {
    this._isMounted = false;
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Nav />
          <Switch>
            <Route path="/" exact render={(routerProps) => (<Rosary {...routerProps} currentMystery={this.state.currentMystery} />)} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  };
};

export default App;