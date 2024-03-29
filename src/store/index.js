/* eslint-disable no-multi-assign */
import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import commonUI from './commonUi'; // 다른 store보다 위에 있어야함.

import project, {projectSaga} from './projectStore';
import work, {workSaga} from './workStore';
import source, {sourceSaga} from './sourceStore';

import dashboard, {dashboardSaga} from './dashboard';
import common, {commonSaga} from './commonStore';
import clazz, {clazzSaga} from './clazzStore';
import method, {methodSaga} from './methodStore';
import snapshot, {snapshotSaga} from './snapshotStore';
import rest, {restSaga} from './restStore';

const rootReducer = combineReducers({
    commonUI,
    project,
    work,
    source,
    common,

    dashboard,
    clazz,
    method,
    snapshot,
    rest
});
export function* rootSaga() {
    yield all([
        projectSaga(),
        workSaga(),
        sourceSaga(),

        commonSaga(),
        dashboardSaga(),

        clazzSaga(),
        methodSaga(),
        snapshotSaga(),
        restSaga()
    ]); // all 은 배열 안의 여러 사가를 동시에 실행시켜줍니다.
}

export default rootReducer;
