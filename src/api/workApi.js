/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line no-unused-vars
import axios from 'axios';

/*
 * work 등록/수정 API
 */
export const saveWork = async ({id, projectId, workName, packagePath}) => {
    const response = await axios.put('/work', {
        id,
        projectId,
        workName,
        packagePath
    });
    return response;
};

export const searchWorks = async ({
    projectId = -1,
    workName = '',
    page = 1,
    size = 5
}) => {
    const response = await axios.get(
        `/work/project-id/${projectId}?workName=${workName}&sort=id,asc&page=${
            page - 1
        }&size=${size}`
    );
    return response;
};

/*
 * project 삭제 API
 */
export const deleteWork = async ({id}) => {
    const response = await axios.delete(`/work/${id}`);
    return response;
};
