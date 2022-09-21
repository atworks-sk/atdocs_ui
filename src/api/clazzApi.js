/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const searchClazzes = async ({
    clazzName,
    projectId = -1,
    page = 1,
    size = 10
}) => {
    const response = await axios.get(
        `/clazz?projectId=${projectId}&clazzName=${clazzName}&sort=id,asc&page=${
            page - 1
        }&size=${size}`
    );
    return response;
};

// /*
//  * clazz detail 조회
//  */
export const searchClazz = async ({id}) => {
    const response = await axios.get(`/clazz/clazz_id/${id}`);
    return response;
};
