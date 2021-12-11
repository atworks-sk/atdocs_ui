/* eslint-disable import/prefer-default-export */
import axios from 'axios';

/*
 * project list 조회
 */
export const searchProjectList = async ({
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

/*
 * project 등록/수정 API
 */
export const saveProject = async ({id, projectName, packageName}) => {
    const response = await axios.put('/project/save', {
        id,
        projectName,
        packageName
    });
    return response;
};

/*
 * project 삭제 API
 */
export const deleteProject = async ({id}) => {
    const response = await axios.delete(`/project/delete/${id}`);
    return response;
};
