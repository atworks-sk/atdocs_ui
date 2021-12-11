import React, {useEffect} from 'react';
import {Container, Row, Col, Form} from 'react-bootstrap';
import {Button, Card, Spinner} from '@components';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {
    searchProjectList,
    searchProjectListClear,
    searchProjectListSetForm,
    searchProjectListFormInitData
} from '../../../store/projectStore';

/*
 * Project 검색조건 Contanier
 */
const ProjectSearch = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {searchProjectListForm: searchForm} = useSelector(
        (state) => state.project
    );
    const {loading: searchLoading, error: searchError} = useSelector(
        (state) => state.project.searchProjectListRes
    );

    const onSearchList = (_seachFrom = searchForm) => {
        dispatch(searchProjectList(_seachFrom));
    };

    /*
     * '조회' button event
     */
    const onClickSearch = () => {
        // page만 1page로 변경하여 조회 이벤트 호출
        const searchFormT = {...searchForm};
        searchFormT.page = 1;
        dispatch(searchProjectListSetForm(searchFormT));
        onSearchList(searchFormT);
    };

    /*
     * 조회 조건 변경시
     */
    const onChangerFormData = (e) => {
        const searchFormT = {...searchForm};
        searchFormT[e.target.id] = e.target.value;
        dispatch(searchProjectListSetForm(searchFormT));
    };

    /*
     * 서버 리스트 조회 실패 처리
     */
    useEffect(() => {
        if (!searchLoading && searchError) {
            // toast.error(getErrorMsg(searchError, 'search'));
            dispatch(searchProjectListClear());
        }
    }, [searchError]);

    useEffect(() => {
        if (history.action === 'PUSH') {
            const initData = searchProjectListFormInitData();
            dispatch(searchProjectListSetForm(initData));
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
                        <Container fluid onKeyPress={onClickSearch}>
                            <Row>
                                <Col xs="3">
                                    <Form.Group>
                                        <Form.Label>프로젝트 명</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Project A"
                                            maxLength="40"
                                            id="projectName"
                                            onChange={onChangerFormData}
                                            value={
                                                searchForm &&
                                                searchForm.projectName
                                            }
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs="8" />
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

export default ProjectSearch;
