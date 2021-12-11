/* eslint-disable no-unused-vars */
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';

const ContentHeader = ({title}) => {
    const [t] = useTranslation();
    const links = {
        project: [{id: 0, text: t('common.menu.home'), link: '/'}],
        clazz: [{id: 0, text: t('common.menu.home'), link: '/'}],
        snapshot: [{id: 0, text: t('common.menu.home'), link: '/'}]
    };

    const listItem = links[title].map((obj, index) => (
        // 키값 추가
        <li key={index.toString()} className="breadcrumb-item">
            <Link to={obj.link}>{obj.text}</Link>
        </li>
    ));

    return (
        <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h4>{t(`common.menuDesc.${title}`)}</h4>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            {listItem}
                            <li key="me" className="breadcrumb-item active">
                                {t(`common.menu.${title}`)}
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContentHeader;
