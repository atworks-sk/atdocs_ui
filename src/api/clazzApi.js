/* eslint-disable import/prefer-default-export */
import axios from 'axios';

/*
 * project list 조회
 */
export const searchClazzList = async ({
    clazzName,
    projectId = -1,
    page = 1,
    size = 10
}) => {
    const response = await axios.get(
        `/clazz/searchList?sort=id,asc&projectId=${projectId}&clazzName=${clazzName}&page=${
            page - 1
        }&size=${size}`
    );
    return response;
};

/*
 * project detail 조회
 */
export const searchClazzDetail = async ({id}) => {
    const response = await axios.get(`/clazz/searchDetail/${id}`);
    return response;
};
