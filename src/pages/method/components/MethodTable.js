/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {FaSearch, FaTrash} from 'react-icons/fa';
import {Button, Spinner, Table} from '@components';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {
    searchMethodList,
    searchMethodListSetForm
} from '../../../store/methodStore';
import {getErrorMsg} from '../../../lib/commonUiUtils';
/*
 * Project 검색조건 Contanier
 */
const MethodTable = () => {
    const dispatch = useDispatch();

    const {data: searchList} = useSelector(
        (state) => state.method.searchMethodListRes
    );
    const {searchMethodListForm: searchForm} = useSelector(
        (state) => state.method
    );

    const movePage = (page) => {
        const searchFormT = {...searchForm};
        searchFormT.page = page;
        dispatch(searchMethodListSetForm(searchFormT));
        dispatch(searchMethodList(searchFormT));
    };

    const onClickChange = (row) => {
        const initData = row;
        // dispatch(showModalProjectUpdate(initData));
    };

    const columns = [
        {
            title: '프로젝트 명',
            key: 'projectName'
        },
        {
            title: '클래스 명',
            key: 'clazzName'
        },
        {
            title: '접근제한자',
            key: 'accessSpecifier'
        },
        {
            title: '매서드 명',
            key: 'methodName'
        },
        {
            title: '생성일자',
            key: 'createDateTime'
        },
        {
            title: '',
            key: 'button',
            // eslint-disable-next-line no-unused-vars
            render: (id, row, column) => {
                return (
                    <>
                        <Button theme="link" onClick={() => onClickChange(row)}>
                            <FaSearch />
                        </Button>
                    </>
                );
            }
        }
    ];

    return (
        <>
            {/* <Spinner isLoading={deleteLoading} /> */}
            <Table
                tableName="조회 결과"
                onDoubleClick={(id, row) => {
                    onClickChange(row);
                }}
                movePage={movePage}
                rowKey="id"
                columns={columns}
                data={searchList}
            />
        </>
    );
};

export default MethodTable;
