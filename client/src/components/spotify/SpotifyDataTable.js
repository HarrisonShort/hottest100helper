import React, { useEffect, useState, useMemo } from 'react'
import { COLUMNS } from './spotifydatatablecolumns';
import { useTable } from 'react-table';

import './SpotifyDataTable.css';

export default function SpotifyDataTable(props) {
    const columns = useMemo(() => COLUMNS, []);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(props.tracks);
        console.log('data set to props.tracks')
        console.log(props.tracks)
    }, [props]);

    const onShortlistButtonPressed = (row) => {
        row.original.inShortlist = !row.original.inShortlist;
        props.handleShortlistButtonPress(row);
    }

    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
            ...columns, {
                id: "shortlist",
                Header: "Shortlist",
                Cell: ({ row }) => (
                    <button onClick={() => onShortlistButtonPressed(row)}>{row.original.inShortlist ? "Remove" : "Add"}</button>
                )
            }
        ])
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    }, tableHooks);

    const noDataJsx = <p>{props.warningText}</p>;
    const headersJsx = (headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
            {
                headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
    }))

    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                    {headersJsx}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rowsJsx}
                </tbody>
            </table>
            {data.length === 0 ? noDataJsx : ""}
        </div>
    )
}
