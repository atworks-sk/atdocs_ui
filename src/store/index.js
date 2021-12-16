/* eslint-disable no-multi-assign */
import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import commonUI from './commonUi'; // 다른 store보다 위에 있어야함.
import dashboard, {dashboardSaga} from './dashboard';
import common, {commonSaga} from './commonStore';
import project, {projectSaga} from './projectStore';
import clazz, {clazzSaga} from './clazzStore';
import method, {methodSaga} from './methodStore';
import snapshot, {snapshotSaga} from './snapshotStore';

const rootReducer = combineReducers({
    commonUI,
    common,
    project,
    dashboard,
    clazz,
    method,
    snapshot
});
export function* rootSaga() {
    yield all([
        commonSaga(),
        dashboardSaga(),
        projectSaga(),
        clazzSaga(),
        methodSaga(),
        snapshotSaga()
    ]); // all 은 배열 안의 여러 사가를 동시에 실행시켜줍니다.
}

export default rootReducer;
