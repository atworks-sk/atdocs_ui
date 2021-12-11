/* eslint-disable no-unused-vars */
import React from 'react';
import {useDispatch} from 'react-redux';
import {ContentHeader, Button} from '@components';
import {Container, Row, Col} from 'react-bootstrap';
import MethodSearch from '@pages/method/components/MethodSearch';
import MethodTable from '@pages/method/components/MethodTable';

/*
 * Method 조회/등록/수정 화면
 */
const Method = () => {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs="12">
                        <ContentHeader title="method" />
                    </Col>
                    <Col xs="12">
                        <MethodSearch />
                    </Col>
                    <Col xs="12">
                        <MethodTable />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Method;
