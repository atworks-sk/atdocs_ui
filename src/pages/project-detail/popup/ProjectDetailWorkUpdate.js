/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {Container, Row, Col, Form, Modal} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';
import {Button, Card, Spinner} from '@components';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import {
    hideModalWorkSave,
    saveWork,
    saveWorkClear
} from '../../../store/workStore';
import {
    getErrorMsg,
    getInputValidMsg,
    printFormError
} from '../../../lib/commonUiUtils';
/*
 * project 하위 work update modal
 */
const ProjectDetailWorkUpdate = ({searchWorksEvent}) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [modalShow, setModalShow] = React.useState(false);
    const handleClose = () => {
        dispatch(hideModalWorkSave());
        setModalShow(false);
    };
    const handleShow = () => setModalShow(true);

    const {workSaveModalInitData} = useSelector((state) => state.work);

    const {
        loading: saveLoading,
        data: saveData,
        error: saveError
    } = useSelector((state) => state.work.saveWorksRes);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: -1
        },
        validationSchema: Yup.object({
            workName: Yup.string().required(getInputValidMsg(''))
            // url: Yup.string().required(getInputValidMsg('url'))
        }),
        onSubmit: (values) => {
            const data = {...values};
            data.projectId = location.state.id;
            dispatch(saveWork(data));
        }
    });

    /*
     * Popup open event
     */
    useEffect(() => {
        if (workSaveModalInitData.showModal && !modalShow) {
            formik.setFieldValue(
                'packagePath',
                workSaveModalInitData &&
                    workSaveModalInitData.initData.packagePath
                    ? workSaveModalInitData.initData.packagePath
                    : ''
            );
            formik.setFieldValue(
                'id',
                workSaveModalInitData && workSaveModalInitData.initData.id
                    ? workSaveModalInitData.initData.id
                    : -1
            );
            formik.setFieldValue(
                'workName',
                workSaveModalInitData && workSaveModalInitData.initData.workName
                    ? workSaveModalInitData.initData.workName
                    : ''
            );

            handleShow();
        }
    }, [workSaveModalInitData.showModal]);

    /*
     * 프로젝트 저자 성공/실패
     */
    useEffect(() => {
        if (!saveLoading && saveData) {
            handleClose();
            dispatch(saveWorkClear());
            searchWorksEvent();
        }
        if (!saveLoading && saveError) {
            toast.error(getErrorMsg(saveData, 'search'));
            dispatch(saveWorkClear());
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
                            Work Save
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container fluid>
                            <Row>
                                <Col xs="6">
                                    <Form.Group>
                                        <Form.Label>* Work Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Please enter work name"
                                            maxLength="40"
                                            // onChange={handleInputChange}
                                            {...formik.getFieldProps(
                                                'workName'
                                            )}
                                        />
                                        {printFormError(formik, 'workName')}
                                    </Form.Group>
                                </Col>
                                <Col xs="6">
                                    <Form.Group>
                                        <Form.Label>Package Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Please enter package name"
                                            maxLength="100"
                                            {...formik.getFieldProps(
                                                'packagePath'
                                            )}
                                        />
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
                            Save
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

export default ProjectDetailWorkUpdate;
