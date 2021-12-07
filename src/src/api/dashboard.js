/* eslint-disable import/prefer-default-export */

import axios from 'axios';

/*
 * dashboard Same-day test results
 */
export const searchDayTestResult = async ({searchDate}) => {
    const response = await axios.get(
        `/dashboard/search/dayTestResult/${searchDate}`
    );
    return response;
};

/*
 * dashboard Number of tests per server
 */
export const searchServerTestCnt = async ({searchDate}) => {
    const response = await axios.get(
        `/dashboard/search/serverTestCnt/${searchDate}`
    );
    return response;
};

/*
 * Server test Fail rate
 */
export const searchFailRate = async ({searchDate, searchServer}) => {
    const response = await axios.get(
        `/dashboard/search/searchFailRate/${searchDate}/${searchServer}`
    );
    return response;
};
