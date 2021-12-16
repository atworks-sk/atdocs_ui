/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import {takeLatest, takeEvery} from 'redux-saga/effects';
import * as methodApi from '../api/methodApi';
import {
    reducerUtils,
    handleAsyncActions,
    createPromiseSaga
} from '../lib/asyncUtils';

// dashboard Same-day test results (searchDayTestResult)
const PREFIX = 'METHOD';

/*
 * method 리스트 조회
 * 리스트 조회 : searchMethodList (SEARCH_METHOD_LIST)
 * 리스트 초기화 : searchMethodListClear (SEARCH_METHOD_LIST_CLEAR)
 * Form 데이터 설정 : searchMethodListSetForm (SEARCH_METHOD_LIST_SET_FORM)
 * Form 초기값 조회 : searchMethodListFormInitData
 */
const SEARCH_METHOD_LIST = `${PREFIX}/SEARCH_METHOD_LIST`; // 요청 시작
const SEARCH_METHOD_LIST_SUCCESS = `${PREFIX}/SEARCH_METHOD_LIST_SUCCESS`; // 요청 성공
const SEARCH_METHOD_LIST_ERROR = `${PREFIX}/SEARCH_METHOD_LIST_ERROR`; // 요청 실패
const SEARCH_METHOD_LIST_CLEAR = `${PREFIX}/SEARCH_METHOD_LIST_CLEAR`; // 조회 결과 초기화
const SEARCH_METHOD_LIST_SET_FORM = `${PREFIX}/SEARCH_METHOD_LIST_SET_FORM`;

export const searchMethodList = (searchForm) => ({
    type: SEARCH_METHOD_LIST,
    payload: searchForm
});
export const searchMethodListClear = () => ({
    type: SEARCH_METHOD_LIST_CLEAR
});
export const searchMethodListSetForm = (searchMethodListForm) => ({
    type: SEARCH_METHOD_LIST_SET_FORM,
    payload: {
        searchMethodListForm
    }
});
export const searchMethodListFormInitData = () => {
    return {
        methodName: '',
        projectId: '',
        page: 1,
        size: 10
    };
};

/*
 * 프로젝트 상세조회
 * 상세 조회 : searchMethodDetail (SEARCH_METHOD_DETAIL)
 * 상세 조회 초기화 : searchMethodDetailClear (SEARCH_METHOD_DETAIL_CLEAR)
 */
const SEARCH_METHOD_DETAIL = `${PREFIX}/SEARCH_METHOD_DETAIL`; // 요청 시작
const SEARCH_METHOD_DETAIL_SUCCESS = `${PREFIX}/SEARCH_METHOD_DETAIL_SUCCESS`; // 요청 성공
const SEARCH_METHOD_DETAIL_ERROR = `${PREFIX}/SEARCH_METHOD_DETAIL_ERROR`; // 요청 실패
const SEARCH_METHOD_DETAIL_CLEAR = `${PREFIX}/SEARCH_METHOD_DETAIL_CLEAR`; // 조회 결과 초기화

export const searchMethodDetail = (id) => ({
    type: SEARCH_METHOD_DETAIL,
    payload: {
        id
    }
});

export const searchMethodDetailClear = () => ({
    type: SEARCH_METHOD_DETAIL_CLEAR
});

/*
 * methodSaga
 */
export function* methodSaga() {
    yield takeLatest(
        SEARCH_METHOD_LIST,
        createPromiseSaga(SEARCH_METHOD_LIST, methodApi.searchMethodList)
    );

    yield takeLatest(
        SEARCH_METHOD_DETAIL,
        createPromiseSaga(SEARCH_METHOD_DETAIL, methodApi.searchMethodDetail)
    );
}

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
    searchMethodListForm: searchMethodListFormInitData(),
    searchMethodListRes: reducerUtils.initial(),
    searchMethodDetailRes: reducerUtils.initial()
};

export default function bulktest(state = initialState, action) {
    switch (action.type) {
        // 매서드 리스트 검색
        case SEARCH_METHOD_LIST:
        case SEARCH_METHOD_LIST_SUCCESS:
        case SEARCH_METHOD_LIST_ERROR:
            return handleAsyncActions(
                SEARCH_METHOD_LIST,
                'searchMethodListRes',
                true
            )(state, action);
        case SEARCH_METHOD_LIST_CLEAR:
            return {
                ...state,
                searchMethodListRes: reducerUtils.initial()
            };
        case SEARCH_METHOD_LIST_SET_FORM:
            return {
                ...state,
                searchMethodListForm: action.payload.searchMethodListForm
            };

        // 매서드 상세 검색
        case SEARCH_METHOD_DETAIL:
        case SEARCH_METHOD_DETAIL_SUCCESS:
        case SEARCH_METHOD_DETAIL_ERROR:
            return handleAsyncActions(
                SEARCH_METHOD_DETAIL,
                'searchMethodDetailRes',
                true
            )(state, action);

        case SEARCH_METHOD_DETAIL_CLEAR:
            return {
                ...state,
                searchMethodDetailRes: reducerUtils.initial()
            };

        default:
            return state;
    }
}
