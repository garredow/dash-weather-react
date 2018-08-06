import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Forecast from './Forecast/Forecast';

const NotFound = () => <div>Page not found!</div>;

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Forecast} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
