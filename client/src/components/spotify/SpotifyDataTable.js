import React, { useMemo, useState, useEffect } from 'react'
import { useTable, useSortBy } from 'react-table';
import { useWindowSize } from '../../customHooks/useWindowSize';
import './SpotifyDataTable.css';

const columnHideWidth = 500;

export default function SpotifyDataTable(props) {
    const columns = useMemo(() => [...props.columns], [props.columns]);
    const data = useMemo(() => [...props.tracks], [props.tracks]);
    const [currentSort, setCurrentSort] = useState([]);
    const windowSize = useWindowSize();

    const tableHooks = (hooks) => {
        if (!props.showShortlist) {
            return;
        }

        hooks.visibleColumns.push((columns) => [
            ...columns, {
                id: "shortlist",
                Header: "Shortlist",
                Cell: ({ data, row }) => (
                    <button onClick={() => props.handleShortlistButtonPress(data, row)}>{row.original.inShortlist ? "Remove" : "Add"}</button>
                )
            }
        ])
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { sortBy },
        allColumns
    } = useTable({
        columns,
        data,
        initialState: { sortBy: currentSort }
    },
        useSortBy,
        tableHooks
    );

    useEffect(() => {
        setCurrentSort(sortBy);
    }, [sortBy])

    /**
     * In order to save space on smaller screens, we hide the album column in the case
     * that the screen is smaller than a certain size.
     */
    const toggleAlbumColumn = () => {
        let albumColumnIndex = allColumns.findIndex((column) => column.id === "album");
        let isVisible = allColumns[albumColumnIndex].isVisible;

        if ((windowSize.width > columnHideWidth && !isVisible)
            || (windowSize.width < columnHideWidth && isVisible)) {
            allColumns[albumColumnIndex].toggleHidden();
        }
    }

    const drawColumnHeaderGroup = (headerGroup) => {
        toggleAlbumColumn();

        return (
            <tr {...headerGroup.getHeaderGroupProps()}>
                {
                    headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())} id={column.id}>
                            {column.render('Header')}
                            {drawSortArrows(column)}
                        </th>
                    ))
                }
            </tr>
        )
    }

    const drawSortArrows = (column) => {
        return (
            column.id === "shortlist" ? null : <span className="sort-icon">
                {
                    column.isSorted ?
                        (
                            column.isSortedDesc ?
                                <img src={"/images/down_arrow.png"} alt="desc" />
                                : <img src={"/images/up_arrow.png"} alt="asc" />
                        )
                        : <img src={"/images/both_arrow.png"} alt="both" />
                }
            </span>
        )
    }

    const drawDataRows = () => {
        return (
            rows.map((row, i) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                        {
                            row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                            })
                        }
                    </tr>
                );
            })
        )
    }

    return (
        <div className="table-container">
            {
                data.length === 0 ?
                    <p>{props.warningText}</p> :
                    <table {...getTableProps()}>
                        <thead>
                            {
                                headerGroups.map(headerGroup => (
                                    drawColumnHeaderGroup(headerGroup)
                                ))
                            }
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {drawDataRows()}
                        </tbody>
                    </table>
            }
        </div>
    )
}
