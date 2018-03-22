import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

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
            <Route exact path='/' render={() => (
              <Redirect to='/general?home=true' />
            )} />
            <Route path='/explore' component={Explore} />
            <Route path='/general' component={General} />
            <Route path='/leaguetables' component={LeagueTables} />
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
