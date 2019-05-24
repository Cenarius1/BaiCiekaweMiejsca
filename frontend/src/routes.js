import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import pages from './pages';

export default (
    <Switch>
      <Route exact path="/" component={pages.login.View} />
      <Route exact path="/map" component={pages.map.View} />
    </Switch>
);