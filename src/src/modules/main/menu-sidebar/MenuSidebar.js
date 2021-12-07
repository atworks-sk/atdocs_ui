import React from 'react';
import {NavLink, Link} from 'react-router-dom';

const MenuSidebar = () => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to="/" className="brand-link">
                <img
                    src="/img/logo.png"
                    alt="atDocs Logo"
                    className="brand-image img-circle elevation-3"
                    style={{opacity: '.8'}}
                />
                <span className="brand-text font-weight-light">aTdocs</span>
            </Link>
            <div className="sidebar">
                <br />
                <nav className="mt-2" style={{overflowY: 'hidden'}}>
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        <li key="dashboard" className="nav-item">
                            <NavLink to="/" exact className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p>메인</p>
                            </NavLink>
                        </li>
                        <li key="server" className="nav-item">
                            <NavLink to="/project" exact className="nav-link">
                                <i className="nav-icon fas fa-database" />
                                <p>프로젝트</p>
                            </NavLink>
                        </li>
                        <li key="snapshot" className="nav-item">
                            <NavLink to="/server" exact className="nav-link">
                                <i className="nav-icon fas fa-database" />
                                <p>스냅샷</p>
                            </NavLink>
                        </li>
                        <li key="snapshot" className="nav-item">
                            <NavLink to="/clazz" exact className="nav-link">
                                <i className="nav-icon fas fa-database" />
                                <p>클래스</p>
                            </NavLink>
                        </li>
                        <li key="method" className="nav-item">
                            <NavLink to="/clazz" exact className="nav-link">
                                <i className="nav-icon fas fa-database" />
                                <p>메소드</p>
                            </NavLink>
                        </li>
                        <li key="api" className="nav-item">
                            <NavLink to="/clazz" exact className="nav-link">
                                <i className="nav-icon fas fa-database" />
                                <p>API 찾기</p>
                            </NavLink>
                        </li>
                        <li key="book" className="nav-item">
                            <NavLink to="/clazz" exact className="nav-link">
                                <i className="nav-icon fas fa-database" />
                                <p>업무정의</p>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default MenuSidebar;
