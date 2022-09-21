/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {useEffect} from 'react';
import {Container, Row, Col, Form} from 'react-bootstrap';
import {useHistory, useLocation} from 'react-router-dom';
import {Button, Card, Spinner} from '@components';
import {useDispatch, useSelector} from 'react-redux';
import {createSnapshot} from '../../../store/snapshotStore';
import {getErrorMsg} from '../../../lib/commonUiUtils';

const ProjectDetailInfo = () => {
    // location.state.
    const dispatch = useDispatch();

    const {data: searchProjectDetailRes} = useSelector(
        (state) => state.project.searchProjectDetailRes
    );

    const {searchWorksForm} = useSelector((state) => state.work);
    // 분석 요청
    const onClickAnalysis = (e) => {
        dispatch(createSnapshot({projectId: searchWorksForm.projectId}));
    };

    //
    return (
        <>
            <Card
                title="Project Infomation"
                body={
                    <>
                        <Container fluid>
                            <Row>
                                <Col xs="3">
                                    <Form.Group>
                                        <Form.Label>Project Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="projectName"
                                            disabled
                                            value={
                                                searchProjectDetailRes &&
                                                searchProjectDetailRes.data
                                                    .projectName
                                            }
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs="9" />
                                <Col xs="4">
                                    <a
                                        className="btn btn-app"
                                        onClick={onClickAnalysis}
                                    >
                                        <i className="fas fa-video" />
                                        분석
                                    </a>
                                </Col>
                            </Row>
                        </Container>
                    </>
                }
            />
        </>
    );
};

export default ProjectDetailInfo;
