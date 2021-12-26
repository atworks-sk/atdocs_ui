/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {Container, Row, Col, Form} from 'react-bootstrap';
import {Button, Card, Spinner} from '@components';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {getErrorMsg} from '../../../lib/commonUiUtils';

import {
    searchRestList,
    searchRestListClear,
    searchRestListFormInitData,
    searchRestListSetForm
} from '../../../store/restStore';
/*
 * Project 검색조건 Contanier
 */
const RestSearch = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {searchRestListForm: searchForm} = useSelector((state) => state.rest);

    const {loading: searchLoading, error: searchError} = useSelector(
        (state) => state.rest.searchRestListRes
    );

    const {data: projectList} = useSelector(
        (state) => state.common.projectList
    );

    const onSearchList = (_seachFrom = searchForm) => {
        dispatch(searchRestList(_seachFrom));
    };

    /*
     * '조회' button event
     */
    const onClickSearch = () => {
        // page만 1page로 변경하여 조회 이벤트 호출
        const searchFormT = {...searchForm};
        searchFormT.page = 1;
        dispatch(searchRestListSetForm(searchFormT));
        onSearchList(searchFormT);
    };

    /*
     * 조회 조건 변경시
     */
    const onChangerFormData = (e) => {
        const searchFormT = {...searchForm};
        searchFormT[e.target.id] = e.target.value;
        dispatch(searchRestListSetForm(searchFormT));
    };

    /*
     * 서버 리스트 조회 실패 처리
     */
    useEffect(() => {
        if (!searchLoading && searchError) {
            toast.error(getErrorMsg(searchError, 'search'));
            dispatch(searchRestListClear());
        }
    }, [searchError]);

    useEffect(() => {
        if (history.action === 'PUSH') {
            const initData = searchRestListFormInitData();
            dispatch(searchRestListSetForm(initData));
            onSearchList(initData);
        }
        // 뒤로가기로 온 경우
        if (history.action === 'POP') {
            onSearchList();
        }
    }, []);

    return (
        <>
            <Spinner isLoading={searchLoading} />
            <Card
                title="검색조건"
                body={
                    <>
                        <Container
                            fluid
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') onClickSearch();
                            }}
                        >
                            <Row>
                                <Col xs="2">
                                    <Form.Group>
                                        <Form.Label>프로젝트</Form.Label>
                                        <Form.Control
                                            as="select"
                                            id="projectId"
                                            onChange={onChangerFormData}
                                            value={
                                                (searchForm &&
                                                    searchForm.projectId) ||
                                                ''
                                            }
                                        >
                                            <option value="">전체</option>{' '}
                                            {projectList &&
                                                projectList.data.map((obj) => (
                                                    <option
                                                        key={obj.id}
                                                        value={obj.id}
                                                    >
                                                        {obj.projectName}
                                                    </option>
                                                ))}{' '}
                                            {/* */}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs="3">
                                    <Form.Group>
                                        <Form.Label>URL</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="/test.do"
                                            maxLength="40"
                                            id="urlPath"
                                            onChange={onChangerFormData}
                                            value={
                                                searchForm && searchForm.urlPath
                                            }
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs="6" />
                                <Col xs="1">
                                    <Form.Group>
                                        <Form.Label />
                                        <Button
                                            type="button"
                                            className="btn btn-block btn-secondary"
                                            isLoading={searchLoading}
                                            onClick={onClickSearch}
                                        >
                                            검색
                                            {/* {t('common.button.search')} */}
                                        </Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                    </>
                }
            />
        </>
    );
};

export default RestSearch;
