/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {Container, Row, Col, Form, Modal} from 'react-bootstrap';
import {Button, Card, Spinner} from '@components';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import {
    createSnapshot,
    createSnapshotClear,
    searchSnapshotList
} from '../../../store/snapshotStore';
import {
    printFormError,
    getInputValidMsg,
    getSelectValidMsg,
    getErrorMsg
} from '../../../lib/commonUiUtils';
/*
 * Snapshot 생성
 */
const SnapshotCreate = () => {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = React.useState(false);
    const handleClose = () => {
        setModalShow(false);
    };
    const handleShow = () => setModalShow(true);

    const {snapshotUpdateModalInitData} = useSelector(
        (state) => state.snapshot
    );

    const {
        loading: saveLoading,
        data: saveData,
        error: saveError
    } = useSelector((state) => state.snapshot.createSnapshotRes);

    const {data: projectList} = useSelector(
        (state) => state.common.projectList
    );

    const {searchSnapshotListForm: searchForm} = useSelector(
        (state) => state.snapshot
    );
    const onSearchList = (_seachFrom = searchForm) => {
        dispatch(searchSnapshotList(_seachFrom));
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            projectId: '',
            dirPath: 'C:/Users/kimtaehan/testkim'
        },
        validationSchema: Yup.object({
            // : Yup.string().required(getInputValidMsg('')),
            projectId: Yup.string().required(getSelectValidMsg('')),
            dirPath: Yup.string().required(getInputValidMsg(''))
        }),
        onSubmit: (values) => {
            dispatch(createSnapshot(values));
        }
    });

    /*
     * Popup open event
     */
    // useEffect(() => {
    //     if (snapshotUpdateModalInitData.showModal && !modalShow) {
    //         handleShow();
    //     }
    // }, [snapshotUpdateModalInitData.showModal]);

    /*
     * 프로젝트 저자 성공/실패
     */
    useEffect(() => {
        if (!saveLoading && saveData) {
            handleClose();
            dispatch(createSnapshotClear());
            onSearchList();
        }
        if (!saveLoading && saveError) {
            toast.error(getErrorMsg(saveData, 'search'));
            dispatch(createSnapshotClear());
        }
    }, [saveData, saveError]);

    return (
        <>
            <Spinner isLoading={saveLoading} />
            <Modal
                show={modalShow}
                onHide={handleClose}
                size="lg"
                onExited={() => formik.resetForm()}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form onSubmit={formik.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            스냅샷 추가
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container fluid>
                            <Row>
                                <Col xs="5">
                                    <Form.Group>
                                        <Form.Label>* 프로젝트</Form.Label>
                                        <Form.Control
                                            as="select"
                                            {...formik.getFieldProps(
                                                'projectId'
                                            )}
                                        >
                                            <option value="">선택안함</option>{' '}
                                            {projectList &&
                                                projectList.data.map((obj) => (
                                                    <option
                                                        key={obj.id}
                                                        value={obj.id}
                                                    >
                                                        {obj.projectName}
                                                    </option>
                                                ))}
                                        </Form.Control>
                                        {printFormError(formik, 'projectId')}
                                    </Form.Group>
                                </Col>
                                <Col xs="7">
                                    <Form.Group>
                                        <Form.Label>* 디렉토리 경로</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="C:\Users\kimtaehan\git\atworks_client.."
                                            maxLength="200"
                                            // onChange={handleInputChange}
                                            {...formik.getFieldProps('dirPath')}
                                        />
                                        {printFormError(formik, 'dirPath')}
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            theme="primary"
                            type="submit"
                            // isLoading={updateLoading}
                        >
                            저장
                        </Button>
                        <Button theme="default" onClick={handleClose}>
                            닫기
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default SnapshotCreate;
