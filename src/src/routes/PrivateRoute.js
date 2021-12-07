/* eslint-disable no-unused-vars */
import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({children, ...rest}) => {
    const {isLoggedIn} = true;
    return <Route {...rest} render={({location}) => children} />;
};

export default PrivateRoute;
