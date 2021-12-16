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
 * snapshotSaga
 */
export function* snapshotSaga() {
    yield takeLatest(
        SEARCH_SNAPSHOT_LIST,
        createPromiseSaga(SEARCH_SNAPSHOT_LIST, snapshotApi.searchSnapshotList)
    );
}

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
    searchSnapshotListForm: searchSnapshotListFormInitData(),
    searchSnapshotListRes: reducerUtils.initial()
};

export default function bulktest(state = initialState, action) {
    switch (action.type) {
        // 매서드 리스트 검색
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

        default:
            return state;
    }
}
