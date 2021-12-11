/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import {takeLatest, takeEvery} from 'redux-saga/effects';
import * as projectApi from '../api/projectApi';
import {
    reducerUtils,
    handleAsyncActions,
    createPromiseSaga
} from '../lib/asyncUtils';

// dashboard Same-day test results (searchDayTestResult)
const PREFIX = 'PROJECT';

/*
 * 프로젝트 리스트 조회
 * 리스트 조회 : searchProjectList (SEARCH_PROJECT_LIST)
 * 리스트 초기화 : searchProjectListClear (SEARCH_PROJECT_LIST_CLEAR)
 * Form 데이터 설정 : searchProjectListSetForm (SEARCH_PROJECT_LIST_SET_FORM)
 * Form 초기값 조회 : searchProjectListFormInitData
 */
const SEARCH_PROJECT_LIST = `${PREFIX}/SEARCH_PROJECT_LIST`; // 요청 시작
const SEARCH_PROJECT_LIST_SUCCESS = `${PREFIX}/SEARCH_PROJECT_LIST_SUCCESS`; // 요청 성공
const SEARCH_PROJECT_LIST_ERROR = `${PREFIX}/SEARCH_PROJECT_LIST_ERROR`; // 요청 실패
const SEARCH_PROJECT_LIST_CLEAR = `${PREFIX}/SEARCH_PROJECT_LIST_CLEAR`; // 조회 결과 초기화
const SEARCH_PROJECT_LIST_SET_FORM = `${PREFIX}/SEARCH_PROJECT_LIST_SET_FORM`;

/*
 * 프로젝트 등록/수정 팝업
 * SHOW : showModalProjectUpdate (SHOW_MODAL_PROJECT_UPDATE)
 * HIDE : hideModalProjectUpdate (HIDE_MODAL_PROJECT_UPDATE)
 */
const SHOW_MODAL_PROJECT_UPDATE = `${PREFIX}/SHOW_MODAL_PROJECT_UPDATE`; // 프로젝트 등록/수정 팝업 호출
const HIDE_MODAL_PROJECT_UPDATE = `${PREFIX}/HIDE_MODAL_PROJECT_UPDATE`; // 프로젝트 등록/수정 팝업 호출

/*
 * 프로젝트 수정 프로세스
 * 프로젝트 수정  : saveProject (SAVE_PROJECT)
 * 프로젝트 수정 초기화 : saveProjectClear (SAVE_PROJECT_CLEAR)
 */
const SAVE_PROJECT = `${PREFIX}/SAVE_PROJECT`; // 요청 시작
const SAVE_PROJECT_SUCCESS = `${PREFIX}/SAVE_PROJECT_SUCCESS`; // 요청 성공
const SAVE_PROJECT_ERROR = `${PREFIX}/SAVE_PROJECT_ERROR`; // 요청 실패
const SAVE_PROJECT_CLEAR = `${PREFIX}/SAVE_PROJECT_CLEAR`; // 조회 결과 초기화

/*
 * 프로젝트 삭제 프로세스
 * 프로젝트 삭제  : deleteProject (SAVE_PROJECT)
 * 프로젝트 삭제 초기화 : deleteProjectClear (SAVE_PROJECT_CLEAR)
 */
const DELETE_PROJECT = `${PREFIX}/DELETE_PROJECT`; // 요청 시작
const DELETE_PROJECT_SUCCESS = `${PREFIX}/DELETE_PROJECT_SUCCESS`; // 요청 성공
const DELETE_PROJECT_ERROR = `${PREFIX}/DELETE_PROJECT_ERROR`; // 요청 실패
const DELETE_PROJECT_CLEAR = `${PREFIX}/DELETE_PROJECT_CLEAR`; // 조회 결과 초기화

/*
 * 프로젝트 리스트 조회
 * 리스트 조회 : searchProjectList (SEARCH_PROJECT_LIST)
 * 리스트 초기화 : searchProjectListClear (SEARCH_PROJECT_LIST_CLEAR)
 * Form 데이터 설정 : searchProjectListSetForm (SEARCH_PROJECT_LIST_SET_FORM)
 * Form 초기값 조회 : searchProjectListFormInitData
 */
export const searchProjectList = (searchForm) => ({
    type: SEARCH_PROJECT_LIST,
    payload: searchForm
});
export const searchProjectListClear = () => ({
    type: SEARCH_PROJECT_LIST_CLEAR
});
export const searchProjectListSetForm = (searchProjectListForm) => ({
    type: SEARCH_PROJECT_LIST_SET_FORM,
    payload: {
        searchProjectListForm
    }
});
export const searchProjectListFormInitData = () => {
    return {
        projectName: '',
        page: 1,
        size: 10
    };
};

/*
 * 프로젝트 등록/수정 팝업
 * SHOW : showModalProjectUpdate (SHOW_MODAL_PROJECT_UPDATE)
 * HIDE : hideModalProjectUpdate (HIDE_MODAL_PROJECT_UPDATE)
 */
export const showModalProjectUpdate = (initData) => ({
    type: SHOW_MODAL_PROJECT_UPDATE,
    payload: {
        ...initData
    }
});

export const hideModalProjectUpdate = () => ({
    type: HIDE_MODAL_PROJECT_UPDATE
});

/*
 * 프로젝트 등록/수정작업
 * 프로젝트 수정  : saveProject (SAVE_PROJECT)
 * 프로젝트 수정 초기화 : saveProjectClear (SAVE_PROJECT_CLEAR)
 */
export const saveProject = (saveData) => ({
    type: SAVE_PROJECT,
    payload: {
        ...saveData
    }
});

export const saveProjectClear = () => ({
    type: SAVE_PROJECT_CLEAR
});

/*
 * 프로젝트 삭제 프로세스
 * 프로젝트 삭제  : deleteProject (SAVE_PROJECT)
 * 프로젝트 삭제 초기화 : deleteProjectClear (DELETE_PROJECT_CLEAR)
 */
export const deleteProject = (id) => ({
    type: DELETE_PROJECT,
    payload: {
        id
    }
});
export const deleteProjectClear = () => ({
    type: DELETE_PROJECT_CLEAR
});

/*
 * projectSaga
 */
export function* projectSaga() {
    yield takeLatest(
        SEARCH_PROJECT_LIST,
        createPromiseSaga(SEARCH_PROJECT_LIST, projectApi.searchProjectList)
    );
    yield takeEvery(
        SAVE_PROJECT,
        createPromiseSaga(DELETE_PROJECT, projectApi.saveProject)
    );
    yield takeEvery(
        DELETE_PROJECT,
        createPromiseSaga(DELETE_PROJECT, projectApi.deleteProject)
    );
}

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
    searchProjectListForm: searchProjectListFormInitData(),
    searchProjectListRes: reducerUtils.initial(),
    // 프로젝트 등록/수정 팝업 호출
    projectUpdateModalInitData: {
        showModal: false,
        initData: {}
    },
    saveProjectRes: reducerUtils.initial(),
    deleteProjectRes: reducerUtils.initial()
};

export default function bulktest(state = initialState, action) {
    switch (action.type) {
        // dashboard Same-day test results
        case SEARCH_PROJECT_LIST:
        case SEARCH_PROJECT_LIST_SUCCESS:
        case SEARCH_PROJECT_LIST_ERROR:
            return handleAsyncActions(
                SEARCH_PROJECT_LIST,
                'searchProjectListRes',
                true
            )(state, action);
        case SEARCH_PROJECT_LIST_CLEAR:
            return {
                ...state,
                searchProjectListRes: reducerUtils.initial()
            };
        case SEARCH_PROJECT_LIST_SET_FORM:
            return {
                ...state,
                searchProjectListForm: action.payload.searchProjectListForm
            };

        // 프로젝트 등록/수정 팝업 호출
        case SHOW_MODAL_PROJECT_UPDATE:
            return {
                ...state,
                projectUpdateModalInitData: {
                    showModal: true,
                    initData: {...action.payload}
                }
            };
        case HIDE_MODAL_PROJECT_UPDATE:
            return {
                ...state,
                projectUpdateModalInitData: {
                    showModal: false,
                    initData: {}
                }
            };

        // 프로젝트 수정
        case SAVE_PROJECT:
        case SAVE_PROJECT_SUCCESS:
        case SAVE_PROJECT_ERROR:
            return handleAsyncActions(
                SAVE_PROJECT,
                'saveProjectRes',
                true
            )(state, action);
        // 프로젝트 수정 초기화
        case SAVE_PROJECT_CLEAR:
            return {
                ...state,
                saveProjectRes: reducerUtils.initial()
            };

        // 프로젝트 삭제
        case DELETE_PROJECT:
        case DELETE_PROJECT_SUCCESS:
        case DELETE_PROJECT_ERROR:
            return handleAsyncActions(
                DELETE_PROJECT,
                'deleteProjectRes',
                true
            )(state, action);
        default:
            return state;
    }
}
