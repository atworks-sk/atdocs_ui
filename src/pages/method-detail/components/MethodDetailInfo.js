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
                &nbsp;&nbsp;
                <Button theme="danger" disabled style={{width: '120px'}}>
                    프로세스
                </Button>
            </Row>
        );
    };

    const renderParamData = () => {
        // no return data
        if (!searchDetail || searchDetail.data.paramList === null) return '';

        const {paramList} = searchDetail.data;

        const renderParamType = (methodParamType, isFirst) => {
            const renderParamTypeList = (obj, idx) => {
                const renderObject = (obj3, idx3, size) => {
                    const comma = idx3 + 1 === size ? '' : ', ';
                    const prefix = idx3 === 0 ? '<' : '';
                    const afterfix = idx3 + 1 === size ? '>' : '';

                    if (obj3.clazzId === 0) {
                        return (
                            <>
                                <Form.Label>{prefix}</Form.Label>
                                <Form.Label>{`${obj3.clazzName}`}</Form.Label>
                                {renderParamType(
                                    obj3.methodParamTypeList,
                                    false
                                )}
                                <Form.Label>{`${comma}`}</Form.Label>
                                <Form.Label>{afterfix}</Form.Label>
                            </>
                        );
                    }
                    return (
                        <>
                            <Form.Label>{prefix}</Form.Label>
                            <Form.Label
                                onClick={(e) => onClickMoveClazz(obj3.clazzId)}
                                style={{color: 'BLUE'}}
                            >
                                {` ${obj3.clazzName}`}
                            </Form.Label>
                            {/* {renderParamData(obj3.methodReturnList)} */}
                            {renderParamType(obj3.methodParamTypeList, false)}
                            <Form.Label>{`${comma}`}</Form.Label>
                        </>
                    );
                };

                if (obj.methodParamTypeList.length === 0) return <Form.Label />;

                return (
                    <>
                        {/* <Form.Label>{'<'}</Form.Label> */}
                        {obj.methodParamTypeList.map((obj2, idx2) => (
                            <>
                                {renderObject(
                                    obj2,
                                    idx2,
                                    obj.methodParamTypeList.length
                                )}
                            </>
                        ))}
                        {/* <Form.Label>{'>'}</Form.Label> */}
                    </>
                );
            };

            //
            // const afterfix = idx3 + 1 === size ? '>' : '';
            return (
                <>
                    {methodParamType.map((obj, idx) => (
                        // renderObject(obj, idx, methodReturnList.length)
                        <>
                            <Form.Label>
                                {idx === 0 && !isFirst ? '<' : ''}
                            </Form.Label>
                            <Form.Label>{` ${obj.clazzName}`}</Form.Label>
                            {renderParamTypeList(obj, idx)}
                            <Form.Label>
                                {idx + 1 === methodParamType.length && !isFirst
                                    ? '>'
                                    : ''}
                            </Form.Label>
                        </>
                    ))}
                </>
            );
        };

        const renderParamList = (obj, idx) => {
            const br = paramList.length === idx + 1 ? '' : <br />;
            try {
                return (
                    <>
                        {renderParamType(obj.methodParamTypeList, true)} &nbsp;
                        <Form.Label>{` ${obj.name}`}</Form.Label>
                        {br}
                    </>
                );
            } catch (e) {
                // 실패한 경우
                return (
                    <>
                        <Form.Label>{`${obj.typeText} ${obj.name}`}</Form.Label>
                        {br}
                    </>
                );
            }
        };

        return (
            <>
                {paramList.map((obj, idx) => (
                    <>{renderParamList(obj, idx)}</>
                ))}
            </>
        );
    };

    /*
     * 메서드 리턴 데이터 출력
     */
    const renderReturnData = () => {
        // no return data
        if (!searchDetail || searchDetail.data.methodReturn === null) return '';

        try {
            const {methodReturn} = searchDetail.data;
            const renderList = (methodReturnList) => {
                if (methodReturnList.length < 1) return '';
                const renderObject = (obj, idx, size) => {
                    const comma = idx + 1 === size ? '' : ', ';
                    if (obj.clazzId === 0) {
                        return (
                            <>
                                <Form.Label>{`${obj.clazzName}`}</Form.Label>
                                {renderList(obj.methodReturnList)}
                                <Form.Label>{`${comma}`}</Form.Label>
                            </>
                        );
                    }
                    return (
                        <>
                            <Form.Label
                                onClick={(e) => onClickMoveClazz(obj.clazzId)}
                                style={{color: 'BLUE'}}
                            >
                                {`${obj.clazzName}`}
                            </Form.Label>
                            {renderList(obj.methodReturnList)}
                            <Form.Label>{`${comma}`}</Form.Label>
                        </>
                    );
                };

                // methodReturnList list의 경우 ',' 으로 나누고
                // 세부항목은 '<>'로 감싸는 작업이 필요합니다.
                return (
                    <>
                        <Form.Label>{'<'}</Form.Label>
                        {methodReturnList &&
                            methodReturnList.map((obj, idx) =>
                                renderObject(obj, idx, methodReturnList.length)
                            )}
                        <Form.Label>{'>'}</Form.Label>
                    </>
                );
            };

            if (methodReturn.clazzId === 0) {
                return (
                    <>
                        <Form.Label>{`${methodReturn.clazzName}`}</Form.Label>
                        {renderList(methodReturn.methodReturnList)}
                    </>
                );
            }
            return (
                <>
                    <Form.Label
                        onClick={(e) => onClickMoveClazz(methodReturn.clazzId)}
                        style={{color: 'BLUE'}}
                    >
                        {`${methodReturn.clazzName}${renderList(
                            methodReturn.methodReturnList
                        )}`}
                    </Form.Label>
                </>
            );
        } catch (e) {
            return '';
        }
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
                            <Col xs="5">{renderParamData()}</Col>
                            {/* <Col xs="5">
                                {searchDetail &&
                                    searchDetail.data.methodParamList.map(
                                        (obj, idx) => (
                                            <>
                                                {renderParamData(obj)}
                                                <br />
                                            </>
                                        )
                                    )}
                                <br />
                                <Form.Label>파라매터</Form.Label>
                            </Col> */}
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
