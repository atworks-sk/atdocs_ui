/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {Container, Row, Col, Form, Modal} from 'react-bootstrap';
import {Button, Card, Spinner} from '@components';
import {useDispatch, useSelector} from 'react-redux';
import {hideModalComment} from '../../../store/commonStore';

/*
 * [공통팝업] 주석을 보여주는 팝업
 */
const Comment = () => {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = React.useState(false);
    const handleClose = () => {
        dispatch(hideModalComment());
        setModalShow(false);
    };
    const handleShow = () => setModalShow(true);

    const {commentModalInitData} = useSelector((state) => state.common);

    /*
     * Popup open event
     */
    useEffect(() => {
        if (commentModalInitData.showModal && !modalShow) {
            handleShow();
        }
    }, [commentModalInitData.showModal]);

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
                            {commentModalInitData &&
                                commentModalInitData.initData.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control
                            readOnly
                            as="textarea"
                            rows={5}
                            placeholder=""
                            value={
                                commentModalInitData &&
                                commentModalInitData.initData.comment
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

export default Comment;
