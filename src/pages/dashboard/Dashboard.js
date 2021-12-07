import React from 'react';
import {Row, Container} from 'react-bootstrap';
// 일자별 테스트 건수(성공, 실패건)
// import DashboardHeadContainer from '@app/containers/dashboard/DashboardHeadContainer';
// // 프로젝트별 최근 일주일간 테스트 이력
// import DashboardTestCntContainer from '@app/containers/dashboard/DashboardTestCntContainer';
// // 선택한 프로젝트 일별 테스트 성공/실패율
// import DashboardFailCntContainer from '@app/containers/dashboard/DashboardFailCntContainer';

const Dashboard = () => {
    return (
        <>
            <Container fluid>
                <br />
                <Row>
                    {/* <Col xs="12">
                        <DashboardHeadContainer />
                    </Col>
                    <Col xs="6">
                        <DashboardTestCntContainer />
                    </Col>
                    <Col xs="6" style={{height: '600px'}}>
                        <DashboardFailCntContainer />
                    </Col> */}
                </Row>
            </Container>
        </>
    );
};

export default Dashboard;
