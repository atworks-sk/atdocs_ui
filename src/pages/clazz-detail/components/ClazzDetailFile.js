/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Card} from '@components';
import {Button, Row, Col, Form, InputGroup} from 'react-bootstrap';
// import ClazzSearch from '@pages/clazz/components/ClazzSearch';
// import ClazzTable from '@pages/clazz/components/ClazzTable';
// import {searchClazzDetail} from '../../store/clazzStore';
/*
 * Clazz 조회/등록/수정 화면
 */
const ClazzDetailFile = () => {
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
                title="파일 정보"
                body={
                    <>
                        <Row style={{paddingBottom: '10px'}}>
                            <Col xs="3" style={{textAlign: 'center'}}>
                                <Form.Label>파일 경로</Form.Label>
                            </Col>
                            <Col xs="9">
                                <Form.Control
                                    type="text"
                                    disabled
                                    value={
                                        searchDetail &&
                                        searchDetail.data.filePath
                                    }
                                />
                            </Col>
                        </Row>

                        <Row style={{paddingBottom: '10px'}}>
                            <Col xs="3" style={{textAlign: 'center'}}>
                                <Form.Label>파일명</Form.Label>
                            </Col>
                            <Col xs="9">
                                <Form.Control
                                    type="text"
                                    disabled
                                    value={
                                        searchDetail &&
                                        searchDetail.data.fileName
                                    }
                                />
                            </Col>
                        </Row>
                        <Row style={{paddingBottom: '10px'}}>
                            <Col xs="3" style={{textAlign: 'center'}}>
                                <Form.Label>등록일자</Form.Label>
                            </Col>
                            <Col xs="9">
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
                    </>
                }
            />
        </>
    );
};
export default ClazzDetailFile;
