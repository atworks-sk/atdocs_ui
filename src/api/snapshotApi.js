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

/*
 * Snapshot 추가 (비동기 방식)
 */
export const createSnapshot = async ({projectId, dirPath}) => {
    const response = await axios.post('/snapshot/create', {
        projectId,
        dirPath
    });
    return response;
};

/*
 * Snapshot 삭제 API
 */
export const deleteSnapshot = async ({id}) => {
    const response = await axios.delete(`/snapshot/delete/${id}`);
    return response;
};
