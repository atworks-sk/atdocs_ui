/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {FaSearch, FaTrash} from 'react-icons/fa';
import {useHistory} from 'react-router-dom';
import {Button, Spinner, Table} from '@components';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {
    searchSnapshotList,
    searchSnapshotListSetForm,
    deleteSnapshot
} from '../../../store/snapshotStore';
import {getErrorMsg} from '../../../lib/commonUiUtils';
/*
 * Project 검색조건 Contanier
 */
const SnapshotTable = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {data: searchList} = useSelector(
        (state) => state.snapshot.searchSnapshotListRes
    );
    const {searchSnapshotListForm: searchForm} = useSelector(
        (state) => state.snapshot
    );

    const {
        loading: deleteLoading,
        data: deleteData,
        error: deleteError
    } = useSelector((state) => state.snapshot.deleteSnapshotRes);

    const movePage = (page) => {
        const searchFormT = {...searchForm};
        searchFormT.page = page;
        dispatch(searchSnapshotListSetForm(searchFormT));
        dispatch(searchSnapshotList(searchFormT));
    };

    const onClickDelete = (row) => {
        dispatch(deleteSnapshot(row.id));
    };

    const onSearchList = (_seachFrom = searchForm) => {
        dispatch(searchSnapshotList(_seachFrom));
    };

    /*
     * 프로젝트 저자 성공/실패
     */
    useEffect(() => {
        if (!deleteLoading && deleteData) {
            onSearchList();
        }
        if (!deleteLoading && deleteError) {
            toast.error(getErrorMsg(deleteError, 'save'));
            onSearchList();
        }
    }, [deleteData, deleteError]);

    const columns = [
        {
            title: 'Snapshot ID',
            key: 'id'
        },
        {
            title: '프로젝트 명',
            key: 'projectName'
        },
        {
            title: '소스 경로',
            key: 'dirPath'
        },
        {
            title: '클래스 수',
            key: 'clazzCnt',
            render: (id, row, column) => {
                return <>{row.clazzCnt} 건</>;
            }
        },
        {
            title: '매서드 수',
            key: 'methodCnt',
            render: (id, row, column) => {
                return <>{row.methodCnt} 건</>;
            }
        },
        {
            title: '오류 건수',
            key: 'methodCnt',
            render: (id, row, column) => {
                return <>{row.errorCnt} 건</>;
            }
        },

        //
        {
            title: '등록일자',
            key: 'createdDateTime'
        },
        {
            title: '',
            key: 'button',
            // eslint-disable-next-line no-unused-vars
            render: (id, row, column) => {
                return (
                    <>
                        <Button theme="link" onClick={() => onClickDelete(row)}>
                            <FaTrash />
                        </Button>
                    </>
                );
            }
        }
    ];

    return (
        <>
            <Spinner isLoading={deleteLoading} />
            <Table
                tableName="조회 결과"
                // onDoubleClick={(id, row) => {
                //     onClickDetail(row);
                // }}
                movePage={movePage}
                rowKey="id"
                columns={columns}
                data={searchList}
            />
        </>
    );
};

export default SnapshotTable;
