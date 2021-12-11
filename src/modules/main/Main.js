import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import DashBoard from '@pages/dashboard/Dashboard';
import Project from '@pages/project/Project';
import Clazz from '@pages/clazz/Clazz';
import MenuSidebar from '@modules/main/menu-sidebar/MenuSidebar';
import Header from './header/Header';
import Footer from './footer/Footer';
import PageLoading from '../../components/page-loading/PageLoading';

import {getProjectList} from '../../store/commonStore';

const Main = () => {
    const dispatch = useDispatch();
    const [appLoadingState, updateAppLoading] = useState(true);

    // common loading
    // const {showLoading} = useSelector((state) => state.commonUI);

    // 로그인 사용자 정보 조회

    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    useEffect(() => {
        dispatch(getProjectList());
        // dispatch(searchServer(''));
        // dispatch(searchCode());
        // dispatch(searchMember());

        updateAppLoading(true);
        const fetchProfile = async () => {
            await sleep(1000);
            updateAppLoading(false);
        };
        fetchProfile();
        return () => {};
    }, []);

    if (appLoadingState) {
        return <PageLoading />;
    }

    // side menu 무조건 전체로 고정
    const toggleMenuSidebar = () => {
        // updateMenusidebarState({
        //     isMenuSidebarCollapsed: !menusidebarState.isMenuSidebarCollapsed
        // });
    };

    return (
        <>
            <div className="wrapper">
                <Header toggleMenuSidebar={toggleMenuSidebar} />

                <MenuSidebar />

                <div className="content-wrapper">
                    <section className="content">
                        <Switch>
                            <Route exact path="/" component={DashBoard} />
                            <Route exact path="/project" component={Project} />
                            <Route exact path="/clazz" component={Clazz} />
                        </Switch>
                    </section>
                </div>
                {/* <Footer /> */}
                <Footer />
                <div
                    id="sidebar-overlay"
                    role="presentation"
                    onClick={toggleMenuSidebar}
                    onKeyDown={() => {}}
                />
            </div>
        </>
    );
};

export default Main;
