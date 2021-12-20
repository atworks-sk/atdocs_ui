/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {Form, Modal} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../../components/button/Button';
import {hideModalAnnotation} from '../../../store/commonStore';

/*
 * [공통팝업] 자바 소스 출력하는 팝업
 */
const Annotation = () => {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = React.useState(false);
    const handleClose = () => {
        dispatch(hideModalAnnotation());
        setModalShow(false);
    };
    const handleShow = () => setModalShow(true);

    const {annotationModalInitData} = useSelector((state) => state.common);

    const renderAnnotationBody = (obj) => {
        return (
            <>
                <Form.Label style={{fontSize: '20px'}}>
                    {obj.expression}
                </Form.Label>
                <br />
            </>
        );
    };

    useEffect(() => {
        if (annotationModalInitData.showModal && !modalShow) {
            handleShow();
        }
    }, [annotationModalInitData.showModal]);

    return (
        <>
            <Modal
                show={modalShow}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {annotationModalInitData &&
                                annotationModalInitData.initData.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {annotationModalInitData.initData.annotationList &&
                            annotationModalInitData.initData.annotationList.map(
                                (obj, idx) => <>{renderAnnotationBody(obj)}</>
                            )}
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

export default Annotation;
