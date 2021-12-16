/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Card} from '@components';
import {Button, Row, Col, Form, InputGroup} from 'react-bootstrap';

import {FaSearch} from 'react-icons/fa';
/*
 * Clazz 조회/등록/수정 화면
 */
const MethodDetailInfo = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const {data: searchDetail} = useSelector(
        (state) => state.method.searchMethodDetailRes
    );

    /*
     * 현재 매서드에 상위 클래스로 이동
     */
    const onClickClazz = () => {
        history.push({
            pathname: '/clazz-detail',
            state: {
                id: searchDetail.data.clazzId
            }
        });
    };

    const renderReturnData = () => {
        return <span>TEST</span>;
    };

    return (
        <>
            <Card
                title="매서드 정보"
                body={
                    <>
                        <Row style={{paddingBottom: '10px'}}>
                            <Col xs="2" style={{textAlign: 'center'}}>
                                <Form.Label>매서드 명</Form.Label>
                            </Col>
                            <Col xs="5">
                                <Form.Control
                                    type="text"
                                    disabled
                                    value={
                                        searchDetail &&
                                        searchDetail.data.methodName
                                    }
                                />
                            </Col>
                            <Col xs="2" style={{textAlign: 'center'}}>
                                <Form.Label>접근제한자</Form.Label>
                            </Col>
                            <Col xs="3">
                                <Form.Control
                                    type="text"
                                    disabled
                                    value={
                                        searchDetail &&
                                        searchDetail.data.accessSpecifier
                                    }
                                />
                            </Col>
                        </Row>
                        <Row style={{paddingBottom: '10px'}}>
                            <Col xs="2" style={{textAlign: 'center'}}>
                                <Form.Label>리턴데이터</Form.Label>
                            </Col>
                            <Col xs="5">
                                <Form.Label>{renderReturnData()}</Form.Label>
                            </Col>
                            <Col xs="2" style={{textAlign: 'center'}}>
                                <Form.Label>라인수</Form.Label>
                            </Col>
                            <Col xs="3">
                                <Form.Control
                                    type="text"
                                    disabled
                                    value={
                                        searchDetail &&
                                        `${searchDetail.data.line} line`
                                    }
                                />
                            </Col>
                        </Row>
                        {/* 
                        <Row>
                            <Col xs="2" style={{textAlign: 'center'}}>
                                <Form.Label>어노테이션</Form.Label>
                            </Col>
                            <Col xs="10">
                                <Form.Label style={{color: 'BLUE'}}>
                                    {renderAnnotation()}
                                </Form.Label>
                            </Col>
                        </Row> */}
                    </>
                }
            />
        </>
    );
};
export default MethodDetailInfo;
