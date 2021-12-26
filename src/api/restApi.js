/* eslint-disable import/prefer-default-export */
import axios from 'axios';

/*
 * api list 조회
 */
export const searchRestList = async ({
    urlPath,
    projectId = -1,
    page = 1,
    size = 10
}) => {
    const response = await axios.get(
        `/rest/searchList?sort=id,asc&projectId=${projectId}&urlPath=${urlPath}&page=${
            page - 1
        }&size=${size}`
    );
    return response;
};
