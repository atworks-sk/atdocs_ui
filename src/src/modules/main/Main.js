import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';

// import Dashboard from '@pages/Dashboard';
// import ServerContainer from '@app/containers/server/ServerContainer';

import DashBoard from '@pages/dashboard/Dashboard';
import MenuSidebar from '@modules/main/menu-sidebar/MenuSidebar';
import Header from './header/Header';
// eslint-disable-next-line no-unused-vars
import Footer from './footer/Footer';
import PageLoading from '../../components/page-loading/PageLoading';
// import MenuSidebar from './menu-sidebar/MenuSidebar';
// import MenuSidebarContainer from '../../containers/main/MenuSidebarContainer';

const Main = () => {
    const [appLoadingState, updateAppLoading] = useState(true);

    // common loading
    // const {showLoading} = useSelector((state) => state.commonUI);

    // 로그인 사용자 정보 조회

    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    useEffect(() => {
        // dispatch(getUserInfo());
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

    // document.getElementById('root').classList.remove('register-page');
    // document.getElementById('root').classList.remove('login-page');
    // document.getElementById('root').classList.remove('hold-transition');
    // document.getElementById('root').className += ' sidebar-mini';
    // document.getElementById('root').classList.add('sidebar-open');
    // document.getElementById('root').classList.remove('sidebar-collapse');

    return (
        <>
            <div className="wrapper">
                <Header toggleMenuSidebar={toggleMenuSidebar} />

                <MenuSidebar />

                <div className="content-wrapper">
                    <section className="content">
                        <Switch>
                            {/* <Route exact path="/profile" component={Profile} /> */}

                            <Route exact path="/" component={DashBoard} />
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
