/* eslint-disable no-unused-vars */
import React from 'react';
import {useDispatch} from 'react-redux';
import {ContentHeader, Button} from '@components';
import {Container, Row, Col} from 'react-bootstrap';
import SnapshotSearch from '@pages/snapshot/components/SnapshotSearch';
import SnapshotTable from '@pages/snapshot/components/SnapshotTable';

/*
 * Method 조회/등록/수정 화면
 */
const Snapshot = () => {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs="12">
                        <ContentHeader title="snapshot" />
                    </Col>
                    <Col xs="12">
                        <SnapshotSearch />
                    </Col>
                    <Col xs="12">
                        <SnapshotTable />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Snapshot;
