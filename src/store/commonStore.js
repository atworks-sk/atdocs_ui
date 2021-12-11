/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import {takeLatest, takeEvery} from 'redux-saga/effects';
import * as CommonApi from '../api/commonApi';
import {
    reducerUtils,
    handleAsyncActions,
    createPromiseSaga
} from '../lib/asyncUtils';

// dashboard Same-day test results (searchDayTestResult)
const PREFIX = 'COMMON';

/*
 * (공통영역) project 조회
 * 리스트 조회 : getProjectList (GET_PROJECT_LIST)
 */
const GET_PROJECT_LIST = `${PREFIX}/GET_PROJECT_LIST`; // 요청 시작
const GET_PROJECT_LIST_SUCCESS = `${PREFIX}/GET_PROJECT_LIST_SUCCESS`; // 요청 성공
const GET_PROJECT_LIST_ERROR = `${PREFIX}/GET_PROJECT_LIST_ERROR`; // 요청 실패

export const getProjectList = () => ({
    type: GET_PROJECT_LIST
});

/*
 * projectSaga
 */
export function* commonSaga() {
    yield takeLatest(
        GET_PROJECT_LIST,
        createPromiseSaga(
            GET_PROJECT_LIST,
            CommonApi.searchProjectListWithoutPage
        )
    );
}

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
    projectList: reducerUtils.initial()
};

export default function bulktest(state = initialState, action) {
    switch (action.type) {
        // dashboard Same-day test results
        case GET_PROJECT_LIST:
        case GET_PROJECT_LIST_SUCCESS:
        case GET_PROJECT_LIST_ERROR:
            return handleAsyncActions(
                GET_PROJECT_LIST,
                'projectList',
                true
            )(state, action);

        default:
            return state;
    }
}
