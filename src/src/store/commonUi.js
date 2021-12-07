/* eslint-disable indent */
/*
 * UI Control을 위한 공통 Store
 * 의존성때문에 common.js와 별도로 분리함. (asyncUtils.js를 호출하는 로직 미포함)
 */

// 프로그래스 바
const SHOW_LOADING = 'commonUI/SHOW_LOADING'; // 요청 시작
const HIDE_LOADING = 'common/HIDE_LOADING'; // 요청 성공

export const showLoading = () => ({
    type: SHOW_LOADING
});

export const hideLoading = () => ({
    type: HIDE_LOADING
});

// 사가들을 합치기
// export function* commonUISaga() {}

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
    showLoading: false
};

export default function commonUI(state = initialState, action) {
    switch (action.type) {
        case SHOW_LOADING:
            return {
                ...state,
                showLoading: true
            };

        case HIDE_LOADING:
            return {
                ...state,
                showLoading: false
            };
        default:
            return state;
    }
}
