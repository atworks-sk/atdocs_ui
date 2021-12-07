/* eslint-disable no-unused-vars */
import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const PublicRoute = ({children, ...rest}) => {
    const isAuthenticated = true;

    return <Route {...rest} render={({location}) => children} />;
};

export default PublicRoute;
