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
 * CLAZZ 리스트 조회
 * 리스트 조회 : searchClazzes (SEARCH_CLAZZ_LIST)
 * 리스트 초기화 : searchClazzesClear (SEARCH_CLAZZES_CLEAR)
 * Form 데이터 설정 : searchClazzesSetForm (SEARCH_CLAZZES_SET_FORM)
 * Form 초기값 조회 : searchClazzesFormInitData
 */
const SEARCH_CLAZZES = `${PREFIX}/SEARCH_CLAZZES`; // 요청 시작
const SEARCH_CLAZZES_SUCCESS = `${PREFIX}/SEARCH_CLAZZES_SUCCESS`; // 요청 성공
const SEARCH_CLAZZES_ERROR = `${PREFIX}/SEARCH_CLAZZES_ERROR`; // 요청 실패
const SEARCH_CLAZZES_CLEAR = `${PREFIX}/SEARCH_CLAZZES_CLEAR`; // 조회 결과 초기화
const SEARCH_CLAZZES_SET_FORM = `${PREFIX}/SEARCH_CLAZZES_SET_FORM`;

export const searchClazzes = (searchForm) => ({
    type: SEARCH_CLAZZES,
    payload: searchForm
});
export const searchClazzesClear = () => ({
    type: SEARCH_CLAZZES_CLEAR
});
export const searchClazzesSetForm = (searchClazzesForm) => ({
    type: SEARCH_CLAZZES_SET_FORM,
    payload: {
        searchClazzesForm
    }
});
export const searchClazzesFormInitData = () => {
    return {
        clazzName: '',
        projectId: -1,
        page: 1,
        size: 10
    };
};

/*
 * CLAZZ 상세조회
 * 상세 조회 : searchClazz (SEARCH_CLAZZ)
 * 상세 조회 초기화 : searchClazzClear (SEARCH_CLAZZ_CLEAR)
 */
const SEARCH_CLAZZ = `${PREFIX}/SEARCH_CLAZZ`; // 요청 시작
const SEARCH_CLAZZ_SUCCESS = `${PREFIX}/SEARCH_CLAZZ_SUCCESS`; // 요청 성공
const SEARCH_CLAZZ_ERROR = `${PREFIX}/SEARCH_CLAZZ_ERROR`; // 요청 실패
const SEARCH_CLAZZ_CLEAR = `${PREFIX}/SEARCH_CLAZZ_CLEAR`; // 조회 결과 초기화

export const searchClazz = (id) => ({
    type: SEARCH_CLAZZ,
    payload: {
        id
    }
});

export const searchClazzClear = () => ({
    type: SEARCH_CLAZZ_CLEAR
});

/*
 * projectSaga (API와 연결)
 */
export function* clazzSaga() {
    yield takeLatest(
        SEARCH_CLAZZES,
        createPromiseSaga(SEARCH_CLAZZES, clazzApi.searchClazzes)
    );
    yield takeLatest(
        SEARCH_CLAZZ,
        createPromiseSaga(SEARCH_CLAZZ, clazzApi.searchClazz)
    );
}

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
    searchClazzesForm: searchClazzesFormInitData(),
    searchClazzesRes: reducerUtils.initial(),
    searchClazzRes: reducerUtils.initial()
};

export default function bulktest(state = initialState, action) {
    switch (action.type) {
        // dashboard Same-day test results
        case SEARCH_CLAZZES:
        case SEARCH_CLAZZES_SUCCESS:
        case SEARCH_CLAZZES_ERROR:
            return handleAsyncActions(
                SEARCH_CLAZZES,
                'searchClazzesRes',
                true
            )(state, action);
        case SEARCH_CLAZZES_CLEAR:
            return {
                ...state,
                searchClazzesRes: reducerUtils.initial()
            };
        case SEARCH_CLAZZES_SET_FORM:
            return {
                ...state,
                searchClazzesForm: action.payload.searchClazzesForm
            };

        case SEARCH_CLAZZ:
        case SEARCH_CLAZZ_SUCCESS:
        case SEARCH_CLAZZ_ERROR:
            return handleAsyncActions(
                SEARCH_CLAZZ,
                'searchClazzRes',
                true
            )(state, action);

        case SEARCH_CLAZZ_CLEAR:
            return {
                ...state,
                searchClazzRes: reducerUtils.initial()
            };
        default:
            return state;
    }
}
