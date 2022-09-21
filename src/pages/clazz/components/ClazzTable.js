/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {FaSearch, FaTrash} from 'react-icons/fa';
import {useHistory} from 'react-router-dom';
import {Button, Spinner, Table} from '@components';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {searchClazzes, searchClazzesSetForm} from '../../../store/clazzStore';
import {getErrorMsg} from '../../../lib/commonUiUtils';
/*
 * Project 검색조건 Contanier
 */
const ClazzTable = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {data: searchList} = useSelector(
        (state) => state.clazz.searchClazzesRes
    );
    const {searchClazzesForm: searchForm} = useSelector((state) => state.clazz);

    const movePage = (page) => {
        const searchFormT = {...searchForm};
        searchFormT.page = page;
        dispatch(searchClazzesSetForm(searchFormT));
        dispatch(searchClazzes(searchFormT));
    };

    const onClickChange = (row) => {
        history.push({
            pathname: '/clazz-detail',
            state: {
                id: row.id
            }
        });
    };

    const columns = [
        // {
        //     title: '프로젝트 명',
        //     key: 'projectName'
        // },

        {
            title: '패키지 명',
            align: 'left',
            key: 'packageName'
        },
        {
            title: '클래스 명',
            align: 'left',
            key: 'clazzName'
        },
        {
            title: '파일 유형',
            key: 'clazzType'
        },
        {
            title: '클래스 유형',
            key: 'clazzDetailType'
        },
        // {
        //     title: '라인수',
        //     key: 'line',
        //     render: (id, row, column) => {
        //         return `${row.line} Line`;
        //     }
        // },
        {
            title: '메서드 건수',
            key: 'snapshotCnt',
            render: (id, row, column) => {
                return `${row.methodCnt} 건`;
            }
        },
        {
            title: '등록일자',
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
