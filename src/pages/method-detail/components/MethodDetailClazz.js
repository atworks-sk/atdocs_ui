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
const MethodDetailClazz = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const {data: searchDetail} = useSelector(
        (state) => state.method.searchMethodDetailRes
    );

    const renderAnnotation = () => {
        let text = '';
        if (searchDetail) {
            searchDetail.data.clazzAnnotationList.forEach((obj) => {
                text += `${obj.expression} `;
            });
        }

        return text;
    };

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

    return (
        <>
            <Card
                title="클래스 정보"
                body={
                    <>
                        <Row style={{paddingBottom: '10px'}}>
                            <Col xs="3" style={{textAlign: 'center'}}>
                                <Form.Label>프로젝트 명</Form.Label>
                            </Col>
                            <Col xs="9">
                                <Form.Control
                                    type="text"
                                    disabled
                                    value={
                                        searchDetail &&
                                        searchDetail.data.projectName
                                    }
                                />
                            </Col>
                        </Row>
                        <Row style={{paddingBottom: '10px'}}>
                            <Col xs="3" style={{textAlign: 'center'}}>
                                <Form.Label>패키지 명</Form.Label>
                            </Col>
                            <Col xs="9">
                                <Form.Control
                                    type="text"
                                    disabled
                                    value={
                                        searchDetail &&
                                        searchDetail.data.packageName
                                    }
                                />
                            </Col>
                        </Row>
                        <Row style={{paddingBottom: '10px'}}>
                            <Col xs="3" style={{textAlign: 'center'}}>
                                <Form.Label>클래스 명</Form.Label>
                            </Col>
                            <Col xs="9">
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type="text"
                                        disabled
                                        value={
                                            searchDetail &&
                                            searchDetail.data.clazzName
                                        }
                                    />
                                    <Button
                                        theme="link"
                                        onClick={(e) => onClickClazz()}
                                    >
                                        <FaSearch />
                                    </Button>
                                </InputGroup>
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
export default MethodDetailClazz;
