import React, { useEffect, useMemo } from 'react'
import { COLUMNS } from './spotifydatatablecolumns';
import { useTable } from 'react-table';

export default function SpotifyDataTable(props) {
    console.log(props)
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => props.tracks, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    });

    return (
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    console.log(row);
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
                })}
            </tbody>
        </table>
    )
}
