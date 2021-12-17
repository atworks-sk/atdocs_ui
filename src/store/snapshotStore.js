/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import {takeLatest, takeEvery} from 'redux-saga/effects';
import * as snapshotApi from '../api/snapshotApi';
import {
    reducerUtils,
    handleAsyncActions,
    createPromiseSaga
} from '../lib/asyncUtils';

// dashboard Same-day test results (searchDayTestResult)
const PREFIX = 'SNAPSHOT';

/*
 * snapshot 리스트 조회
 * 리스트 조회 : searchSnapshotList (SEARCH_SNAPSHOT_LIST)
 * 리스트 초기화 : searchSnapshotListClear (SEARCH_SNAPSHOT_LIST_CLEAR)
 * Form 데이터 설정 : searchSnapshotListSetForm (SEARCH_SNAPSHOT_LIST_SET_FORM)
 * Form 초기값 조회 : searchSnapshotListFormInitData
 */
const SEARCH_SNAPSHOT_LIST = `${PREFIX}/SEARCH_SNAPSHOT_LIST`; // 요청 시작
const SEARCH_SNAPSHOT_LIST_SUCCESS = `${PREFIX}/SEARCH_SNAPSHOT_LIST_SUCCESS`; // 요청 성공
const SEARCH_SNAPSHOT_LIST_ERROR = `${PREFIX}/SEARCH_SNAPSHOT_LIST_ERROR`; // 요청 실패
const SEARCH_SNAPSHOT_LIST_CLEAR = `${PREFIX}/SEARCH_SNAPSHOT_LIST_CLEAR`; // 조회 결과 초기화
const SEARCH_SNAPSHOT_LIST_SET_FORM = `${PREFIX}/SEARCH_SNAPSHOT_LIST_SET_FORM`;

export const searchSnapshotList = (searchForm) => ({
    type: SEARCH_SNAPSHOT_LIST,
    payload: searchForm
});
export const searchSnapshotListClear = () => ({
    type: SEARCH_SNAPSHOT_LIST_CLEAR
});
export const searchSnapshotListSetForm = (searchSnapshotListForm) => ({
    type: SEARCH_SNAPSHOT_LIST_SET_FORM,
    payload: {
        searchSnapshotListForm
    }
});
export const searchSnapshotListFormInitData = () => {
    return {
        projectId: '',
        page: 1,
        size: 10
    };
};

/*
 * 스냅샷 삭제 프로세스
 * 스냅샷 삭제  : deleteSnapshot (DELETE_SNAPSHOT)
 * 스냅샷 삭제 초기화 : deleteSnapshotClear (DELETE_SNAPSHOT_CLEAR)
 */
const DELETE_SNAPSHOT = `${PREFIX}/DELETE_SNAPSHOT`; // 요청 시작
const DELETE_SNAPSHOT_SUCCESS = `${PREFIX}/DELETE_SNAPSHOT_SUCCESS`; // 요청 성공
const DELETE_SNAPSHOT_ERROR = `${PREFIX}/DELETE_SNAPSHOT_ERROR`; // 요청 실패
const DELETE_SNAPSHOT_CLEAR = `${PREFIX}/DELETE_SNAPSHOT_CLEAR`; // 조회 결과 초기화

export const deleteSnapshot = (id) => ({
    type: DELETE_SNAPSHOT,
    payload: {
        id
    }
});
export const deleteSnapshotClear = () => ({
    type: DELETE_SNAPSHOT_CLEAR
});

/*
 * SNAPSHOT 등록 팝업
 * SHOW : showModalSnapshotUpdate (SHOW_MODAL_SNAPSHOT_UPDATE)
 * HIDE : hideModalSnapshotUpdate (HIDE_MODAL_SNAPSHOT_UPDATE)
 */
const SHOW_MODAL_SNAPSHOT_UPDATE = `${PREFIX}/SHOW_MODAL_SNAPSHOT_UPDATE`; // SNAPSHOT 등록 팝업 호출
const HIDE_MODAL_SNAPSHOT_UPDATE = `${PREFIX}/HIDE_MODAL_SNAPSHOT_UPDATE`; // SNAPSHOT 등록 팝업 호출

export const showModalSnapshotUpdate = () => ({
    type: SHOW_MODAL_SNAPSHOT_UPDATE
});

export const hideModalSnapshotUpdate = () => ({
    type: HIDE_MODAL_SNAPSHOT_UPDATE
});

/*
 * snapshot 등록/수정작업
 * snapshot 수정  : createSnapshot (CREATE_SNAPSHOT)
 * snapshot 수정 초기화 : createSnapshotClear (CREATE_SNAPSHOT_CLEAR)
 */
const CREATE_SNAPSHOT = `${PREFIX}/CREATE_SNAPSHOT`; // 요청 시작
const CREATE_SNAPSHOT_SUCCESS = `${PREFIX}/CREATE_SNAPSHOT_SUCCESS`; // 요청 성공
const CREATE_SNAPSHOT_ERROR = `${PREFIX}/CREATE_SNAPSHOT_ERROR`; // 요청 실패
const CREATE_SNAPSHOT_CLEAR = `${PREFIX}/CREATE_SNAPSHOT_CLEAR`; // 조회 결과 초기화

export const createSnapshot = (createData) => ({
    type: CREATE_SNAPSHOT,
    payload: {
        ...createData
    }
});
export const createSnapshotClear = () => ({
    type: CREATE_SNAPSHOT_CLEAR
});

/*
 * snapshotSaga
 */
export function* snapshotSaga() {
    yield takeLatest(
        SEARCH_SNAPSHOT_LIST,
        createPromiseSaga(SEARCH_SNAPSHOT_LIST, snapshotApi.searchSnapshotList)
    );
    yield takeEvery(
        DELETE_SNAPSHOT,
        createPromiseSaga(DELETE_SNAPSHOT, snapshotApi.deleteSnapshot)
    );
    yield takeEvery(
        CREATE_SNAPSHOT,
        createPromiseSaga(CREATE_SNAPSHOT, snapshotApi.createSnapshot)
    );
}

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
    searchSnapshotListForm: searchSnapshotListFormInitData(),
    searchSnapshotListRes: reducerUtils.initial(),
    deleteSnapshotRes: reducerUtils.initial(),
    createSnapshotRes: reducerUtils.initial(),
    // 프로젝트 등록/수정 팝업 호출
    snapshotUpdateModalInitData: {
        showModal: false,
        initData: {}
    }
};

export default function bulktest(state = initialState, action) {
    switch (action.type) {
        // snapshot 리스트 검색
        case SEARCH_SNAPSHOT_LIST:
        case SEARCH_SNAPSHOT_LIST_SUCCESS:
        case SEARCH_SNAPSHOT_LIST_ERROR:
            return handleAsyncActions(
                SEARCH_SNAPSHOT_LIST,
                'searchSnapshotListRes',
                true
            )(state, action);
        case SEARCH_SNAPSHOT_LIST_CLEAR:
            return {
                ...state,
                searchSnapshotListRes: reducerUtils.initial()
            };
        case SEARCH_SNAPSHOT_LIST_SET_FORM:
            return {
                ...state,
                searchSnapshotListForm: action.payload.searchSnapshotListForm
            };

        // snapshot 삭제
        case DELETE_SNAPSHOT:
        case DELETE_SNAPSHOT_SUCCESS:
        case DELETE_SNAPSHOT_ERROR:
            return handleAsyncActions(
                DELETE_SNAPSHOT,
                'deleteSnapshotRes',
                true
            )(state, action);

        case DELETE_SNAPSHOT_CLEAR:
            return {
                ...state,
                deleteSnapshotRes: reducerUtils.initial()
            };

        // snapshot 등록/수정 팝업 호출
        case SHOW_MODAL_SNAPSHOT_UPDATE:
            return {
                ...state,
                snapshotUpdateModalInitData: {
                    showModal: true
                }
            };
        case HIDE_MODAL_SNAPSHOT_UPDATE:
            return {
                ...state,
                snapshotUpdateModalInitData: {
                    showModal: false
                }
            };
        // snapshot 수정
        case CREATE_SNAPSHOT:
        case CREATE_SNAPSHOT_SUCCESS:
        case CREATE_SNAPSHOT_ERROR:
            return handleAsyncActions(
                CREATE_SNAPSHOT,
                'createSnapshotRes',
                true
            )(state, action);
        // snapshot 수정 초기화
        case CREATE_SNAPSHOT_CLEAR:
            return {
                ...state,
                createSnapshotRes: reducerUtils.initial()
            };

        default:
            return state;
    }
}
