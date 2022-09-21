/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {FaSearch, FaTrash} from 'react-icons/fa';
import {Container, Row, Col, Form, Modal} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {Button, Card, Spinner, Table} from '@components';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import {register} from '@app/serviceWorker';
import {
    hideModalSource,
    searchSources,
    searchSourcesSetForm,
    searcSourcesFormInitData,
    deleteSource,
    searchSourceText
} from '../../../store/sourceStore';
import {
    getErrorMsg,
    getInputValidMsg,
    printFormError
} from '../../../lib/commonUiUtils';
/*
 * project 하위 work update modal
 */
const ProjectDetailSources = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [modalShow, setModalShow] = React.useState(false);
    const handleClose = () => {
        dispatch(hideModalSource());
        setModalShow(false);
    };
    const handleShow = () => setModalShow(true);

    const {sourcesModalInitData} = useSelector((state) => state.source);
    const {searchSourcesForm} = useSelector((state) => state.source);

    const {
        loading: searchSourcesLoading,
        data: searchSourcesRes,
        error: searchSourcesError
    } = useSelector((state) => state.source.searchSourcesRes);

    const {
        loading: searchSourceTextResLoading,
        data: searchSourceTextRes,
        error: searchSourceTextResError
    } = useSelector((state) => state.source.searchSourceTextRes);

    const {
        loading: deleteSourceResLoading,
        data: deleteSourceRes,
        error: deleteSourceResError
    } = useSelector((state) => state.source.deleteSourceRes);

    const onChangeForm = (e) => {
        const data = {...searchSourcesForm};
        data[e.target.id] = e.target.value;
        dispatch(searchSourcesSetForm(data));
    };

    const onclickSearch = (_searchSourcesForm = searchSourcesForm) => {
        dispatch(searchSources(_searchSourcesForm));
    };

    const onClickDelete = (id) => {
        dispatch(deleteSource(id));
    };

    const onClickSourceText = (id) => {
        dispatch(searchSourceText(id));
    };

    const movePage = (page) => {
        const data = {...searchSourcesForm};
        data.page = page;
        dispatch(searchSourcesSetForm(data));
        onclickSearch(data);
    };

    /*
     * Popup open event
     */
    useEffect(() => {
        if (sourcesModalInitData.showModal && !modalShow) {
            const data = searcSourcesFormInitData();
            data.workId = sourcesModalInitData.initData.id;
            dispatch(searchSourcesSetForm(data));
            onclickSearch(data);
            handleShow();
        }
    }, [sourcesModalInitData.showModal]);

    const columns = [
        {
            title: 'file Name',
            key: 'sourceType',
            width: '8%'
        },
        {
            title: 'file Name',
            align: 'left',
            key: 'fileName'
        },
        {
            title: '',
            key: 'button',
            align: 'right',
            width: '8%',
            // eslint-disable-next-line no-unused-vars
            render: (id, row, column) => {
                return (
                    <>
                        <Button
                            theme="outline-success"
                            // onClick={() => onClickDelete(id)}
                            onClick={() => onClickSourceText(id)}
                        >
                            <FaSearch />
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

    return (
        <>
            <Spinner
                isLoading={
                    searchSourcesLoading ||
                    deleteSourceResLoading ||
                    searchSourceTextResLoading
                }
            />
            <Modal
                show={modalShow}
                onHide={handleClose}
                dialogClassName="modal-80w"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Sources
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container fluid>
                            <Row>
                                <Col xs="6">
                                    <Row>
                                        <Col xs="2">
                                            <Form.Control
                                                as="select"
                                                id="sourceType"
                                                onChange={onChangeForm}
                                                value={
                                                    (searchSourcesForm &&
                                                        searchSourcesForm.sourceType) ||
                                                    ''
                                                }
                                            >
                                                <option value="">전체</option>
                                                <option value="java">
                                                    java
                                                </option>
                                                <option value="xml">xml</option>
                                            </Form.Control>
                                        </Col>
                                        <Col xs="6">
                                            <Form.Control
                                                type="text"
                                                placeholder="Please enter source name"
                                                maxLength="20"
                                                id="sourceName"
                                                onChange={onChangeForm}
                                                value={
                                                    searchSourcesForm &&
                                                    searchSourcesForm.sourceName
                                                }
                                            />
                                        </Col>
                                        <Col xs="2" />
                                        <Col xs="2">
                                            <Form.Group>
                                                <Button
                                                    type="button"
                                                    className="btn btn-block btn-secondary btn-search"
                                                    onClick={() =>
                                                        onclickSearch()
                                                    }
                                                >
                                                    Search
                                                </Button>
                                            </Form.Group>
                                        </Col>
                                        <Col xs="12">
                                            <Table
                                                rowKey="id"
                                                columns={columns}
                                                isCard="N"
                                                data={searchSourcesRes}
                                                movePage={movePage}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs="6">
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        style={{
                                            width: '100%',
                                            marginBottom: '10px'
                                        }}
                                    >
                                        {(searchSourceTextRes &&
                                            searchSourceTextRes.data
                                                .fileName) ||
                                            ''}
                                    </button>

                                    <Form.Control
                                        disabled
                                        style={{
                                            height: '700px',
                                            overflowY: 'auto'
                                        }}
                                        as="textarea"
                                        value={
                                            searchSourceTextRes &&
                                            searchSourceTextRes.data.sourceText
                                        }
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button theme="default" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ProjectDetailSources;
