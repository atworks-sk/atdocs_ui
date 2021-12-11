/* eslint-disable no-unused-vars */
import React from 'react';
import {useDispatch} from 'react-redux';
import {ContentHeader, Button} from '@components';
import {Container, Row, Col} from 'react-bootstrap';
import ProjectSearch from '@pages/project/components/ProjectSearch';
import ProjectTable from '@pages/project/components/ProjectTable';
import ProjectUpdate from '@pages/project/popup/ProjectUpdate';
import {showModalProjectUpdate} from '../../store/projectStore';

/*
 * Clazz 조회/등록/수정 화면
 */
const Project = () => {
    const dispatch = useDispatch();

    const onClickProjectUpdate = () => {
        const initData = {
            id: -1
        };
        dispatch(showModalProjectUpdate(initData));
    };
    return (
        <>
            <ProjectUpdate />
            <Container fluid>
                <Row>
                    <Col xs="12">
                        <ContentHeader title="project" />
                    </Col>
                    <Col xs="12">
                        <Button
                            className="float-left"
                            theme="link"
                            onClick={(e) => onClickProjectUpdate()}
                        >
                            + 프로젝트 추가
                        </Button>
                    </Col>
                </Row>
                <ProjectSearch />
                <ProjectTable />
            </Container>
        </>
    );
};

export default Project;
