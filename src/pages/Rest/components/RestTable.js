/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {FaSearch, FaTrash} from 'react-icons/fa';
import {Button, Spinner, Table} from '@components';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {searchRestList, searchRestListSetForm} from '../../../store/restStore';
import {getErrorMsg} from '../../../lib/commonUiUtils';
/*
 * Project 검색조건 Contanier
 */
const MethodTable = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {data: searchList} = useSelector(
        (state) => state.rest.searchRestListRes
    );
    const {searchRestListForm: searchForm} = useSelector((state) => state.rest);

    const movePage = (page) => {
        const searchFormT = {...searchForm};
        searchFormT.page = page;
        dispatch(searchRestListSetForm(searchFormT));
        dispatch(searchRestList(searchFormT));
    };

    const onClickChange = (row) => {
        // history.push({
        //     pathname: '/method-detail',
        //     state: {
        //         id: row.id
        //     }
        // });
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
            title: '매서드 명',
            key: 'methodName'
        },
        {
            title: 'Url Path',
            key: 'urlPath'
        },
        {
            title: 'Http Method',
            key: 'httpMethod'
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
