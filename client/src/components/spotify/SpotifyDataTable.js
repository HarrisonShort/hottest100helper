import React, { useMemo, useState } from 'react'
import { COLUMNS } from './spotifydatatablecolumns';
import { useTable, useSortBy } from 'react-table';

import './SpotifyDataTable.css';
import { useEffect } from 'react';

export default function SpotifyDataTable(props) {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => [...props.tracks], [props.tracks]);
    const [currentSort, setCurrentSort] = useState([]);

    const tableHooks = (hooks) => {
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
        state: { sortBy }
    } = useTable({
        columns,
        data,
        initialState: { sortBy: currentSort }
    },
        useSortBy,
        tableHooks
    );

    useEffect(() => {
        setCurrentSort(sortBy)
    }, [sortBy])

    const noDataJsx = <p>{props.warningText}</p>;
    const headersJsx = (headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
            {
                headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render('Header')}
                        {
                            column.id === "shortlist" ? null : <span className="sort-icon">
                                {column.isSorted ?
                                    (column.isSortedDesc ? <img src={"../images/down_arrow.png"} alt="desc" /> : <img src={"../images/up_arrow.png"} alt="asc" />)
                                    : <img src={"../images/both_arrow.png"} alt="both" />}
                            </span>
                        }
                    </th>
                ))
            }
        </tr>
    )));
    const rowsJsx = (rows.map((row, i) => {
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
    }));

    return (
        <div>
            {data.length === 0 ? noDataJsx :
                <table {...getTableProps()}>
                    <thead>
                        {headersJsx}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rowsJsx}
                    </tbody>
                </table>
            }
        </div>
    )
}
