/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import {takeLatest, takeEvery} from 'redux-saga/effects';
import * as WorkApi from '../api/workApi';
import {
    reducerUtils,
    handleAsyncActions,
    createPromiseSaga
} from '../lib/asyncUtils';

// dashboard Same-day test results (searchDayTestResult)
const PREFIX = 'WORK';

/*
 * WORK 등록/수정 팝업
 * SHOW : showModalWorkSave (SHOW_MODAL_WORK_SAVE)
 * HIDE : hideModalWorkSave (HIDE_MODAL_WORK_SAVE)
 */
const SHOW_MODAL_WORK_SAVE = `${PREFIX}/SHOW_MODAL_WORK_SAVE`; // WORK 등록/수정 팝업
const HIDE_MODAL_WORK_SAVE = `${PREFIX}/HIDE_MODAL_WORK_SAVE`; // WORK 등록/수정 팝업

export const showModalWorkSave = (initData) => ({
    type: SHOW_MODAL_WORK_SAVE,
    payload: {
        ...initData
    }
});

export const hideModalWorkSave = () => ({
    type: HIDE_MODAL_WORK_SAVE
});

/*
 * work 등록/수정 프로세스
 * 전문 호출  : saveProject (SAVE_WORK)
 * 전문 초기화 : saveProjectClear (SAVE_WORK_CLEAR)
 */
const SAVE_WORK = `${PREFIX}/SAVE_WORK`; // 요청 시작
const SAVE_WORK_SUCCESS = `${PREFIX}/SAVE_WORK_SUCCESS`; // 요청 성공
const SAVE_WORK_ERROR = `${PREFIX}/SAVE_WORK_ERROR`; // 요청 실패
const SAVE_WORK_CLEAR = `${PREFIX}/SAVE_WORK_CLEAR`; // 조회 결과 초기화

export const saveWork = (saveData) => ({
    type: SAVE_WORK,
    payload: {
        ...saveData
    }
});

export const saveWorkClear = () => ({
    type: SAVE_WORK_CLEAR
});

/*
 * search Works
 * 조회 : searchWorks (SEARCH_WORKS)
 * 초기화 : searchWorksClear (SEARCH_WORKS_CLEAR)
 * Form 데이터 설정 : searchProjectListSetForm (SEARCH_PROJECT_LIST_SET_FORM)
 * Form 초기값 조회 : searchProjectListFormInitData
 */
const SEARCH_WORKS = `${PREFIX}/SEARCH_WORKS`; // 요청 시작
const SEARCH_WORKS_SUCCESS = `${PREFIX}/SEARCH_WORKS_SUCCESS`; // 요청 성공
const SEARCH_WORKS_ERROR = `${PREFIX}/SEARCH_WORKS_ERROR`; // 요청 실패
const SEARCH_WORKS_CLEAR = `${PREFIX}/SEARCH_WORKS_CLEAR`; // 조회 결과 초기화
const SEARCH_WORKS_SET_FORM = `${PREFIX}/SEARCH_WORKS_SET_FORM`;

export const searchWorks = (searchForm) => ({
    type: SEARCH_WORKS,
    payload: searchForm
});
export const searchWorksClear = () => ({
    type: SEARCH_WORKS_CLEAR
});

export const searchWorksSetForm = (searchWorksForm) => ({
    type: SEARCH_WORKS_SET_FORM,
    payload: {
        searchWorksForm
    }
});
export const searchWorksFormInitData = () => {
    return {
        projectId: -1,
        workName: '',
        page: 1,
        size: 5
    };
};

/*
 * WORK 삭제 프로세스
 * WORK 삭제  : deleteWork (DELETE_WORK)
 * WORK 삭제 초기화 : deleteProjectClear (DELETE_WORK_CLEAR)
 */
const DELETE_WORK = `${PREFIX}/DELETE_WORK`; // 요청 시작
const DELETE_WORK_SUCCESS = `${PREFIX}/DELETE_WORK_SUCCESS`; // 요청 성공
const DELETE_WORK_ERROR = `${PREFIX}/DELETE_WORK_ERROR`; // 요청 실패
const DELETE_WORK_CLEAR = `${PREFIX}/DELETE_WORK_CLEAR`; // 조회 결과 초기화

export const deleteWork = (id) => ({
    type: DELETE_WORK,
    payload: {
        id
    }
});
export const deleteWorkClear = () => ({
    type: DELETE_WORK_CLEAR
});

/*
 * projectSaga
 */
export function* workSaga() {
    yield takeLatest(SAVE_WORK, createPromiseSaga(SAVE_WORK, WorkApi.saveWork));
    yield takeEvery(
        SEARCH_WORKS,
        createPromiseSaga(SEARCH_WORKS, WorkApi.searchWorks)
    );
    yield takeEvery(
        DELETE_WORK,
        createPromiseSaga(DELETE_WORK, WorkApi.deleteWork)
    );
}

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
    workSaveModalInitData: {
        showModal: false,
        initData: {}
    },
    saveWorksRes: reducerUtils.initial(),
    searchWorksForm: searchWorksFormInitData(),
    searchWorksRes: reducerUtils.initial(),
    deleteWorkRes: reducerUtils.initial()
};

export default function bulktest(state = initialState, action) {
    switch (action.type) {
        /*
         * WORK 등록/수정 팝업
         * SHOW : showModalWorkSave (SHOW_MODAL_WORK_SAVE)
         * HIDE : hideModalWorkSave (HIDE_MODAL_WORK_SAVE)
         */
        case SHOW_MODAL_WORK_SAVE:
            return {
                ...state,
                workSaveModalInitData: {
                    showModal: true,
                    initData: {...action.payload}
                }
            };
        case HIDE_MODAL_WORK_SAVE:
            return {
                ...state,
                workSaveModalInitData: {
                    showModal: false,
                    initData: {}
                }
            };

        /*
         * work 등록/수정 프로세스
         * 전문 호출  : saveProject (SAVE_WORK)
         * 전문 초기화 : saveProjectClear (SAVE_WORK_CLEAR)
         */
        case SAVE_WORK:
        case SAVE_WORK_SUCCESS:
        case SAVE_WORK_ERROR:
            return handleAsyncActions(
                SAVE_WORK,
                'saveWorksRes',
                true
            )(state, action);
        case SAVE_WORK_CLEAR:
            return {
                ...state,
                saveWorksRes: reducerUtils.initial()
            };
        /*
         * search Works
         * 조회 : searchWorks (SEARCH_WORKS)
         * 초기화 : searchWorksClear (SEARCH_WORKS_CLEAR)
         */
        case SEARCH_WORKS:
        case SEARCH_WORKS_SUCCESS:
        case SEARCH_WORKS_ERROR:
            return handleAsyncActions(
                SEARCH_WORKS,
                'searchWorksRes',
                true
            )(state, action);
        case SEARCH_WORKS_CLEAR:
            return {
                ...state,
                searchWorksRes: reducerUtils.initial()
            };
        case SEARCH_WORKS_SET_FORM:
            return {
                ...state,
                searchWorksForm: action.payload.searchWorksForm
            };

        /*
         * WORK 삭제 프로세스
         * WORK 삭제  : deleteWork (DELETE_WORK)
         * WORK 삭제 초기화 : deleteProjectClear (DELETE_WORK_CLEAR)
         */
        case DELETE_WORK:
        case DELETE_WORK_SUCCESS:
        case DELETE_WORK_ERROR:
            return handleAsyncActions(
                DELETE_WORK,
                'deleteWorkRes',
                true
            )(state, action);

        case DELETE_WORK_CLEAR:
            return {
                ...state,
                deleteWorkRes: reducerUtils.initial()
            };

        default:
            return state;
    }
}
