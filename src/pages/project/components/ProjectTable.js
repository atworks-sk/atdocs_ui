/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {FaSearch, FaTrash} from 'react-icons/fa';
import {Button, Spinner, Table} from '@components';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {
    searchProjectList,
    deleteProject,
    deleteProjectClear,
    searchProjectListSetForm,
    showModalProjectUpdate
} from '../../../store/projectStore';
import {getErrorMsg} from '../../../lib/commonUiUtils';
/*
 * Project 검색조건 Contanier
 */
const ProjectTable = () => {
    const dispatch = useDispatch();

    const {data: searchList} = useSelector(
        (state) => state.project.searchProjectListRes
    );
    const {searchProjectListForm: searchForm} = useSelector(
        (state) => state.project
    );

    const {
        loading: deleteLoading,
        data: deleteData,
        error: deleteError
    } = useSelector((state) => state.project.deleteProjectRes);

    const movePage = (page) => {
        const searchFormT = {...searchForm};
        searchFormT.page = page;
        dispatch(searchProjectListSetForm(searchFormT));
        dispatch(searchProjectList(searchFormT));
    };

    const onClickChange = (row) => {
        const initData = row;
        dispatch(showModalProjectUpdate(initData));
    };

    const onClickDelete = (row) => {
        dispatch(deleteProject(row.id));
    };

    /*
     * 프로젝트 삭제 성공/실패
     */
    useEffect(() => {
        if (!deleteLoading && deleteData) {
            dispatch(deleteProjectClear());
            dispatch(searchProjectList(searchForm));
        }
        if (!deleteLoading && deleteError) {
            toast.error(getErrorMsg(deleteError, 'save'));
            dispatch(deleteProjectClear());
        }
    }, [deleteData, deleteError]);

    const columns = [
        {
            title: '프로젝트 명',
            key: 'projectName'
        },
        {
            title: '패키지 명',
            key: 'packageName'
        },
        {
            title: '스냅샷건수',
            key: 'snapshotCnt',
            render: (id, row, column) => {
                return `${row.snapshotCnt} 건`;
            }
        },
        {
            title: '생성일자',
            key: 'createDate'
        },
        {
            title: '수정일자',
            key: 'modifyDate'
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

export default ProjectTable;
