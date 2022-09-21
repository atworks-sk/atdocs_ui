/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import {takeLatest, takeEvery} from 'redux-saga/effects';
import * as SourceApi from '../api/sourceApi';
import {
    reducerUtils,
    handleAsyncActions,
    createPromiseSaga
} from '../lib/asyncUtils';

// dashboard Same-day test results (searchDayTestResult)
const PREFIX = 'SOURCE';

/*
 * (MODAL) SOURCE 추가 팝업
 * SHOW : showModalAddSource (SHOW_MODAL_ADD_SOURCE)
 * HIDE : hideModalAddSource (HIDE_MODAL_ADD_SOURCE)
 */
const SHOW_MODAL_ADD_SOURCE = `${PREFIX}/SHOW_MODAL_ADD_SOURCE`; // WORK 등록/수정 팝업
const HIDE_MODAL_ADD_SOURCE = `${PREFIX}/HIDE_MODAL_ADD_SOURCE`; // WORK 등록/수정 팝업

export const showModalAddSource = (initData) => ({
    type: SHOW_MODAL_ADD_SOURCE,
    payload: {
        ...initData
    }
});

export const hideModalAddSource = () => ({
    type: HIDE_MODAL_ADD_SOURCE
});

const ADD_SOURCE = `${PREFIX}/ADD_SOURCE`; // 요청 시작
const ADD_SOURCE_SUCCESS = `${PREFIX}/ADD_SOURCE_SUCCESS`; // 요청 성공
const ADD_SOURCE_ERROR = `${PREFIX}/ADD_SOURCE_ERROR`; // 요청 실패
const ADD_SOURCE_CLEAR = `${PREFIX}/ADD_SOURCE_CLEAR`; // 조회 결과 초기화
export const addSource = (data) => ({
    type: ADD_SOURCE,
    payload: data
});
export const addSourceClear = () => ({
    type: ADD_SOURCE_CLEAR
});

/*
 * (MODAL) SOURCE LIST
 * SHOW : showModalSources (SHOW_MODAL_ADD_SOURCE)
 * HIDE : hideModalSources (HIDE_MODAL_ADD_SOURCE)
 */
const SHOW_MODAL_SOURCES = `${PREFIX}/SHOW_MODAL_SOURCES`; // WORK 등록/수정 팝업
const HIDE_MODAL_SOURCES = `${PREFIX}/HIDE_MODAL_SOURCES`; // WORK 등록/수정 팝업

export const showModalSources = (initData) => ({
    type: SHOW_MODAL_SOURCES,
    payload: {
        ...initData
    }
});

export const hideModalSource = () => ({
    type: HIDE_MODAL_SOURCES
});

/*
 * search ources
 * 조회 : searchSources (SEARCH_SOURCES)
 * 초기화 : searchSourcesClear (SEARCH_SOURCES_CLEAR)
 * Form 데이터 설정 : searchSourcesSetForm (SEARCH_SOURCES_SET_FORM)
 * Form 초기값 조회 : searcSourcesFormInitData
 */
const SEARCH_SOURCES = `${PREFIX}/SEARCH_SOURCES`; // 요청 시작
const SEARCH_SOURCES_SUCCESS = `${PREFIX}/SEARCH_SOURCES_SUCCESS`; // 요청 성공
const SEARCH_SOURCES_ERROR = `${PREFIX}/SEARCH_SOURCES_ERROR`; // 요청 실패
const SEARCH_SOURCES_CLEAR = `${PREFIX}/SEARCH_SOURCES_CLEAR`; // 조회 결과 초기화
const SEARCH_SOURCES_SET_FORM = `${PREFIX}/SEARCH_SOURCES_SET_FORM`;

export const searchSources = (searchForm) => ({
    type: SEARCH_SOURCES,
    payload: searchForm
});
export const searchSourcesClear = () => ({
    type: SEARCH_SOURCES_CLEAR
});

export const searchSourcesSetForm = (data) => ({
    type: SEARCH_SOURCES_SET_FORM,
    payload: {
        data
    }
});
export const searcSourcesFormInitData = () => {
    return {
        workdId: -1,
        sourceName: '',
        sourceType: '',
        page: 1,
        size: 10
    };
};

/*
 * (TR) Source 삭제 event
 * 삭제  : deleteSource (DELETE_SOURCE)
 * 삭제 초기화 : deleteSourceClear (DELETE_SOURCE_CLEAR)
 */
const DELETE_SOURCE = `${PREFIX}/DELETE_SOURCE`; // 요청 시작
const DELETE_SOURCE_SUCCESS = `${PREFIX}/DELETE_SOURCE_SUCCESS`; // 요청 성공
const DELETE_SOURCE_ERROR = `${PREFIX}/DELETE_SOURCE_ERROR`; // 요청 실패
const DELETE_SOURCE_CLEAR = `${PREFIX}/DELETE_SOURCE_CLEAR`; // 조회 결과 초기화

export const deleteSource = (id) => ({
    type: DELETE_SOURCE,
    payload: {
        id
    }
});
export const deleteSourceClear = () => ({
    type: DELETE_SOURCE_CLEAR
});

/*
 * (TR) Source Text
 * 조회 : searchSourceList (SEARCH_SOURCE_TEXT)
 * 초기화 : searchSourceTextClear (SEARCH_SOURCE_TEXT_CLEAR)
 */
const SEARCH_SOURCE_TEXT = `${PREFIX}/SEARCH_SOURCE_TEXT`; // 요청 시작
const SEARCH_SOURCE_TEXT_SUCCESS = `${PREFIX}/SEARCH_SOURCE_TEXT_SUCCESS`; // 요청 성공
const SEARCH_SOURCE_TEXT_ERROR = `${PREFIX}/SEARCH_SOURCE_TEXT_ERROR`; // 요청 실패
const SEARCH_SOURCE_TEXT_CLEAR = `${PREFIX}/SEARCH_SOURCE_TEXT_CLEAR`; // 조회 결과 초기화

export const searchSourceText = (sourceId) => ({
    type: SEARCH_SOURCE_TEXT,
    payload: {sourceId}
});
export const searchSourceTextClear = () => ({
    type: SEARCH_SOURCE_TEXT_CLEAR
});

/*
 * projectSaga
 */
export function* sourceSaga() {
    yield takeEvery(
        ADD_SOURCE,
        createPromiseSaga(ADD_SOURCE, SourceApi.addSource)
    );
    yield takeLatest(
        SEARCH_SOURCES,
        createPromiseSaga(SEARCH_SOURCES, SourceApi.searchSources)
    );
    yield takeEvery(
        DELETE_SOURCE,
        createPromiseSaga(DELETE_SOURCE, SourceApi.deleteSource)
    );
    yield takeLatest(
        SEARCH_SOURCE_TEXT,
        createPromiseSaga(SEARCH_SOURCE_TEXT, SourceApi.searchSourceText)
    );
}

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
    addSourceModalInitData: {
        showModal: false,
        initData: {}
    },
    addSourceRes: reducerUtils.initial(),
    sourcesModalInitData: {
        showModal: false,
        initData: {}
    },
    searchSourcesForm: searcSourcesFormInitData(),
    searchSourcesRes: reducerUtils.initial(),
    deleteSourceRes: reducerUtils.initial(),
    searchSourceTextRes: reducerUtils.initial()
};

export default function bulktest(state = initialState, action) {
    switch (action.type) {
        /*
         * SOURCE 추가
         * SHOW : showModalAddSource (SHOW_MODAL_ADD_SOURCE)
         * HIDE : hideModalAddSource (HIDE_MODAL_ADD_SOURCE)
         */
        case SHOW_MODAL_ADD_SOURCE:
            return {
                ...state,
                addSourceModalInitData: {
                    showModal: true,
                    initData: {...action.payload}
                }
            };

        case HIDE_MODAL_ADD_SOURCE:
            return {
                ...state,
                addSourceModalInitData: {
                    showModal: false,
                    initData: {}
                }
            };

        // dashboard Same-day test results
        case ADD_SOURCE:
        case ADD_SOURCE_SUCCESS:
        case ADD_SOURCE_ERROR:
            return handleAsyncActions(
                ADD_SOURCE,
                'addSourceRes',
                true
            )(state, action);
        case ADD_SOURCE_CLEAR:
            return {
                ...state,
                addSourceRes: reducerUtils.initial()
            };

        /*
         * SOURCE LIST
         * SHOW : showModalSources (SHOW_MODAL_SOURCES)
         * HIDE : hideModalSources (HIDE_MODAL_SOURCES)
         */
        case SHOW_MODAL_SOURCES:
            return {
                ...state,
                sourcesModalInitData: {
                    showModal: true,
                    initData: {...action.payload}
                }
            };

        case HIDE_MODAL_SOURCES:
            return {
                ...state,
                sourcesModalInitData: {
                    showModal: false,
                    initData: {}
                }
            };

        /*
         * search Works
         * 조회 : searchWorks (SEARCH_SOURCES)
         * 초기화 : searchWorksClear (SEARCH_SOURCES_CLEAR)
         * Form 데이터 설정 : searchWorksSetForm (SEARCH_SOURCES_SET_FORM)
         * Form 초기값 조회 : searcSourcesFormInitData
         */
        case SEARCH_SOURCES:
        case SEARCH_SOURCES_SUCCESS:
        case SEARCH_SOURCES_ERROR:
            return handleAsyncActions(
                SEARCH_SOURCES,
                'searchSourcesRes',
                true
            )(state, action);
        case SEARCH_SOURCES_CLEAR:
            return {
                ...state,
                searchSourcesRes: reducerUtils.initial()
            };
        case SEARCH_SOURCES_SET_FORM:
            return {
                ...state,
                searchSourcesForm: action.payload.data
            };

        /*
         * (TR) Source 삭제 event
         * 삭제  : deleteSource (DELETE_SOURCE)
         * 삭제 초기화 : deleteSourceClear (DELETE_SOURCE_CLEAR)
         */
        case DELETE_SOURCE:
        case DELETE_SOURCE_SUCCESS:
        case DELETE_SOURCE_ERROR:
            return handleAsyncActions(
                DELETE_SOURCE,
                'deleteSourceRes',
                true
            )(state, action);

        case DELETE_SOURCE_CLEAR:
            return {
                ...state,
                deleteSourceRes: reducerUtils.initial()
            };

        /*
         * (TR) Source Text
         * 조회 : searchSourceList (SEARCH_SOURCE_TEXT)
         * 초기화 : searchSourceTextClear (SEARCH_SOURCE_TEXT_CLEAR)
         */
        case SEARCH_SOURCE_TEXT:
        case SEARCH_SOURCE_TEXT_SUCCESS:
        case SEARCH_SOURCE_TEXT_ERROR:
            return handleAsyncActions(
                SEARCH_SOURCE_TEXT,
                'searchSourceTextRes',
                true
            )(state, action);
        case SEARCH_SOURCE_TEXT_CLEAR:
            return {
                ...state,
                searchSourceTextRes: reducerUtils.initial()
            };

        default:
            return state;
    }
}
