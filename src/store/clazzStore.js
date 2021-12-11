/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import {takeLatest, takeEvery} from 'redux-saga/effects';
import * as clazzApi from '../api/clazzApi';
import {
    reducerUtils,
    handleAsyncActions,
    createPromiseSaga
} from '../lib/asyncUtils';

// dashboard Same-day test results (searchDayTestResult)
const PREFIX = 'CLAZZ';

/*
 * 프로젝트 리스트 조회
 * 리스트 조회 : searchClazzList (SEARCH_CLAZZ_LIST)
 * 리스트 초기화 : searchClazzListClear (SEARCH_CLAZZ_LIST_CLEAR)
 * Form 데이터 설정 : searchClazzListSetForm (SEARCH_CLAZZ_LIST_SET_FORM)
 * Form 초기값 조회 : searchClazzListFormInitData
 */
const SEARCH_CLAZZ_LIST = `${PREFIX}/SEARCH_CLAZZ_LIST`; // 요청 시작
const SEARCH_CLAZZ_LIST_SUCCESS = `${PREFIX}/SEARCH_CLAZZ_LIST_SUCCESS`; // 요청 성공
const SEARCH_CLAZZ_LIST_ERROR = `${PREFIX}/SEARCH_CLAZZ_LIST_ERROR`; // 요청 실패
const SEARCH_CLAZZ_LIST_CLEAR = `${PREFIX}/SEARCH_CLAZZ_LIST_CLEAR`; // 조회 결과 초기화
const SEARCH_CLAZZ_LIST_SET_FORM = `${PREFIX}/SEARCH_CLAZZ_LIST_SET_FORM`;

/*
 * 프로젝트 리스트 조회
 * 리스트 조회 : searchProjectList (SEARCH_PROJECT_LIST)
 * 리스트 초기화 : searchProjectListClear (SEARCH_PROJECT_LIST_CLEAR)
 * Form 데이터 설정 : searchProjectListSetForm (SEARCH_PROJECT_LIST_SET_FORM)
 * Form 초기값 조회 : searchProjectListFormInitData
 */
export const searchClazzList = (searchForm) => ({
    type: SEARCH_CLAZZ_LIST,
    payload: searchForm
});
export const searchClazzListClear = () => ({
    type: SEARCH_CLAZZ_LIST_CLEAR
});
export const searchClazzListSetForm = (searchClazzListForm) => ({
    type: SEARCH_CLAZZ_LIST_SET_FORM,
    payload: {
        searchClazzListForm
    }
});
export const searchClazzListFormInitData = () => {
    return {
        clazzName: '',
        projectId: '',
        page: 1,
        size: 10
    };
};

/*
 * projectSaga
 */
export function* clazzSaga() {
    yield takeLatest(
        SEARCH_CLAZZ_LIST,
        createPromiseSaga(SEARCH_CLAZZ_LIST, clazzApi.searchClazzList)
    );
}

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
    searchClazzListForm: searchClazzListFormInitData(),
    searchClazzListRes: reducerUtils.initial()
};

export default function bulktest(state = initialState, action) {
    switch (action.type) {
        // dashboard Same-day test results
        case SEARCH_CLAZZ_LIST:
        case SEARCH_CLAZZ_LIST_SUCCESS:
        case SEARCH_CLAZZ_LIST_ERROR:
            return handleAsyncActions(
                SEARCH_CLAZZ_LIST,
                'searchClazzListRes',
                true
            )(state, action);
        case SEARCH_CLAZZ_LIST_CLEAR:
            return {
                ...state,
                searchProjectListRes: reducerUtils.initial()
            };
        case SEARCH_CLAZZ_LIST_SET_FORM:
            return {
                ...state,
                searchClazzListForm: action.payload.searchClazzListForm
            };

        default:
            return state;
    }
}
