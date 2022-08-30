import React, { useEffect, useState, useMemo } from 'react'
import { COLUMNS } from './spotifydatatablecolumns';
import { useTable } from 'react-table';

export default function SpotifyDataTable(props) {
    const columns = useMemo(() => COLUMNS, []);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(props.tracks);
    }, [props])

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