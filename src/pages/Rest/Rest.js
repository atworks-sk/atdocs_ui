/* eslint-disable no-unused-vars */
import React from 'react';
import {useDispatch} from 'react-redux';
import {ContentHeader, Button} from '@components';
import {Container, Row, Col} from 'react-bootstrap';
import RestSearch from '@app/pages/Rest/components/RestSearch';
import RestTable from '@pages/Rest/components/RestTable';

/*
 * API 찾기
 */
const Rest = () => {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs="12">
                        <ContentHeader title="rest" />
                    </Col>
                    <Col xs="12">
                        <RestSearch />
                    </Col>
                    <Col xs="12">
                        <RestTable />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Rest;
