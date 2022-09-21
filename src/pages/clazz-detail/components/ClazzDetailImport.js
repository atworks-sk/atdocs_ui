/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {FaArrowRight} from 'react-icons/fa';
import {useHistory} from 'react-router-dom';
import {Button, Table} from '@components';

import {useDispatch, useSelector} from 'react-redux';
import {searchClazz} from '../../../store/clazzStore';
/*
 * Project 검색조건 Contanier
 */
const ClazzDetailImport = ({cardName, data}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const onClickChange = (row) => {
        if (row.id !== 0) dispatch(searchClazz(row.id));
    };

    const renderTableData = () => {
        if (!data) {
            return {data: {content: []}};
        }
        const temp = {
            data: {
                content: data.filter((obj) => obj.clazzId !== null)
            }
        };
        return temp;
    };

    const columns = [
        {
            title: '패키지명',
            key: 'packageName'
        },
        {
            title: '클래스명',
            key: 'clazzName'
        },
        {
            title: '',
            key: 'button',
            // eslint-disable-next-line no-unused-vars
            render: (id, row, column) => {
                return (
                    <>
                        <Button
                            theme="link"
                            onClick={() => onClickChange(row)}
                            disabled={row.id === 0}
                        >
                            <FaArrowRight />
                        </Button>
                    </>
                );
            }
        }
    ];

    return (
        <>
            <Table
                tableName={cardName}
                onDoubleClick={(id, row) => {
                    onClickChange(row);
                }}
                rowKey="id"
                columns={columns}
                disablePageView
                data={renderTableData()}
            />
        </>
    );
};

export default ClazzDetailImport;
