/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {ContentHeader, Spinner} from '@components';
import {Container, Row, Col, Tab, Tabs} from 'react-bootstrap';

import {toast} from 'react-toastify';
import {getErrorMsg} from '../../lib/commonUiUtils';

/*
 * Method 상세 조회
 */
const MethodDetail = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    return (
        <>
            {/* <Spinner isLoading={searchLoading} /> */}
            <Container fluid>
                <Row>
                    <Col xs="12">
                        <ContentHeader title="methodDetail" />
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default MethodDetail;
