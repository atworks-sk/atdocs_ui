/* eslint-disable import/prefer-default-export */
import axios from 'axios';

/*
 * method list 조회
 */
export const searchSnapshotList = async ({
    projectId = -1,
    page = 1,
    size = 10
}) => {
    const response = await axios.get(
        `/snapshot/searchList?sort=id,desc&projectId=${projectId}&page=${
            page - 1
        }&size=${size}`
    );
    return response;
};
