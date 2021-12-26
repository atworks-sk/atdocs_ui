/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import {takeLatest, takeEvery} from 'redux-saga/effects';
import * as restApi from '../api/restApi';
import {
    reducerUtils,
    handleAsyncActions,
    createPromiseSaga
} from '../lib/asyncUtils';

// dashboard Same-day test results (searchDayTestResult)
const PREFIX = 'REST';

/*
 * rest 리스트 조회
 * 리스트 조회 : searchRestList (SEARCH_REST_LIST)
 * 리스트 초기화 : searchRestListClear (SEARCH_REST_LIST_CLEAR)
 * Form 데이터 설정 : searchRestListSetForm (SEARCH_REST_LIST_SET_FORM)
 * Form 초기값 조회 : searchRestListFormInitData
 */
const SEARCH_REST_LIST = `${PREFIX}/SEARCH_REST_LIST`; // 요청 시작
const SEARCH_REST_LIST_SUCCESS = `${PREFIX}/SEARCH_REST_LIST_SUCCESS`; // 요청 성공
const SEARCH_REST_LIST_ERROR = `${PREFIX}/SEARCH_REST_LIST_ERROR`; // 요청 실패
const SEARCH_REST_LIST_CLEAR = `${PREFIX}/SEARCH_REST_LIST_CLEAR`; // 조회 결과 초기화
const SEARCH_REST_LIST_SET_FORM = `${PREFIX}/SEARCH_REST_LIST_SET_FORM`;

export const searchRestList = (searchForm) => ({
    type: SEARCH_REST_LIST,
    payload: searchForm
});
export const searchRestListClear = () => ({
    type: SEARCH_REST_LIST_CLEAR
});
export const searchRestListSetForm = (searchRestListForm) => ({
    type: SEARCH_REST_LIST_SET_FORM,
    payload: {
        searchRestListForm
    }
});
export const searchRestListFormInitData = () => {
    return {
        urlPath: '',
        projectId: '',
        page: 1,
        size: 10
    };
};

/*
 * 프로젝트 상세조회
 * 상세 조회 : searchRestDetail (SEARCH_REST_DETAIL)
 * 상세 조회 초기화 : searchRestDetailClear (SEARCH_REST_DETAIL_CLEAR)
 */
const SEARCH_REST_DETAIL = `${PREFIX}/SEARCH_REST_DETAIL`; // 요청 시작
const SEARCH_REST_DETAIL_SUCCESS = `${PREFIX}/SEARCH_REST_DETAIL_SUCCESS`; // 요청 성공
const SEARCH_REST_DETAIL_ERROR = `${PREFIX}/SEARCH_REST_DETAIL_ERROR`; // 요청 실패
const SEARCH_REST_DETAIL_CLEAR = `${PREFIX}/SEARCH_REST_DETAIL_CLEAR`; // 조회 결과 초기화

export const searchRestDetail = (id) => ({
    type: SEARCH_REST_DETAIL,
    payload: {
        id
    }
});

export const searchRestDetailClear = () => ({
    type: SEARCH_REST_DETAIL_CLEAR
});

/*
 * restSaga
 */
export function* restSaga() {
    yield takeLatest(
        SEARCH_REST_LIST,
        createPromiseSaga(SEARCH_REST_LIST, restApi.searchRestList)
    );

    // yield takeLatest(
    //     SEARCH_REST_DETAIL,
    //     createPromiseSaga(SEARCH_REST_DETAIL, restApi.searchRestDetail)
    // );
}

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
    searchRestListForm: searchRestListFormInitData(),
    searchRestListRes: reducerUtils.initial(),
    searchRestDetailRes: reducerUtils.initial()
};

export default function bulktest(state = initialState, action) {
    switch (action.type) {
        // 리스트 검색
        case SEARCH_REST_LIST:
        case SEARCH_REST_LIST_SUCCESS:
        case SEARCH_REST_LIST_ERROR:
            return handleAsyncActions(
                SEARCH_REST_LIST,
                'searchRestListRes',
                true
            )(state, action);
        case SEARCH_REST_LIST_CLEAR:
            return {
                ...state,
                searchRestListRes: reducerUtils.initial()
            };
        case SEARCH_REST_LIST_SET_FORM:
            return {
                ...state,
                searchRestListForm: action.payload.searchRestListForm
            };

        // 상세 검색
        case SEARCH_REST_DETAIL:
        case SEARCH_REST_DETAIL_SUCCESS:
        case SEARCH_REST_DETAIL_ERROR:
            return handleAsyncActions(
                SEARCH_REST_DETAIL,
                'searchRestDetailRes',
                true
            )(state, action);

        case SEARCH_REST_DETAIL_CLEAR:
            return {
                ...state,
                searchRestDetailRes: reducerUtils.initial()
            };

        default:
            return state;
    }
}
