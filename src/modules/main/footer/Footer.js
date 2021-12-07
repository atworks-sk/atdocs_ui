import React from 'react';
import {useTranslation} from 'react-i18next';
// import {DateTime} from 'luxon';
import {version} from '../../../../package.json';

const Footer = () => {
    const [t] = useTranslation();

    return (
        <footer className="main-footer" style={{height: '30px'}}>
            <div className="float-right d-none d-sm-block">
                <b>{t('footer.version')}</b>
                <b> </b>
                <span>{version}</span>
            </div>
            <strong>
                <span>COPYRIGHTⓒ2021 BY SK INC. ALL RIGHTS RESERVED</span>
                {/* <a
                    href="https://skcc.co.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    skcc.co.kr
                </a>
                <span>.</span> */}
            </strong>
            {/* <span> </span> */}
            {/* <span>{t('footer.copyright')}</span> */}
        </footer>
    );
};

export default Footer;
