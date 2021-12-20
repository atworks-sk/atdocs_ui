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

/*
 * (공통영역) Java source show popup
 * SHOW : showModalSource (SHOW_MODAL_SOURCE)
 * HIDE : hideModalSource (HIDE_MODAL_SOURCE)
 */
const SHOW_MODAL_SOURCE = `${PREFIX}/SHOW_MODAL_SOURCE`; // Java source 팝업 호출
const HIDE_MODAL_SOURCE = `${PREFIX}/HIDE_MODAL_SOURCE`; // Java source 팝업 호출

export const showModalSource = (initData) => ({
    type: SHOW_MODAL_SOURCE,
    payload: {
        ...initData
    }
});

export const hideModalSource = () => ({
    type: HIDE_MODAL_SOURCE
});

/*
 * (공통영역) ANNOTATION show popup
 * SHOW : showModalAnnotation (SHOW_MODAL_ANNOTATION)
 * HIDE : hideModalAnnotation (HIDE_MODAL_ANNOTATION)
 */
const SHOW_MODAL_ANNOTATION = `${PREFIX}/SHOW_MODAL_ANNOTATION`; // ANNOTATION 팝업 호출
const HIDE_MODAL_ANNOTATION = `${PREFIX}/HIDE_MODAL_ANNOTATION`; // ANNOTATION 팝업 호출

export const showModalAnnotation = (initData) => ({
    type: SHOW_MODAL_ANNOTATION,
    payload: {
        ...initData
    }
});

export const hideModalAnnotation = () => ({
    type: HIDE_MODAL_ANNOTATION
});

/*
 * (공통영역) Comment show popup
 * SHOW : showModalComment (SHOW_MODAL_COMMENT)
 * HIDE : hideModalComment (HIDE_MODAL_COMMENT)
 */
const SHOW_MODAL_COMMENT = `${PREFIX}/SHOW_MODAL_COMMENT`; // Comment 팝업 호출
const HIDE_MODAL_COMMENT = `${PREFIX}/HIDE_MODAL_COMMENT`; // Comment 팝업 호출

export const showModalComment = (initData) => ({
    type: SHOW_MODAL_COMMENT,
    payload: {
        ...initData
    }
});

export const hideModalComment = () => ({
    type: HIDE_MODAL_COMMENT
});

/*
 * (공통영역) Inheritance show popup
 * SHOW : showModalInheritance (SHOW_MODAL_INHERITANCE)
 * HIDE : hideModalInheritance (HIDE_MODAL_INHERITANCE)
 */
const SHOW_MODAL_INHERITANCE = `${PREFIX}/SHOW_MODAL_INHERITANCE`; // Inheritance 팝업 호출
const HIDE_MODAL_INHERITANCE = `${PREFIX}/HIDE_MODAL_INHERITANCE`; // Inheritance 팝업 호출

export const showModalInheritance = (initData) => ({
    type: SHOW_MODAL_INHERITANCE,
    payload: {
        ...initData
    }
});

export const hideModalInheritance = () => ({
    type: HIDE_MODAL_INHERITANCE
});

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
    projectList: reducerUtils.initial(),
    // 자바소스 보기
    javaSourceModalInitData: {
        showModal: false,
        initData: {}
    },
    annotationModalInitData: {
        showModal: false,
        initData: {}
    },
    commentModalInitData: {
        showModal: false,
        initData: {}
    },
    inheritanceModalInitData: {
        showModal: false,
        initData: {}
    }
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
        // 자바소스 팝업 호출
        case SHOW_MODAL_SOURCE:
            return {
                ...state,
                javaSourceModalInitData: {
                    showModal: true,
                    initData: {...action.payload}
                }
            };
        case HIDE_MODAL_SOURCE:
            return {
                ...state,
                javaSourceModalInitData: {
                    showModal: false,
                    initData: {}
                }
            };
        // 어노테이션 팝업
        case SHOW_MODAL_ANNOTATION:
            return {
                ...state,
                annotationModalInitData: {
                    showModal: true,
                    initData: {...action.payload}
                }
            };
        case HIDE_MODAL_ANNOTATION:
            return {
                ...state,
                annotationModalInitData: {
                    showModal: false,
                    initData: {}
                }
            };
        // 어노테이션 팝업
        case SHOW_MODAL_COMMENT:
            return {
                ...state,
                commentModalInitData: {
                    showModal: true,
                    initData: {...action.payload}
                }
            };
        case HIDE_MODAL_COMMENT:
            return {
                ...state,
                commentModalInitData: {
                    showModal: false,
                    initData: {}
                }
            };

        case SHOW_MODAL_INHERITANCE:
            return {
                ...state,
                inheritanceModalInitData: {
                    showModal: true,
                    initData: {...action.payload}
                }
            };
        case HIDE_MODAL_INHERITANCE:
            return {
                ...state,
                inheritanceModalInitData: {
                    showModal: false,
                    initData: {}
                }
            };
        default:
            return state;
    }
}
