// import {Gatekeeper} from 'gatekeeper-client-sdk';
import axios from 'axios';

export const loginByAuth = async (email, password) => {
    // const token = await Gatekeeper.loginByAuth(email, password);
    const response = await axios.post('/authenticate', {
        email,
        password
    });
    const {token} = response;
    localStorage.setItem('token', token);
    document.getElementById('root').classList.remove('login-page');
    document.getElementById('root').classList.remove('hold-transition');
    return token;
};

export const registerByAuth = async (email, password) => {
    // const token = await Gatekeeper.registerByAuth(email, password);
    const response = await axios.post('/member', {
        email,
        password
    });
    const {token} = response;
    localStorage.setItem('token', token);
    document.getElementById('root').classList.remove('register-page');
    document.getElementById('root').classList.remove('hold-transition');
    return token;
};
