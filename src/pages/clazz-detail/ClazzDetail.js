/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {ContentHeader, Spinner} from '@components';
import {Container, Row, Col} from 'react-bootstrap';
// import ClazzSearch from '@pages/clazz/components/ClazzSearch';
import ClazzDetailInfo from '@pages/clazz-detail/components/ClazzDetailInfo';
import ClazzDetailMethod from '@pages/clazz-detail/components/ClazzDetailMethod';

import {toast} from 'react-toastify';
import {getErrorMsg} from '../../lib/commonUiUtils';
import {searchClazzDetail} from '../../store/clazzStore';

/*
 * Clazz 조회/등록/수정 화면
 */
const ClazzDetail = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const {loading: searchLoading, error: searchError} = useSelector(
        (state) => state.clazz.searchClazzDetailRes
    );

    useEffect(() => {
        if (location.state != null) {
            dispatch(searchClazzDetail(location.state.id));
        } else {
            // alert('TEST');
        }
    }, []);

    /*
     * 서버 리스트 조회 실패 처리
     */
    useEffect(() => {
        if (!searchLoading && searchError) {
            toast.error(getErrorMsg(searchError, 'search'));
            // dispatch(searchClazzListClear());
        }
    }, [searchError]);

    return (
        <>
            <Spinner isLoading={searchLoading} />
            <Container fluid>
                <Row>
                    <Col xs="12">
                        <ContentHeader title="clazzDetail" />
                    </Col>
                    <Col xs="12">
                        <ClazzDetailInfo />
                    </Col>
                    <Col xs="12">
                        <ClazzDetailMethod />
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default ClazzDetail;
