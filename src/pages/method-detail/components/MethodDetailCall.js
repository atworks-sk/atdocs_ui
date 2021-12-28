/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {Form} from 'react-bootstrap';
import {Button, Table} from '@components';
import {useSelector, useDispatch} from 'react-redux';
import {searchClazzDetail} from '../../../store/clazzStore';

/*
 * Project 검색조건 Contanier
 */
const MethodDetailCall = () => {
    const dispatch = useDispatch();

    const {data: searchDetail} = useSelector(
        (state) => state.method.searchMethodDetailRes
    );

    const onClickChange = (id) => {
        dispatch(searchClazzDetail(id));
    };

    const renderTableData = () => {
        if (!searchDetail) {
            return {data: {content: []}};
        }
        const temp = {data: {content: searchDetail.data.callList}};
        return temp;
    };

    const columns = [
        {
            title: 'scope',
            key: 'scope'
        },
        {
            title: 'name',
            key: 'name'
        },
        {
            title: 'argumentCnt',
            key: 'argumentCnt'
        }
    ];

    return (
        <>
            {/* <Spinner isLoading={deleteLoading} /> */}
            <Table
                tableName="호출 함수"
                // onDoubleClick={(id, row) => {
                //     onClickChange(row);
                // }}
                // movePage={movePage}
                rowKey="id"
                columns={columns}
                disablePageView
                data={renderTableData()}
            />
        </>
    );
};

export default MethodDetailCall;
