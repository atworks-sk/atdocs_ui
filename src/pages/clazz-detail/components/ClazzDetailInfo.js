/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Card} from '@components';
import {Row, Col, Form, InputGroup} from 'react-bootstrap';
import Button from '../../../components/button/Button';
import {
    showModalAnnotation,
    showModalComment,
    showModalInheritance
} from '../../../store/commonStore';
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

    /*
     * 추가적인 옵션 버튼
     */
    const renderAddOption = () => {
        if (!searchDetail) {
            return '';
        }

        /*
         * Annotaion
         */
        const onClickAnnotaion = () => {
            const initData = {
                title: '클래스 어노테이션',
                annotationList: searchDetail.data.clazzAnnotationList
            };
            dispatch(showModalAnnotation(initData));
        };

        /*
         * comment
         */
        const onClickComment = () => {
            const initData = {
                title: '클래스 주석',
                comment: searchDetail.data.comment
            };
            dispatch(showModalComment(initData));
        };

        const onClickInheritance = () => {
            const initData = {
                title: '클래스 상속관계',
                inheritanceList: searchDetail.data.inheritanceList,
                inheritancedList: searchDetail.data.inheritancedList
            };
            dispatch(showModalInheritance(initData));
        };

        const disalbedAnnotaion =
            searchDetail.data.clazzAnnotationList.length > 0;

        const disalbedInheritance =
            searchDetail.data.inheritanceList.length > 0 ||
            searchDetail.data.inheritancedList.length > 0;

        const disalbedComment = searchDetail.data.comment !== '';
        // renderInheritance
        return (
            <Row style={{paddingTop: '20px', paddingLeft: '20px'}}>
                &nbsp;&nbsp;
                <Button
                    theme="primary"
                    disabled={!disalbedAnnotaion}
                    onClick={onClickAnnotaion}
                    style={{width: '120px'}}
                >
                    어노테이션
                </Button>
                &nbsp;&nbsp;
                <Button
                    theme="success"
                    disabled={!disalbedInheritance}
                    onClick={onClickInheritance}
                    style={{width: '120px'}}
                >
                    상속관계
                </Button>
                &nbsp;&nbsp;
                <Button theme="danger" disabled style={{width: '120px'}}>
                    영향도 분석
                </Button>
                &nbsp;&nbsp;
                <Button
                    theme="warning"
                    disabled={!disalbedComment}
                    onClick={onClickComment}
                    style={{width: '120px'}}
                >
                    주석확인
                </Button>
            </Row>
        );
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
                         */}
                        {renderAddOption()}
                    </>
                }
            />
        </>
    );
};
export default ClazzDetailInfo;
