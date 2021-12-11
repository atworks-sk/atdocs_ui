/* eslint-disable import/prefer-default-export */
import axios from 'axios';

/*
 * project list 조회
 */
export const searchProjectListWithoutPage = async () => {
    const response = await axios.get(
        '/project/searchListWithoutPage?sort=id,asc'
    );
    return response;
};
