import React from 'react';
// import store from '@app/store/store';
// import {showLoading, hideLoading} from '@app/store/commonUi';
import {useTranslation} from 'react-i18next';
// const store = React.lazy(() => import('@app/store/store'));
// const {showLoading, hideLoading} = React.lazy(() =>
// import('@app/store/commonUi')
// );

// non thread safety
// javascript는 기본적으로 single thread 기반으로 돌아감.
// [Multi Thread 관련 참고주소]
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics
// https://webkit.org/blog/7846/concurrent-javascript-it-can-work/

// eslint-disable-next-line import/no-mutable-exports
export let showLoadingFlag = false;
let loadaingTaskCount = 0;

export const addPenndingLoadaingTask = () => {
    loadaingTaskCount += 1;
    showLoadingFlag = true;
};

export const releaseFinishLoadaingTask = () => {
    loadaingTaskCount -= 1;
    if (loadaingTaskCount === 0) {
        showLoadingFlag = false;
    }
};

/*
 * form error print 관련 내용
 */
export const printFormError = (formik, key) => {
    if (formik.touched[key] && formik.errors[key]) {
        // eslint-disable-next-line react/react-in-jsx-scope
        return <div style={{color: 'red'}}>{formik.errors[key]}</div>;
    }
    return null;
};

export const getCurrentLang = () => {
    // const {t, i18n} = useTranslation();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {i18n} = useTranslation();
    return i18n.language;
};
export const getInputValidMsg = (key) => {
    // const {t, i18n} = useTranslation();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let tempKey = key;
    if (key === '') {
        tempKey = '값';
    }

    if (getCurrentLang() === 'en') {
        return `Enter a(n) ${tempKey}.`;
    }
    // 0 = 받침 없음, 그 외 = 받침 있음
    const finalChrCode = key.charCodeAt(key.length - 1);
    const finalConsonantCode = (finalChrCode - 44032) % 28;
    return ` ${tempKey}${finalConsonantCode !== 0 ? '을' : '를'} 입력하세요.`;
};

export const getSelectValidMsg = (key) => {
    let tempKey = key;
    if (key === '') {
        tempKey = '값';
    }

    if (getCurrentLang() === 'en') {
        return `Enter a(n) ${tempKey}.`;
    }
    // 0 = 받침 없음, 그 외 = 받침 있음
    const finalChrCode = key.charCodeAt(key.length - 1);
    const finalConsonantCode = (finalChrCode - 44032) % 28;
    return ` ${tempKey}${finalConsonantCode !== 0 ? '을' : '를'} 선택하세요.`;
};

export const getInputMinMsg = (count) => {
    if (getCurrentLang() === 'en') {
        // Must be 5 characters or more
        return `Must be ${count} characters or more.`;
    }

    return `${count}자 이상이어야 합니다.`;
};

export const getErrorMsg = (errorRes, type) => {
    let returnMsg = '';
    // server에서 내려온 데이터가 있는 경우 처리
    if (
        errorRes &&
        errorRes.response &&
        errorRes.response.data &&
        errorRes.response.data.message
    ) {
        returnMsg = errorRes.response.data.message;
    } else if (type === 'search') {
        returnMsg = '정상적으로 조회되지 않았습니다.';
    } else if (type === 'save') {
        returnMsg = '정상적으로 저장되지 않았습니다.';
    } else {
        returnMsg = type;
    }

    if (errorRes && errorRes.response && errorRes.response.statusText) {
        returnMsg += `\n${errorRes.response.statusText}`;
    }
    if (errorRes && errorRes.response && errorRes.response.status) {
        returnMsg += ` [${errorRes.response.status}]`;
    }

    return returnMsg;
};
