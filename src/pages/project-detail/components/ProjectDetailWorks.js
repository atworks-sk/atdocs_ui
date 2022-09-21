/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {FaSearch, FaTrash, FaPlus, FaList} from 'react-icons/fa';
import {Container, Row, Col, Form} from 'react-bootstrap';
import {Button, Card, Spinner, Table} from '@components';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {getErrorMsg} from '../../../lib/commonUiUtils';

import {
    showModalWorkSave,
    searchWorksSetForm,
    deleteWork,
    deleteWorkClear
} from '../../../store/workStore';
import {showModalAddSource, showModalSources} from '../../../store/sourceStore';

const ProjectDetailWorks = ({searchWorksEvent}) => {
    const dispatch = useDispatch();
    const {searchWorksForm} = useSelector((state) => state.work);

    const {data: searchWorksRes} = useSelector(
        (state) => state.work.searchWorksRes
    );

    const onClickAddWork = (e) => {
        const initData = {
            id: -1
        };
        dispatch(showModalWorkSave(initData));
    };

    const onClickDelete = (id) => {
        dispatch(deleteWork(id));
    };

    const onClickUpdateWork = (row) => {
        dispatch(showModalWorkSave(row));
    };

    const {data: searchProjectDetailRes} = useSelector(
        (state) => state.project.searchProjectDetailRes
    );

    const onClickUpdateSource = (row) => {
        const initData = {
            id: row.id,
            workName: row.workName,
            projectName: searchProjectDetailRes.data.projectName
        };
        dispatch(showModalAddSource(initData));
    };

    const onClickSources = (row) => {
        const initData = {
            id: row.id
        };
        dispatch(showModalSources(initData));
    };

    const onChangeForm = (e) => {
        const searchWorksFormT = {...searchWorksForm};
        searchWorksFormT[e.target.id] = e.target.value;
        dispatch(searchWorksSetForm(searchWorksFormT));
    };

    const movePage = (page) => {
        const searchFormT = {...searchWorksForm};
        searchFormT.page = page;
        dispatch(searchWorksSetForm(searchFormT));
        searchWorksEvent(searchFormT);
    };

    const {
        loading: deleteLoading,
        data: deleteData,
        error: deleteError
    } = useSelector((state) => state.work.deleteWorkRes);

    /*
     * 프로젝트 실패 성공/실패
     */
    useEffect(() => {
        if (!deleteLoading && deleteData) {
            toast.success('delete success');
            searchWorksEvent();
        }
        if (!deleteLoading && deleteError) {
            toast.error(getErrorMsg(deleteError, 'save'));
        }
        dispatch(deleteWorkClear());
    }, [deleteData, deleteError]);

    const columns = [
        {
            title: 'Work Name',
            key: 'workName'
        },
        {
            title: 'packagePath',
            key: 'packagePath'
        },
        {
            title: 'javaFileCnt',
            key: 'javaFileCnt'
        },
        {
            title: 'xmlFileCnt',
            key: 'xmlFileCnt'
        },

        {
            title: 'createdDate',
            width: '20%',
            key: 'createdDate'
        },
        {
            title: '',
            key: 'button',
            width: '8%',
            // eslint-disable-next-line no-unused-vars
            render: (id, row, column) => {
                return (
                    <>
                        <Button
                            theme="outline-success"
                            onClick={() => onClickUpdateWork(row)}
                        >
                            <FaSearch />
                        </Button>
                        <Button
                            theme="outline-primary"
                            onClick={() => onClickUpdateSource(row)}
                        >
                            <FaPlus />
                        </Button>
                        <Button
                            theme="outline-warning"
                            onClick={() => onClickSources(row)}
                        >
                            <FaList />
                        </Button>

                        <Button
                            theme="outline-danger"
                            onClick={() => onClickDelete(id)}
                        >
                            <FaTrash />
                        </Button>
                    </>
                );
            }
        }
    ];

    //
    return (
        <>
            <Spinner isLoading={deleteLoading} />
            <Card
                title="Project Works"
                body={
                    <>
                        <Container>
                            <Row>
                                <Col xs="6">
                                    <Form.Control
                                        type="text"
                                        placeholder="Please enter work name"
                                        maxLength="20"
                                        id="workName"
                                        onChange={onChangeForm}
                                        value={
                                            searchWorksForm &&
                                            searchWorksForm.workName
                                        }
                                    />
                                </Col>
                                <Col xs="2" />
                                <Col xs="2">
                                    <Form.Group>
                                        <Button
                                            type="button"
                                            className="btn btn-block btn-secondary btn-search"
                                            onClick={() => searchWorksEvent()}
                                        >
                                            Search
                                        </Button>
                                    </Form.Group>
                                </Col>
                                <Col xs="2">
                                    <Form.Group>
                                        <Button
                                            type="button"
                                            className="btn btn-block btn-success btn-search"
                                            // isLoading={searchLoading}
                                            onClick={onClickAddWork}
                                        >
                                            Add
                                        </Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
                                    <Table
                                        rowKey="id"
                                        columns={columns}
                                        isCard="N"
                                        data={searchWorksRes}
                                        movePage={movePage}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </>
                }
            />
        </>
    );
};

export default ProjectDetailWorks;
