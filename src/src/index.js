import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import App from '@app/App';
import store, {getCustomHistory} from '@app/store/store'; // 다른 store보다 위에 있어야함.

import './index.scss';
import './i18n';
import * as serviceWorker from '@app/serviceWorker';

/** ***********************************************
 * axios settting
 ************************************************ */
// 환경에 따른 baseURL 분기처리
axios.defaults.baseURL =
    process.env.NODE_ENV === 'development' ? '/api/v1/' : '/api/v1/';

// axios.defaults.timeout = 2500;

axios.interceptors.request.use(
    (request) => {
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.data.status === 401) {
            // store.dispatch(processLogout());
        }
        return Promise.reject(error);
    }
);

/** ***********************************************
 * toast settting
 ************************************************ */
toast.configure({
    autoClose: 3000,
    draggable: false,
    position: 'top-right',
    hideProgressBar: false,
    newestOnTop: true,
    closeOnClick: true,
    rtl: false,
    pauseOnVisibilityChange: true,
    pauseOnHover: true
});

/** ***********************************************
 * APP Render
 ************************************************ */
ReactDOM.render(
    <Router history={getCustomHistory()}>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
