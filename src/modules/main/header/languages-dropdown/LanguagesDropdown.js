import React, {useRef, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

const languages = [
    {
        key: 'kr',
        icon: 'flag-icon-kr',
        label: 'header.language.korean'
    },
    {
        key: 'en',
        icon: 'flag-icon-us',
        label: 'header.language.english'
    }
];

const LanguagesDropdown = () => {
    const dropdownRef = useRef(null);
    const {t, i18n} = useTranslation();

    const [dropdownState, setDropdownState] = useState({
        isDropdownOpen: false
    });

    const toggleDropdown = () => {
        setDropdownState({isDropdownOpen: !dropdownState.isDropdownOpen});
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef &&
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setDropdownState({isDropdownOpen: false});
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside, false);
        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside,
                false
            );
        };
    });

    let className = 'dropdown-menu dropdown-menu-right p-0';

    if (dropdownState.isDropdownOpen) {
        className += ' show';
    }

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const getCurrentLanguage = () => {
        const currentLanguage = i18n.language;
        if (currentLanguage) {
            return languages.find(
                (language) => language.key === currentLanguage
            );
        }
        return {};
    };

    const isActiveLanguage = (language) => {
        if (language) {
            return getCurrentLanguage().key === language.key ? 'active' : '';
        }
        return '';
    };

    return (
        <li
            key="1"
            ref={dropdownRef}
            className="nav-item d-none d-sm-inline-block dropdown"
        >
            <button onClick={toggleDropdown} type="button" className="nav-link">
                <i className={`flag-icon ${getCurrentLanguage().icon}`} />
            </button>
            <div className={className}>
                {languages.map((language) => (
                    <button
                        key={language.key}
                        type="button"
                        className={`dropdown-item ${isActiveLanguage(
                            language
                        )}`}
                        onClick={() => {
                            changeLanguage(language.key);
                            setDropdownState(false);
                        }}
                    >
                        <i className={`flag-icon ${language.icon} mr-2`} />
                        <span>{t(language.label)}</span>
                    </button>
                ))}
            </div>
        </li>
    );
};

export default LanguagesDropdown;
