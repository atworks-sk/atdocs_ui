/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {Form, Modal, Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {Table} from '@components';
import Button from '../../../components/button/Button';
import {hideModalInheritance} from '../../../store/commonStore';

/*
 * [공통팝업] 자바 소스 출력하는 팝업
 */
const Inheritance = () => {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = React.useState(false);
    const handleClose = () => {
        dispatch(hideModalInheritance());
        setModalShow(false);
    };
    const handleShow = () => setModalShow(true);

    const {inheritanceModalInitData} = useSelector((state) => state.common);

    useEffect(() => {
        if (inheritanceModalInitData.showModal && !modalShow) {
            handleShow();
        }
    }, [inheritanceModalInitData.showModal]);

    const columns = [
        {
            title: '패키지명',
            key: 'packageName'
        },
        {
            title: '클래스유형',
            key: 'fileTypeName'
        },
        {
            title: '클래스명',
            key: 'clazzName'
        }
        // {
        //     title: '',
        //     key: 'button',
        //     // eslint-disable-next-line no-unused-vars
        //     render: (id, row, column) => {
        //         return (
        //             <>
        //                 <Button theme="link" onClick={() => onClickChange(row)}>
        //                     <FaSearch />
        //                 </Button>
        //             </>
        //         );
        //     }
        // }
    ];

    const renderTableData = (list) => {
        if (!list) {
            return {data: {content: []}};
        }
        const temp = {
            data: {
                content: list
            }
        };
        return temp;
    };

    return (
        <>
            <Modal
                show={modalShow}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {inheritanceModalInitData &&
                                inheritanceModalInitData.initData.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col xs="12">
                                <Form.Label>내가 상속하는 클래스</Form.Label>
                                <Table
                                    rowKey="id"
                                    columns={columns}
                                    disablePageView
                                    isCard="N"
                                    data={renderTableData(
                                        inheritanceModalInitData.initData
                                            .inheritanceList
                                    )}
                                />
                            </Col>
                            <Col xs="12">
                                <Form.Label>나를 상속하는 클래스</Form.Label>
                                <Table
                                    rowKey="id"
                                    columns={columns}
                                    disablePageView
                                    isCard="N"
                                    data={renderTableData(
                                        inheritanceModalInitData.initData
                                            .inheritancedList
                                    )}
                                />
                            </Col>
                        </Row>
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

export default Inheritance;
