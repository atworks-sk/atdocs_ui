/* eslint-disable no-unused-vars */
import React from 'react';
import {useDispatch} from 'react-redux';
import {ContentHeader, Button} from '@components';
import {Container, Row, Col} from 'react-bootstrap';
import SnapshotSearch from '@pages/snapshot/components/SnapshotSearch';
import SnapshotTable from '@pages/snapshot/components/SnapshotTable';
import SnapshotCreate from '@pages/snapshot/popup/SnapshotCreate';

import {showModalSnapshotUpdate} from '../../store/snapshotStore';
/*
 * Method 조회/등록/수정 화면
 */
const Snapshot = () => {
    const dispatch = useDispatch();
    // 신규 스냅샷 등록
    const onClickNewSnapsho = () => {
        dispatch(showModalSnapshotUpdate());
    };
    return (
        <>
            <SnapshotCreate />
            <Container fluid>
                <Row>
                    <Col xs="12">
                        <ContentHeader title="snapshot" />
                    </Col>
                    <Col xs="12">
                        <Button
                            className="float-left"
                            theme="link"
                            onClick={(e) => onClickNewSnapsho()}
                        >
                            + 스냅샷 추가
                        </Button>
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
