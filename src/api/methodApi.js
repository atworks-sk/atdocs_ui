/* eslint-disable import/prefer-default-export */
import axios from 'axios';

/*
 * method list 조회
 */
export const searchMethodList = async ({
    methodName,
    projectId = -1,
    page = 1,
    size = 10
}) => {
    const response = await axios.get(
        `/method/searchList?sort=id,asc&projectId=${projectId}&methodName=${methodName}&page=${
            page - 1
        }&size=${size}`
    );
    return response;
};

/*
 * method detail 조회
 */
export const searchMethodDetail = async ({id}) => {
    const response = await axios.get(`/method/searchDetail/${id}`);
    return response;
};
