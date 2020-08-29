import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Timer from './pages/Timer';

const App = () => (
  <Router>
    <Switch>
      <Route path="/:min/:time" component={Timer} />
      <Route path="/:min" component={Home} />
      <Route path="/" component={Home} />
    </Switch>
  </Router>
);

export default App;
