/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Card} from '@components';
import {Row, Col, Form, InputGroup} from 'react-bootstrap';
import {FaSearch} from 'react-icons/fa';
import Button from '../../../components/button/Button';
import {showModalSource, showModalComment} from '../../../store/commonStore';

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
    const onClickMoveClazz = (id) => {
        history.push({
            pathname: '/clazz-detail',
            state: {
                id
            }
        });
    };

    /*
     * 추가적인 옵션 버튼
     */
    const renderAddOption = () => {
        if (!searchDetail) {
            return '';
        }
        /*
         * 소스 보여주기
         */
        const onClickSource = () => {
            const initData = {
                methodName: searchDetail.data.methodName,
                fullContents: searchDetail.data.fullContents
            };
            dispatch(showModalSource(initData));
        };

        /*
         * comment
         */
        const onClickComment = () => {
            const initData = {
                title: '매서드 주석',
                comment: searchDetail.data.comment
            };
            dispatch(showModalComment(initData));
        };

        // const disalbedAnnotaion =
        //     searchDetail.data.clazzAnnotationList.length > 0;

        // const disalbedInheritance =
        //     searchDetail.data.inheritanceList.length > 0 ||
        //     searchDetail.data.inheritedList.length > 0;

        const disalbedComment = searchDetail.data.comment !== '';
        // renderInheritance
        return (
            <Row style={{paddingTop: '20px', paddingLeft: '20px'}}>
                &nbsp;&nbsp;
                <Button
                    theme="primary"
                    // disabled={!disalbedAnnotaion}
                    onClick={onClickSource}
                    style={{width: '120px'}}
                >
                    소스보기
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
                {/* &nbsp;&nbsp;
                <Button
                    theme="success"
                    // disabled={!disalbedInheritance}
                    // onClick={onClickInheritance}
                    style={{width: '120px'}}
                >
                    상속관계
                </Button> */}
                &nbsp;&nbsp;
                <Button theme="danger" disabled style={{width: '120px'}}>
                    프로세스
                </Button>
            </Row>
        );
    };

    const renderParamData = (row) => {
        if (!searchDetail) return '';

        const {methodParamElementList} = row;

        const renderTemp = (obj, size, filedName) => {
            let prefix = '';
            let afterFix = '';

            if (obj.elementDepth !== 0 && size !== 1) {
                prefix = '<';
            }
            if (obj.elementDepth === size - 1 && size !== 1) {
                afterFix = '>';
            }
            if (obj.elementClazzId !== 0) {
                return (
                    <>
                        <span>{prefix}</span>
                        <Form.Label
                            onClick={(e) =>
                                onClickMoveClazz(obj.elementClazzId)
                            }
                            style={{color: 'BLUE'}}
                        >
                            {`${obj.elementClazzName}`}
                        </Form.Label>
                        &nbsp; &nbsp;
                        <Form.Label>{`${row.filedName}`}</Form.Label>
                        <span>{afterFix}</span>
                    </>
                );
            }
            if (obj.elementClazzId === size - 1) {
                return (
                    <>
                        <span>{prefix}</span>
                        <Form.Label>{`${obj.elementClazzName}`}</Form.Label>
                        <span>{afterFix}</span>
                        &nbsp; &nbsp;
                        <Form.Label>{`${row.filedName}`}</Form.Label>
                    </>
                );
            }
            return (
                <>
                    <span>{prefix}</span>
                    <Form.Label>{`${obj.elementClazzName}`}</Form.Label>
                    <span>{afterFix}</span>
                </>
            );
        };

        return (
            <>
                {searchDetail &&
                    methodParamElementList.map((obj) =>
                        renderTemp(obj, methodParamElementList.length)
                    )}
            </>
        );
    };

    const renderReturnData = () => {
        if (!searchDetail) return '';

        const renderTemp = (obj, size) => {
            let prefix = '';
            let afterFix = '';

            if (obj.elementDepth !== 0 && size !== 1) {
                prefix = '<';
            }
            if (obj.elementDepth === size - 1 && size !== 1) {
                afterFix = '>';
            }
            if (obj.elementClazzId !== 0) {
                return (
                    <>
                        <span>{prefix}</span>
                        <Form.Label
                            onClick={(e) =>
                                onClickMoveClazz(obj.elementClazzId)
                            }
                            style={{color: 'BLUE'}}
                        >
                            {`${obj.elementName}`}
                        </Form.Label>
                        <span>{afterFix}</span>
                    </>
                );
            }

            return (
                <>
                    <span>{prefix}</span>
                    <Form.Label>{`${obj.elementName}`}</Form.Label>
                    <span>{afterFix}</span>
                </>
            );
        };

        return (
            <>
                {searchDetail &&
                    searchDetail.data.methodReturnList.map((obj) =>
                        renderTemp(
                            obj,
                            searchDetail.data.methodReturnList.length
                        )
                    )}
            </>
        );
        // return <span>TEST</span>;
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
                            <Col xs="5">{renderReturnData()}</Col>
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
                        <Row style={{paddingBottom: '10px'}}>
                            <Col xs="2" style={{textAlign: 'center'}}>
                                <Form.Label>파라매터</Form.Label>
                            </Col>
                            <Col xs="5">
                                {searchDetail &&
                                    searchDetail.data.methodParamList.map(
                                        (obj, idx) => (
                                            <>
                                                {renderParamData(obj)}
                                                <br />
                                            </>
                                        )
                                    )}
                                {/* 
                                <br />
                                <Form.Label>파라매터</Form.Label> */}
                            </Col>
                            <Col xs="2" style={{textAlign: 'center'}}>
                                <Form.Label>생성일자</Form.Label>
                            </Col>
                            <Col xs="3">
                                <Form.Control
                                    type="text"
                                    disabled
                                    value={
                                        searchDetail &&
                                        searchDetail.data.createDateTime
                                    }
                                />
                            </Col>
                        </Row>
                        {/* {renderComment()} */}
                        {renderAddOption()}
                    </>
                }
            />
        </>
    );
};
export default MethodDetailInfo;
