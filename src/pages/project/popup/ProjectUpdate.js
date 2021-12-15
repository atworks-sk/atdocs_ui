/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {Container, Row, Col, Form, Modal} from 'react-bootstrap';
import {Button, Card, Spinner} from '@components';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import {
    hideModalProjectUpdate,
    saveProject,
    saveProjectClear,
    searchProjectList
} from '../../../store/projectStore';
import {getErrorMsg} from '../../../lib/commonUiUtils';
/*
 * Project 검색조건 Contanier
 */
const ProjectUpdate = () => {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = React.useState(false);
    const handleClose = () => {
        dispatch(hideModalProjectUpdate());
        setModalShow(false);
    };
    const handleShow = () => setModalShow(true);

    const {projectUpdateModalInitData} = useSelector((state) => state.project);

    const {
        loading: saveLoading,
        data: saveData,
        error: saveError
    } = useSelector((state) => state.project.saveProjectRes);

    const {searchProjectListForm: searchForm} = useSelector(
        (state) => state.project
    );
    const onSearchList = (_seachFrom = searchForm) => {
        dispatch(searchProjectList(_seachFrom));
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id:
                projectUpdateModalInitData &&
                projectUpdateModalInitData.initData.id,
            projectName:
                projectUpdateModalInitData &&
                projectUpdateModalInitData.initData.projectName
                    ? projectUpdateModalInitData.initData.projectName
                    : '',
            packageName:
                projectUpdateModalInitData &&
                projectUpdateModalInitData.initData.packageName
                    ? projectUpdateModalInitData.initData.packageName
                    : ''
        },
        validationSchema: Yup.object({
            // projectName: Yup.string().required(getInputValidMsg(''))
            // url: Yup.string().required(getInputValidMsg('url'))
        }),
        onSubmit: (values) => {
            dispatch(saveProject(values));
        }
    });

    /*
     * Popup open event
     */
    useEffect(() => {
        if (projectUpdateModalInitData.showModal && !modalShow) {
            handleShow();
        }
    }, [projectUpdateModalInitData.showModal]);

    /*
     * 프로젝트 저자 성공/실패
     */
    useEffect(() => {
        if (!saveLoading && saveData) {
            handleClose();
            dispatch(saveProjectClear());
            onSearchList();
        }
        if (!saveLoading && saveError) {
            toast.error(getErrorMsg(saveData, 'search'));
            dispatch(saveProjectClear());
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
                            {/* {t('pages.scenario.registerCase')} */}
                            프로젝트 저장
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container fluid>
                            <Row>
                                <Col xs="6">
                                    <Form.Group>
                                        <Form.Label>* 프로젝트 명</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Project A.."
                                            maxLength="40"
                                            // onChange={handleInputChange}
                                            {...formik.getFieldProps(
                                                'projectName'
                                            )}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs="6">
                                    <Form.Group>
                                        <Form.Label>패키지 명</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="com.skcc.atdocs.."
                                            maxLength="40"
                                            // onChange={handleInputChange}
                                            {...formik.getFieldProps(
                                                'packageName'
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

export default ProjectUpdate;
