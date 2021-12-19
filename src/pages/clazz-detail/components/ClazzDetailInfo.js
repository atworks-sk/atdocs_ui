/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Card} from '@components';
import {Row, Col, Form, InputGroup} from 'react-bootstrap';
import Button from '../../../components/button/Button';
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

    /*
     * 내가 상속한 리스트
     */
    const renderInheritance = () => {
        if (!searchDetail || searchDetail.data.inheritanceList.length === 0)
            return '';

        const rendomObj = (obj) => {
            return (
                <Form.Label
                    style={{color: 'BLUE'}}
                >{`(${obj.fileTypeName}) ${obj.packageName}.${obj.clazzName}`}</Form.Label>
            );
            // fileTypeName
        };
        return (
            <Row>
                <Col xs="2" style={{textAlign: 'center'}}>
                    <Form.Label>상속</Form.Label>
                </Col>
                <Col xs="10">
                    {searchDetail &&
                        searchDetail.data.inheritanceList.map((obj, idx) => (
                            <>
                                {rendomObj(obj)}
                                <br />
                            </>
                        ))}
                    {/* {searchDetail.data.inheritanceList[0].clazzName} */}
                </Col>
            </Row>
        );
    };
    /*
     * 주석은 존재하는 경우만 보여줍니다.
     */
    const renderComment = () => {
        if (!searchDetail || searchDetail.data.comment === '') return '';
        return (
            <Row>
                <Col xs="2" style={{textAlign: 'center'}}>
                    <Form.Label>주석</Form.Label>
                </Col>
                <Col xs="10">
                    <Form.Control
                        disabled
                        as="textarea"
                        rows={5}
                        value={searchDetail && searchDetail.data.comment}
                    />
                </Col>
            </Row>
        );
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
                        </Row>

                        <Row style={{paddingBottom: '10px'}}>
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
                            <Col xs="2" style={{textAlign: 'center'}}>
                                <Form.Label>클래스 명</Form.Label>
                            </Col>
                            <Col xs="4">
                                <Form.Control
                                    type="text"
                                    disabled
                                    value={
                                        searchDetail &&
                                        searchDetail.data.clazzName
                                    }
                                />
                            </Col>
                        </Row>
                        <Row style={{paddingBottom: '10px'}}>
                            <Col xs="2" style={{textAlign: 'center'}}>
                                <Form.Label>클래스 유형</Form.Label>
                            </Col>
                            <Col xs="4">
                                <Form.Control
                                    type="text"
                                    disabled
                                    value={
                                        searchDetail &&
                                        searchDetail.data.fileTypeName
                                    }
                                />
                            </Col>
                            <Col xs="2" style={{textAlign: 'center'}}>
                                <Form.Label>라인수</Form.Label>
                            </Col>
                            <Col xs="2">
                                <Form.Control
                                    type="text"
                                    disabled
                                    value={
                                        searchDetail && searchDetail.data.line
                                    }
                                />
                            </Col>
                        </Row>
                        {/* {renderInheritance()}
                        <Row>
                            <Col xs="2" style={{textAlign: 'center'}}>
                                <Form.Label>어노테이션</Form.Label>
                            </Col>
                            <Col xs="10">
                                <Form.Label>{renderAnnotation()}</Form.Label>
                            </Col>
                        </Row> */}
                        <Row style={{paddingTop: '20px', paddingLeft: '20px'}}>
                            &nbsp;&nbsp;
                            <Button theme="primary" style={{width: '120px'}}>
                                어노테이션
                            </Button>
                            &nbsp;&nbsp;
                            <Button theme="success" style={{width: '120px'}}>
                                상속관계
                            </Button>
                            &nbsp;&nbsp;
                            <Button theme="danger" style={{width: '120px'}}>
                                영향도 분석
                            </Button>
                            &nbsp;&nbsp;
                            <Button theme="warning" style={{width: '120px'}}>
                                주석확인
                            </Button>
                        </Row>
                        {renderComment()}
                    </>
                }
            />
        </>
    );
};
export default ClazzDetailInfo;
