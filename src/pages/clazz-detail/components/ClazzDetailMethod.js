/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {Button, Table} from '@components';
import {useSelector, useDispatch} from 'react-redux';
import {FaArrowRight} from 'react-icons/fa';
import Source from '@app/pages/common/popup/Source';

import {useHistory} from 'react-router-dom';
import {showModalSource} from '../../../store/commonStore';

/*
 * Project 검색조건 Contanier
 */
const ClazzDetailMethod = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {data: searchDetail} = useSelector(
        (state) => state.clazz.searchClazzDetailRes
    );

    /*
     * show java source modal
     */
    const onClickLine = (row) => {
        const initData = {
            methodName: row.methodName,
            fullContents: row.fullContents
        };
        dispatch(showModalSource(initData));
    };

    /*
     * show java source modal
     */
    const onClickMethod = (row) => {
        history.push({
            pathname: '/method-detail',
            state: {
                id: row.id
            }
        });
    };

    const renderTableData = () => {
        if (!searchDetail) {
            return {data: {content: []}};
        }
        const temp = {data: {content: searchDetail.data.methodList}};
        return temp;
    };

    const renderParamCnt = (row) => {
        // eslint-disable-next-line no-debugger
        debugger;

        const {paramCnt} = row;

        return `${paramCnt} 건`;
        //
    };

    const columns = [
        {
            title: '접근제한자',
            key: 'accessSpecifier'
        },
        {
            title: '매서드 명',
            key: 'methodName'
        },
        {
            title: '리턴 타입',
            key: 'returnText'
        },
        {
            title: '파라메터',
            key: 'paramCnt',
            render: (id, row, column) => {
                return <>{renderParamCnt(row)}</>;
            }
        },
        {
            title: '라인수',
            key: 'line',
            render: (id, row, column) => {
                return (
                    <>
                        <Button theme="link" onClick={() => onClickLine(row)}>
                            {row.line} Line
                        </Button>
                    </>
                );
            }
        },
        {
            title: '',
            key: 'button',
            // eslint-disable-next-line no-unused-vars
            render: (id, row, column) => {
                return (
                    <>
                        <Button theme="link" onClick={() => onClickMethod(row)}>
                            <FaArrowRight />
                        </Button>
                    </>
                );
            }
        }
    ];

    return (
        <>
            <Source />
            <Table
                tableName="메서드 리스트"
                onDoubleClick={(id, row) => {
                    onClickMethod(row);
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

export default ClazzDetailMethod;
