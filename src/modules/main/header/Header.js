import React from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import Languages from './languages-dropdown/LanguagesDropdown';

const Header = ({toggleMenuSidebar}) => {
    const [t] = useTranslation();
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <button
                        onClick={() => toggleMenuSidebar()}
                        type="button"
                        className="nav-link"
                        data-widget="pushmenu"
                        href="#"
                    >
                        <i className="fas fa-bars" />
                    </button>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="/" className="nav-link">
                        {t('menusidebar.label.home')}
                    </Link>
                </li>
            </ul>

            <ul className="navbar-nav ml-auto">
                <Languages />
            </ul>
        </nav>
    );
};

export default Header;
