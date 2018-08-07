import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Forecast from './Forecast/Forecast';
import AlertDetail from './AlertDetail/AlertDetail';

const NotFound = () => <div>Page not found!</div>;

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Forecast} />
      <Route path="/alert" component={AlertDetail} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
