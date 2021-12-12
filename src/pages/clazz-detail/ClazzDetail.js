/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {ContentHeader, Button} from '@components';
import {Container, Row, Col} from 'react-bootstrap';
// import ClazzSearch from '@pages/clazz/components/ClazzSearch';
// import ClazzTable from '@pages/clazz/components/ClazzTable';

import {searchClazzDetail} from '../../store/clazzStore';
/*
 * Clazz 조회/등록/수정 화면
 */
const ClazzDetail = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (history.action === 'PUSH') {
            if (location.state != null) {
                dispatch(searchClazzDetail(location.state.id));
            } else {
                // alert('TEST');
            }
            // const initData = searchClazzListFormInitData();
            // dispatch(searchClazzListSetForm(initData));
            // onSearchList(initData);
        }
        // 뒤로가기로 온 경우
        if (history.action === 'POP') {
            // onSearchList();
            // alert('pop');
        }
    }, []);
    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs="12">
                        <ContentHeader title="clazzDetail" />
                    </Col>
                    {/* <Col xs="12">
                        <ClazzSearch />
                    </Col>
                    <Col xs="12">
                        <ClazzTable />
                    </Col> */}
                </Row>
            </Container>
        </>
    );
};
export default ClazzDetail;
