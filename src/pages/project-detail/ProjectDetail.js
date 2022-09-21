/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {ContentHeader, Spinner} from '@components';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ProjectDetailInfo from '@app/pages/project-detail/components/ProjectDetailInfo';
import ProjectDetailWorks from '@app/pages/project-detail/components/ProjectDetailWorks';
import ProjectDetailWorkUpdate from '@app/pages/project-detail/popup/ProjectDetailWorkUpdate';
import ProjectDetailAddSource from '@app/pages/project-detail/popup/ProjectDetailAddSource';
import ProjectDetailSources from '@app/pages/project-detail/popup/ProjectDetailSources';

import {searchProjectDetail} from '../../store/projectStore';
import {searchWorks, searchWorksSetForm} from '../../store/workStore';

const ProjectDetail = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const {searchWorksForm} = useSelector((state) => state.work);

    const {loading: searchWorksLoading, error: searchWorksError} = useSelector(
        (state) => state.work.searchWorksRes
    );
    const {
        loading: searchProjectDetailLoading,
        error: searchProjectDetailError
    } = useSelector((state) => state.project.searchProjectDetailRes);

    const searchWorksEvent = (_searchWorksForm = searchWorksForm) => {
        dispatch(searchWorks(_searchWorksForm));
    };

    useEffect(() => {
        dispatch(searchProjectDetail(location.state.id));

        const searchWorksFormT = {...searchWorksForm};
        searchWorksFormT.projectId = location.state.id;

        // 조회
        dispatch(searchWorksSetForm(searchWorksFormT));
        searchWorksEvent(searchWorksFormT);
    }, []);

    return (
        <>
            <Spinner
                isLoading={searchWorksLoading || searchProjectDetailLoading}
            />
            <Container fluid>
                <Row>
                    <Col xs="12">
                        <ContentHeader title="projectDetail" />
                    </Col>
                    <Col xs="12">
                        <ProjectDetailInfo />
                    </Col>
                    <Col xs="8">
                        <ProjectDetailWorks
                            searchWorksEvent={searchWorksEvent}
                        />
                    </Col>
                </Row>
            </Container>
            <ProjectDetailWorkUpdate searchWorksEvent={searchWorksEvent} />
            <ProjectDetailAddSource />
            <ProjectDetailSources />
        </>
    );
};

export default ProjectDetail;
