/* eslint-disable no-unused-vars */
import React from 'react';
import {useDispatch} from 'react-redux';
import {ContentHeader, Button} from '@components';
import {Container, Row, Col} from 'react-bootstrap';
import ClazzSearch from '@pages/clazz/components/ClazzSearch';
import ClazzTable from '@pages/clazz/components/ClazzTable';

/*
 * Clazz 조회/등록/수정 화면
 */
const Clazz = () => {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs="12">
                        <ContentHeader title="clazz" />
                    </Col>
                    {/* <Col xs="12">
                        <Button className="float-left" theme="link">
                            + 프로젝트 추가
                        </Button>
                    </Col> */}
                    <Col xs="12">
                        <ClazzSearch />
                    </Col>
                    <Col xs="12">
                        <ClazzTable />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Clazz;
