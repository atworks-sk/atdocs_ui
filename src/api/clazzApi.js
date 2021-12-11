/* eslint-disable import/prefer-default-export */
import axios from 'axios';

/*
 * project list 조회
 */
export const searchClazzList = async ({
    projectName = '',
    page = 1,
    size = 10
}) => {
    const response = await axios.get(
        `/project/searchList?sort=id,asc&projectName=${projectName}&page=${
            page - 1
        }&size=${size}`
    );
    return response;
};
