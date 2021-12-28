/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {ContentHeader, Spinner} from '@components';
import {Container, Row, Col, Tab, Tabs} from 'react-bootstrap';

import {toast} from 'react-toastify';
// import {MethodDetailInfo} from '@pages/method-detail/components/MethodDetailInfo';
import MethodDetailInfo from '@pages/method-detail/components/MethodDetailInfo';
import MethodDetailClazz from '@pages/method-detail/components/MethodDetailClazz';
import MethodDetailCall from '@pages/method-detail/components/MethodDetailCall';

import Source from '@app/pages/common/popup/Source';
import Comment from '@pages/common/popup/Comment';
import {
    searchMethodDetail,
    searchMethodDetailClear
} from '../../store/methodStore';
/*
 * Method 상세 조회
 */
const MethodDetail = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const {loading: searchLoading} = useSelector(
        (state) => state.method.searchMethodDetailRes
    );

    useEffect(() => {
        if (location.state != null) {
            dispatch(searchMethodDetailClear());
            dispatch(searchMethodDetail(location.state.id));
        } else {
            // alert('TEST');
        }
    }, []);

    return (
        <>
            <Spinner isLoading={searchLoading} />
            <Container fluid>
                <Row>
                    <Col xs="12">
                        <ContentHeader title="methodDetail" />
                    </Col>
                    <Col xs="8">
                        <MethodDetailInfo />
                    </Col>
                    <Col xs="4">
                        <MethodDetailClazz />
                    </Col>
                    <Col xs="12">
                        <MethodDetailCall />
                    </Col>
                </Row>
            </Container>
            <Source />
            <Comment />
        </>
    );
};
export default MethodDetail;
