import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/appContainer';
import Add from './components/Add';
import Edit from './components/Edit';
import ListView from './components/ListView';

export const Routes = () => (
    <Switch>
        <Route exact path='/' component={App} />
        <Route path='/list/:listID' component={ListView} />
        <Route path='/add' component={Add} />
        <Route path='/edit/:listID' component={Edit} />
    </Switch>
);

export default Routes;