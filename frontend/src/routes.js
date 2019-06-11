import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import pages from './pages';

export default (
  <Switch>
    <Route exact path="/" component={pages.login.View} />
    <Route exact path="/map" component={pages.eventsMap.View} />
    <Route exact path="/register" component={pages.register.View} />
    <Route exact path="/list" component={pages.eventsList.View} />
    <Route exact path="/details/:id" component={pages.eventDetails.View} />
    <Route exact path="/add" component={pages.eventForm.View} />
    <Route exact path="/edit/:id" component={pages.eventForm.View} />
    <Route exact path="/manage" component={pages.eventsManage.View} />
  </Switch>
);