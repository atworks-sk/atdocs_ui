/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {Form} from 'react-bootstrap';
import {Button, Table} from '@components';
import {useSelector, useDispatch} from 'react-redux';
import {searchClazz} from '../../../store/clazzStore';

/*
 * Project 검색조건 Contanier
 */
const ClazzDetailData = () => {
    const dispatch = useDispatch();

    const {data: searchDetail} = useSelector(
        (state) => state.clazz.searchClazzRes
    );

    const onClickChange = (id) => {
        dispatch(searchClazz(id));
    };

    const renderTableData = () => {
        if (!searchDetail) {
            return {data: {content: []}};
        }
        const temp = {data: {content: searchDetail.data.filedList}};
        return temp;
    };

    const renderElementText = (row) => {
        const renderTemp = (obj, size) => {
            let prefix = '';
            let afterFix = '';

            if (obj.elementDepth !== 0 && size !== 1) {
                prefix = '<';
            }
            if (obj.elementDepth === size - 1 && size !== 1) {
                afterFix = '>';
            }

            if (obj.elementClazzId !== 0) {
                return (
                    <>
                        <span>{prefix}</span>
                        <Form.Label
                            onClick={(e) => onClickChange(obj.elementClazzId)}
                            style={{color: 'BLUE'}}
                        >
                            {`${obj.elementName}`}
                        </Form.Label>
                        <span>{afterFix}</span>
                    </>
                );
            }
            return (
                <>
                    <span>{prefix}</span>
                    <span>{`${obj.elementName}`}</span>
                    <span>{afterFix}</span>
                </>
            );
        };
        if (!row) {
            return '';
        }
        return (
            <>
                {row.elementList &&
                    row.elementList.map((obj) =>
                        renderTemp(obj, row.elementList.length)
                    )}
            </>
        );
    };

    const columns = [
        {
            title: '접근제한자',
            key: 'accessSpecifier'
        },
        {
            title: '필드 유형',
            key: 'elementText',
            render: (id, row, column) => {
                return renderElementText(row);
            }
        },
        {
            title: '필드명',
            key: 'filedName'
        },
        {
            title: '표현식',
            key: 'expression'
        }
    ];

    return (
        <>
            {/* <Spinner isLoading={deleteLoading} /> */}
            <Table
                tableName="데이터 리스트"
                onDoubleClick={(id, row) => {
                    onClickChange(row);
                }}
                // movePage={movePage}
                rowKey="id"
                columns={columns}
                disablePageView
                data={renderTableData()}
            />
        </>
    );
};

export default ClazzDetailData;
