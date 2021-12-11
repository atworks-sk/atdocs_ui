import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import PrivacyPolicy from '@modules/privacy-policy/PrivacyPolicy';

import Main from '@modules/main/Main';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

import './App.scss';

const App = () => {
    return (
        <Router>
            <Switch>
                <PublicRoute exact path="/privacy-policy">
                    <PrivacyPolicy />
                </PublicRoute>
                <PrivateRoute path="/">
                    <Main />
                </PrivateRoute>
            </Switch>
        </Router>
    );
};

export default App;
