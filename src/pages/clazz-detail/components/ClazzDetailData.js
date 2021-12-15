/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {FaSearch, FaTrash} from 'react-icons/fa';
import {Form} from 'react-bootstrap';
import {Button, Table} from '@components';
import {useSelector, useDispatch} from 'react-redux';
import {searchClazzDetail} from '../../../store/clazzStore';

/*
 * Project 검색조건 Contanier
 */
const ClazzDetailData = () => {
    const dispatch = useDispatch();

    // const {data: searchDetail} = useSelector(
    //     (state) => state.clazz.searchClazzDetailRes
    // );

    const {data: searchDetail} = useSelector(
        (state) => state.clazz.searchClazzDetailRes
    );

    const onClickChange = (id) => {
        console.log(id);
        dispatch(searchClazzDetail(id));
        // dispatch(showModalProjectUpdate(initData));
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
            // eslint-disable-next-line no-debugger
            debugger;
            // elementClazzId: 0, elementName: 'ArrayList', elementDepth: 0

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
                        >{`${obj.elementName}`}</Form.Label>
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
        // {
        //     title: '리턴 타입',
        //     key: 'returnType',
        //     render: (id, row, column) => {
        //         return <>주석의 일부를 조회해서 설명으로..</>;
        //     }
        // },

        // {
        //     title: '라인수',
        //     key: 'line',
        //     render: (id, row, column) => {
        //         return (
        //             <>
        //                 <Button theme="link" onClick={() => onClickChange(row)}>
        //                     {row.line} Line
        //                 </Button>
        //             </>
        //         );
        //     }
        // {
        //     title: '생성일자',
        //     key: 'createDateTime'
        // },
        // {
        //     title: '',
        //     key: 'button',
        //     // eslint-disable-next-line no-unused-vars
        //     render: (id, row, column) => {
        //         return (
        //             <>
        //                 <Button theme="link" onClick={() => onClickChange(row)}>
        //                     <FaSearch />
        //                 </Button>
        //             </>
        //         );
        //     }
        // }
    ];

    return (
        <>
            {/* <Spinner isLoading={deleteLoading} /> */}
            <Table
                tableName="필드 리스트"
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
