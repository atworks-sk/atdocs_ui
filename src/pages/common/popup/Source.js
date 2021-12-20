/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {Container, Row, Col, Form, Modal} from 'react-bootstrap';
import {Button, Card, Spinner} from '@components';
import {useDispatch, useSelector} from 'react-redux';
import {hideModalSource} from '../../../store/commonStore';

/*
 * [공통팝업] 자바 소스 출력하는 팝업
 */
const Source = () => {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = React.useState(false);
    const handleClose = () => {
        dispatch(hideModalSource());
        setModalShow(false);
    };
    const handleShow = () => setModalShow(true);

    const {javaSourceModalInitData} = useSelector((state) => state.common);

    /*
     * Popup open event
     */
    useEffect(() => {
        if (javaSourceModalInitData.showModal && !modalShow) {
            handleShow();
        }
    }, [javaSourceModalInitData.showModal]);

    return (
        <>
            <Modal
                show={modalShow}
                onHide={handleClose}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {javaSourceModalInitData &&
                                javaSourceModalInitData.initData.methodName}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control
                            readOnly
                            as="textarea"
                            rows={20}
                            placeholder=""
                            value={
                                javaSourceModalInitData &&
                                javaSourceModalInitData.initData.fullContents
                            }
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button theme="default" onClick={handleClose}>
                            닫기
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default Source;
