import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import TitleBar from './TitleBar';
import NavBar from './NavBar';

import General from './General';
import Explore from './Explore';
import LeagueTables from './LeagueTables';

require('../../stylesheets/components/App.scss');
require('../../stylesheets/globals/globals.scss');

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <TitleBar />
          <NavBar />
          <Switch>
            <Route path='/explore' component={Explore}></Route>
            <Route path='/general' component={General}></Route>
            <Route path='/leaguetables' component={LeagueTables}></Route>
            <Route render={function() {
              return <p>Not Found!</p>;
            }} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
