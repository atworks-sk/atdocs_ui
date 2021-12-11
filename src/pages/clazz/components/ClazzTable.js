/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {FaSearch, FaTrash} from 'react-icons/fa';
import {Button, Spinner, Table} from '@components';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {searchClazzList} from '../../../store/clazzStore';
import {getErrorMsg} from '../../../lib/commonUiUtils';
/*
 * Project 검색조건 Contanier
 */
const ClazzTable = () => {
    const dispatch = useDispatch();

    const {data: searchList} = useSelector(
        (state) => state.clazz.searchClazzListRes
    );
    const {searchClazzListForm: searchForm} = useSelector(
        (state) => state.clazz
    );

    const movePage = (page) => {
        const searchFormT = {...searchForm};
        searchFormT.page = page;
        // dispatch(searchProjectListSetForm(searchFormT));
        dispatch(searchClazzList(searchFormT));
    };

    const onClickChange = (row) => {
        const initData = row;
        // dispatch(showModalProjectUpdate(initData));
    };

    const onClickDelete = (row) => {
        // dispatch(deleteProject(row.id));
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
            title: '패키지 명',
            key: 'packageName'
        },
        {
            title: '메서드 건수',
            key: 'snapshotCnt',
            render: (id, row, column) => {
                return `${row.methodCnt} 건`;
            }
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
                        {/* <Button theme="link" onClick={() => onClickDelete(row)}>
                            <FaTrash />
                        </Button> */}
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

export default ClazzTable;