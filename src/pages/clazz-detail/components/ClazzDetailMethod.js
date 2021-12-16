/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {Button, Table} from '@components';
import {useSelector, useDispatch} from 'react-redux';
import JavaSource from '@pages/common/popup/JavaSource';
import {FaSearch} from 'react-icons/fa';
import {showModalJavaSource} from '../../../store/commonStore';

/*
 * Project 검색조건 Contanier
 */
const ClazzDetailMethod = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // const {data: searchDetail} = useSelector(
    //     (state) => state.clazz.searchClazzDetailRes
    // );

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
        dispatch(showModalJavaSource(initData));
    };

    const onClickMove = (row) => {
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
            key: 'methodDesc',
            render: (id, row, column) => {
                return <>3건</>;
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
                        <Button theme="link" onClick={() => onClickMove(row)}>
                            <FaSearch />
                        </Button>
                    </>
                );
            }
        }
    ];

    return (
        <>
            {/* <Spinner isLoading={deleteLoading} /> */}
            <JavaSource />
            <Table
                tableName="메서드 리스트"
                onDoubleClick={(id, row) => {
                    onClickMove(row);
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
