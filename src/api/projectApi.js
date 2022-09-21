/* eslint-disable import/prefer-default-export */
import axios from 'axios';

/*
 * project list 조회
@GetMapping("/project-name-like/{projectName}")
 */
export const searchProjectList = async ({
    projectName = '',
    page = 1,
    size = 10
}) => {
    const response = await axios.get(
        `/project/project-name-like?sort=id,asc&projectName=${projectName}&page=${
            page - 1
        }&size=${size}`
    );
    return response;
};

export const searchProjectDetail = async ({projectId = -1}) => {
    const response = await axios.get(`/project/project-id/${projectId}`);
    return response;
};

/*
 * project 등록/수정 API
 */
export const saveProject = async ({id, projectName}) => {
    const response = await axios.put('/project', {
        id,
        projectName
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
