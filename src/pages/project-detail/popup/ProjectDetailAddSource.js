/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {Container, Row, Col, Form, Modal} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';
import {Button, Card, Spinner} from '@components';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import {hideModalAddSource, addSource} from '../../../store/sourceStore';
import {getInputValidMsg, printFormError} from '../../../lib/commonUiUtils';
/*
 * project 하위 work update modal
 */
const ProjectDetailAddSource = ({searchWorksEvent}) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [modalShow, setModalShow] = React.useState(false);
    const handleClose = () => {
        dispatch(hideModalAddSource());
        setModalShow(false);
    };
    const handleShow = () => setModalShow(true);

    const {addSourceModalInitData} = useSelector((state) => state.source);

    const {
        loading: saveLoading,
        data: saveData,
        error: saveError
    } = useSelector((state) => state.work.saveWorksRes);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            sourcePath: ''
        },
        validationSchema: Yup.object({
            sourcePath: Yup.string().required(getInputValidMsg(''))
        }),
        onSubmit: (values) => {
            const data = {
                workId: addSourceModalInitData.initData.id,
                sourcePath: values.sourcePath
            };

            dispatch(addSource(data));
        }
    });

    /*
     * Popup open event
     */
    useEffect(() => {
        if (addSourceModalInitData.showModal && !modalShow) {
            handleShow();
        }
    }, [addSourceModalInitData.showModal]);

    /*
     * 프로젝트 저자 성공/실패
     */
    useEffect(() => {
        // if (!saveLoading && saveData) {
        //     handleClose();
        //     dispatch(saveWorkClear());
        //     searchWorksEvent();
        // }
        // if (!saveLoading && saveError) {
        //     toast.error(getErrorMsg(saveData, 'search'));
        //     dispatch(saveWorkClear());
        // }
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
                            Add Source
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container fluid>
                            <Row>
                                <Col xs="6">
                                    <Form.Group>
                                        <Form.Label>Project Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            readOnly
                                            value={
                                                addSourceModalInitData &&
                                                addSourceModalInitData.initData
                                                    .projectName
                                            }
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs="6">
                                    <Form.Group>
                                        <Form.Label>Work Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            readOnly
                                            // placeholder="Please enter package name"
                                            value={
                                                addSourceModalInitData &&
                                                addSourceModalInitData.initData
                                                    .workName
                                            }
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs="10">
                                    <Form.Group>
                                        <Form.Label>Source Path</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Please enter Source path (C:/Users/kimtaehan/testkim)"
                                            {...formik.getFieldProps(
                                                'sourcePath'
                                            )}
                                        />
                                        {printFormError(formik, 'sourcePath')}
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            theme="primary"
                            type="submit"
                            isLoading={saveLoading}
                        >
                            Add
                        </Button>
                        <Button theme="default" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ProjectDetailAddSource;
