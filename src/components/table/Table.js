/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {Pagination, Table as BootstrapTable} from 'react-bootstrap';
import Card from '../card/Card';
import styles from './Table.module.css';

const Table = ({
    tableName,
    rowKey,
    columns,
    data,
    movePage,
    onClick,
    onDoubleClick,
    disablePageView,
    isCard,
    customTableHeader,
    customTableHeaderRowCount,
    viewSelectedIndex
}) => {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    useEffect(() => {
        setSelectedIndex(-1);
        return () => {};
    }, [data]);

    const getColumnAlign = (column) => {
        if (column.align) {
            return `text-${column.align}`;
        }
        return 'text-center';
    };

    const getColumnWidth = (column) => {
        if (column.width) {
            return column.width;
        }
        return null;
    };

    const renderTableHeader = () => {
        if (customTableHeader) {
            <thead>{customTableHeader()}</thead>;
        }

        const renderTableHeaderDetail = () => {
            return (
                <tr>
                    {columns.map((column) => {
                        return (
                            <th
                                key={column.key}
                                className={getColumnAlign(column)}
                                width={getColumnWidth(column)}
                            >
                                {column.title}
                            </th>
                        );
                    })}
                </tr>
            );
        };
        if (customTableHeader === '') {
            return (
                <thead style={{display: 'none'}}>
                    {renderTableHeaderDetail()}
                </thead>
            );
        }
        return <thead>{renderTableHeaderDetail()}</thead>;
    };

    const renderTableColumn = (id, row, column) => {
        if (column.render && typeof column.render === 'function') {
            return column.render(id, row, column);
        }

        if (column.key) {
            return row[column.key];
        }

        return '';
    };

    const renderTableRow = (row) => {
        return columns.map((column) => {
            return (
                <td
                    key={column.key}
                    className={getColumnAlign(column)}
                    width={getColumnWidth(column)}
                >
                    {renderTableColumn(row[rowKey], row, column)}
                </td>
            );
        });
    };

    const getColLength = () => {
        return columns.length;
    };
    const getEmptyTableBody = () => {
        return (
            <tr>
                <td colSpan={getColLength()} className="text-center">
                    <div className="ant-empty ant-empty-normal">
                        <div className="ant-empty-image">
                            <svg
                                className="ant-empty-img-simple"
                                width="64"
                                height="41"
                                viewBox="0 0 64 41"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g
                                    transform="translate(0 1)"
                                    fill="none"
                                    fillRule="evenodd"
                                >
                                    <ellipse
                                        className="ant-empty-img-simple-ellipse"
                                        cx="32"
                                        cy="33"
                                        rx="32"
                                        ry="7"
                                    />
                                    <g
                                        className="ant-empty-img-simple-g"
                                        fillRule="nonzero"
                                    >
                                        <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
                                        <path
                                            d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                                            className="ant-empty-img-simple-path"
                                        />
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div className="ant-empty-description">No Data</div>
                    </div>
                </td>
            </tr>
        );
    };

    const getContentIndex = (rowIndex) => {
        if (customTableHeaderRowCount) {
            return rowIndex - customTableHeaderRowCount;
        }
        if (customTableHeader === '') {
            return rowIndex;
        }

        return rowIndex - 1;
    };

    const clickEventhandler = (event) => {
        const {rowIndex} = event.target.parentElement;

        if (!rowIndex && customTableHeaderRowCount !== 0) {
            return;
        }

        const contentIndex = getContentIndex(rowIndex);

        // header 값 제외하기
        const row = data.data.content[contentIndex];
        const key = rowKey ? row[rowKey] : null;

        if (onClick && typeof onClick === 'function') {
            onClick(key, row);
        }

        if (viewSelectedIndex) {
            setSelectedIndex(contentIndex);
        }
    };

    const doubleClickEventhandler = (event) => {
        const {rowIndex} = event.target.parentElement;

        if (!rowIndex && customTableHeaderRowCount !== 0) {
            return;
        }

        const contentIndex = getContentIndex(rowIndex);

        // header 값 제외하기
        const row = data.data.content[contentIndex];
        const key = rowKey ? row[rowKey] : null;

        if (onDoubleClick && typeof onDoubleClick === 'function') {
            onDoubleClick(key, row);
        }

        if (viewSelectedIndex) {
            setSelectedIndex(contentIndex);
        }
    };

    const renderTableBody = () => {
        if (!data) {
            return getEmptyTableBody();
        }
        const {empty} = data.data;
        if (empty) {
            return getEmptyTableBody();
        }

        if (data.data.content.length === 0) {
            return getEmptyTableBody();
        }

        return data.data.content.map((row, index) => {
            if (onDoubleClick && typeof onDoubleClick === 'function') {
                return (
                    <tr
                        key={row[rowKey]}
                        // onClick={clickEventhandler}
                        onDoubleClick={doubleClickEventhandler}
                        className={
                            index === selectedIndex ? styles.tableSelected : ''
                        }
                    >
                        {renderTableRow(row)}
                    </tr>
                );
            }
            if (clickEventhandler && typeof clickEventhandler === 'function') {
                return (
                    <tr
                        key={row[rowKey]}
                        onClick={clickEventhandler}
                        // onDoubleClick={doubleClickEventhandler}
                        className={
                            index === selectedIndex ? styles.tableSelected : ''
                        }
                    >
                        {renderTableRow(row)}
                    </tr>
                );
            }

            return <tr key={row[rowKey]}>{renderTableRow(row)}</tr>;
        });
    };

    const getEmptyPage = () => {
        return (
            <Pagination size="sm">
                <Pagination.First disabled />
                <Pagination.Prev disabled />
                <Pagination.Next disabled />
                <Pagination.Last disabled />
            </Pagination>
        );
    };

    const renderPagination = () => {
        if (disablePageView) {
            return <></>;
        }

        if (!data) {
            return getEmptyPage();
        }

        const pageViewUnit = 10;

        const {totalPages, first, last, number} = data.data; // number is current page
        const currentPage = number + 1;

        let startPage =
            Math.floor(currentPage / pageViewUnit) * pageViewUnit + 1;
        if (currentPage % pageViewUnit === 0) {
            startPage -= pageViewUnit;
        }

        let endPage =
            Math.floor(currentPage / pageViewUnit) * pageViewUnit +
            pageViewUnit;
        if (currentPage % pageViewUnit === 0) {
            endPage -= pageViewUnit;
        }
        if (endPage > totalPages) {
            endPage = totalPages;
        }

        return (
            <Pagination size="sm">
                <Pagination.First
                    disabled={first}
                    onClick={() => movePage(1)}
                />
                <Pagination.Prev
                    disabled={currentPage <= pageViewUnit}
                    onClick={() => movePage(startPage - pageViewUnit)}
                />

                {(() => {
                    const pageItemArray = [];
                    for (let index = startPage; index <= endPage; index += 1) {
                        pageItemArray.push(
                            <Pagination.Item
                                key={index}
                                active={currentPage === index}
                                onClick={() => movePage(index)}
                            >
                                {index}
                            </Pagination.Item>
                        );
                    }
                    return pageItemArray;
                })()}
                {/* */}
                <Pagination.Next
                    disabled={
                        Math.floor(currentPage / pageViewUnit) ===
                        Math.floor(totalPages / pageViewUnit)
                    }
                    onClick={() => movePage(startPage + pageViewUnit)}
                />
                <Pagination.Last
                    disabled={last}
                    onClick={() => movePage(totalPages)}
                />
            </Pagination>
        );
    };

    const renderBody = () => {
        if (isCard === 'N') {
            return (
                <>
                    <BootstrapTable
                        className="table table-hover text-nowrap"
                        responsive
                        // style={{minHeight: '200px'}}
                    >
                        {renderTableHeader()}
                        <tbody>{renderTableBody()}</tbody>
                    </BootstrapTable>{' '}
                    <div>{renderPagination()}</div>
                </>
            );
        }

        return (
            <>
                <Card
                    title={tableName}
                    body={
                        <>
                            <BootstrapTable
                                className="table table-hover text-nowrap"
                                responsive
                            >
                                {renderTableHeader()}

                                <tbody>{renderTableBody()}</tbody>
                            </BootstrapTable>{' '}
                            <div>{renderPagination()}</div>
                        </>
                    }
                />
            </>
        );
    };
    return <>{renderBody()}</>;
};

export default Table;
