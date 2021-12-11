/* eslint-disable import/prefer-default-export */
import axios from 'axios';

/*
 * project list 조회
 */
export const searchClazzList = async ({page = 1, size = 10}) => {
    const response = await axios.get(
        `/clazz/searchList?sort=id,asc&page=${page - 1}&size=${size}`
    );
    return response;
};
