/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line no-unused-vars
import axios from 'axios';

/*
 * source 등록?
 */
export const addSource = async ({workId, sourcePath}) => {
    const response = await axios.post('/source', {
        workId,
        sourcePath
    });
    return response;
};

export const searchSources = async ({
    workId = -1,
    sourceName = '',
    sourceType = '',
    page = 1,
    size = 10
}) => {
    const response = await axios.get(
        `/source/work-id/${workId}?sourceName=${sourceName}&sourceType=${sourceType}&sort=id,asc&page=${
            page - 1
        }&size=${size}`
    );
    return response;
};

/*
 * project 삭제 API
 */
export const deleteSource = async ({id}) => {
    const response = await axios.delete(`/source/${id}`);
    return response;
};

export const searchSourceText = async ({sourceId = -1}) => {
    const response = await axios.get(`/source/work-id-text/${sourceId}`);
    return response;
};
