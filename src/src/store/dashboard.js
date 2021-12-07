/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import {takeLatest, takeEvery} from 'redux-saga/effects';
import * as dashboardAPI from '../api/dashboard';
import {
    reducerUtils,
    handleAsyncActions,
    createPromiseSaga
} from '../lib/asyncUtils';

// dashboard Same-day test results (searchDayTestResult)
const SEARCH_DAY_TESTRESULT = 'dashboard/SEARCH_DAY_TESTRESULT'; // 요청 시작
const SEARCH_DAY_TESTRESULT_SUCCESS = 'dashboard/SEARCH_DAY_TESTRESULT_SUCCESS'; // 요청 성공
const SEARCH_DAY_TESTRESULT_ERROR = 'dashboard/SEARCH_DAY_TESTRESULT_ERROR'; // 요청 실패

// dashboard Number of tests per server (searchServerTestCnt)
const SEARCH_SERVER_TESTCNT = 'dashboard/SEARCH_SERVER_TESTCNT'; // 요청 시작
const SEARCH_SERVER_TESTCNT_SUCCESS = 'dashboard/SEARCH_SERVER_TESTCNT_SUCCESS'; // 요청 성공
const SEARCH_SERVER_TESTCNT_ERROR = 'dashboard/SEARCH_SERVER_TESTCNT_ERROR'; // 요청 실패

// Server test Fail rate (searchFailRate)
const SEARCH_FAIL_RATE = 'dashboard/SEARCH_FAIL_RATE'; // 요청 시작
const SEARCH_FAIL_RATE_SUCCESS = 'dashboard/SEARCH_FAIL_RATE_SUCCESS'; // 요청 성공
const SEARCH_FAIL_RATE_ERROR = 'dashboard/SEARCH_FAIL_RATE_ERROR'; // 요청 실패

/*
 * dashboard Same-day test results (searchDayTestResult)
 */
export const searchDayTestResult = (searchDate) => ({
    type: SEARCH_DAY_TESTRESULT,
    payload: {
        searchDate
    }
});

const searchDayTestResultSaga = createPromiseSaga(
    SEARCH_DAY_TESTRESULT,
    dashboardAPI.searchDayTestResult
);

/*
 * dashboard Number of tests per server (searchServerTestCnt)
 */
export const searchServerTestCnt = (searchDate) => ({
    type: SEARCH_SERVER_TESTCNT,
    payload: {
        searchDate
    }
});

const searchServerTestCntSaga = createPromiseSaga(
    SEARCH_SERVER_TESTCNT,
    dashboardAPI.searchServerTestCnt
);

/*
 * Server test Fail rate (searchFailRate)
 */
export const searchFailRate = (searchDate, searchServer) => ({
    type: SEARCH_FAIL_RATE,
    payload: {
        searchDate,
        searchServer
    }
});

const searchFailRateSaga = createPromiseSaga(
    SEARCH_FAIL_RATE,
    dashboardAPI.searchFailRate
);

// 공통 영역 ...
// 사가들을 합치기
export function* dashboardSaga() {
    yield takeLatest(SEARCH_DAY_TESTRESULT, searchDayTestResultSaga);
    yield takeLatest(SEARCH_SERVER_TESTCNT, searchServerTestCntSaga);
    yield takeLatest(SEARCH_FAIL_RATE, searchFailRateSaga);
}

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
    searchDayTestResult: reducerUtils.initial(),
    searchServerTestCnt: reducerUtils.initial(),
    searchFailRate: reducerUtils.initial()
};

export default function bulktest(state = initialState, action) {
    switch (action.type) {
        // dashboard Same-day test results
        case SEARCH_DAY_TESTRESULT:
        case SEARCH_DAY_TESTRESULT_SUCCESS:
        case SEARCH_DAY_TESTRESULT_ERROR:
            return handleAsyncActions(
                SEARCH_DAY_TESTRESULT,
                'searchDayTestResult',
                true
            )(state, action);

        // dashboard Same-day test results
        case SEARCH_SERVER_TESTCNT:
        case SEARCH_SERVER_TESTCNT_SUCCESS:
        case SEARCH_SERVER_TESTCNT_ERROR:
            return handleAsyncActions(
                SEARCH_SERVER_TESTCNT,
                'searchServerTestCnt',
                true
            )(state, action);

        // dashboard Same-day test results
        case SEARCH_FAIL_RATE:
        case SEARCH_FAIL_RATE_SUCCESS:
        case SEARCH_FAIL_RATE_ERROR:
            return handleAsyncActions(
                SEARCH_FAIL_RATE,
                'searchFailRate',
                true
            )(state, action);

        default:
            return state;
    }
}
