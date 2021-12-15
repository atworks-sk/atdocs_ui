/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Card} from '@components';
import {Button, Row, Col, Form, InputGroup} from 'react-bootstrap';

/*
 * Clazz 조회/등록/수정 화면
 */
const ClazzDetailInfo = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const {data: searchDetail} = useSelector(
        (state) => state.clazz.searchClazzDetailRes
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

    return (
        <>
            <Card
                title="클래스 정보"
                body={
                    <>
                        <Row style={{paddingBottom: '10px'}}>
                            <Col xs="2" style={{textAlign: 'center'}}>
                                <Form.Label>프로젝트 명</Form.Label>
                            </Col>
                            <Col xs="4">
                                <Form.Control
                                    type="text"
                                    disabled
                                    value={
                                        searchDetail &&
                                        searchDetail.data.projectName
                                    }
                                />
                            </Col>
                            <Col xs="2" style={{textAlign: 'center'}}>
                                <Form.Label>패키지 명</Form.Label>
                            </Col>
                            <Col xs="4">
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
                        {/*
                        <Row style={{paddingBottom: '10px'}}>
                            <Col xs="4" />
                            <Col xs="1" style={{textAlign: 'center'}}>
                                <Form.Label>버전</Form.Label>
                            </Col>
                            <Col xs="2" /> 
                        </Row> */}

                        <Row style={{paddingBottom: '10px'}}>
                            <Col xs="2" style={{textAlign: 'center'}}>
                                <Form.Label>클래스 명</Form.Label>
                            </Col>
                            <Col xs="4">
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
                                        theme="secondary"
                                        style={{minWidth: '80px'}}
                                    >
                                        {searchDetail &&
                                            searchDetail.data.clazzTypeName}
                                    </Button>
                                </InputGroup>
                            </Col>
                            <Col xs="2" style={{textAlign: 'center'}}>
                                <Form.Label>라인수</Form.Label>
                            </Col>
                            <Col xs="2">
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

                        <Row>
                            <Col xs="2" style={{textAlign: 'center'}}>
                                <Form.Label>어노테이션</Form.Label>
                            </Col>
                            <Col xs="10">
                                <Form.Label style={{color: 'BLUE'}}>
                                    {renderAnnotation()}
                                </Form.Label>
                            </Col>
                        </Row>
                    </>
                }
            />
        </>
    );
};
export default ClazzDetailInfo;
