import { TableDataProvider, TableOperationsProvider } from "../../../lib/table-data";
import type { LoadingTableBodyElementProps, TableBodyElementProps } from "../../../types/table-types";

import CreateRowTableCell from "./CreateRowTableCell";
import NewRowTableCell from "./NewRowTableCell";
import TableCell from "./TableCell";

export function LoadingTableBodyElement({ tableData, newRows }: LoadingTableBodyElementProps) {
    const numRows = tableData?.data?.length;
    const numCols = tableData?.columns?.length;

    if(numRows === 1) {
        const rows = tableData!.data[0].map((_, c) => (
            <tr key={c}>
                <th scope='row'>
                    <span>Loading...</span>
                </th>
                <td>
                    <span>Loading...</span>
                </td>
                { 
                    newRows?.map(() => (
                        <td className='new-data'>
                            <span>Loading...</span>
                        </td>
                    )) 
                }
            </tr>
        ));

        return (
            <table className='loading'>
                <tbody>
                    { rows }
                </tbody>
            </table>
        );
    }

    const columnHeaders = Array(numCols !== undefined ? numCols : 5).fill(null).map((_, r) => (
        <th key={r} scope='col'>
            <span>Loading...</span>
        </th>
    ));

    const rows = Array((numRows !== undefined && numRows > 0 ? numRows : 7) + (newRows?.length || 0))
        .fill(null).map((_, c) => (
            <tr key={c}>
                {
                    Array(numCols !== undefined ? numCols : 5)
                        .fill(null).map((_, j) => (
                            <td key={j}>
                                <span>Loading data...</span>
                            </td>
                        ))
                }
            </tr>
        ));

    return (
        <table className='loading'>
            <thead>
                <tr>
                    { columnHeaders }
                </tr>
            </thead>
            <tbody>
                { rows }
            </tbody>
        </table>
    );
}

export function TableBodyElement(props: TableBodyElementProps) {
    const { tableData, mode, newRows } = props;

    const columnHeaders = (
        <tr>
            { tableData.columns.map((item, c) => <th key={c} scope='col'>{item.title}</th>) }
        </tr>
    );

    // The table body element
    if(tableData.data.length == 0) {
        if(tableData.columns.length == 0) {
            throw new Error("Invalid state: table cannot have 0 columns and no data")
        }

        /** 
         * If in create mode, this represents the new values to create in the same 
         * column as the current element. 
         */
        const renderedNewRowElements = mode == 'create' && newRows
            ? newRows.map((_, r) => (
                <tr key={r}>
                    {
                        tableData.columns.map((_, c) => (
                            <NewRowTableCell key={r} r={r} c={c} />
                        ))
                    }
                </tr>
            ))
            : null;

        return (
            <TableDataProvider props={props}>
                <TableOperationsProvider props={props}>
                    <table>
                        <thead>
                            { columnHeaders }
                        </thead>
                        <tbody>
                            { renderedNewRowElements }
                            {
                                mode == 'create'
                                    ? <CreateRowTableCell />
                                    : <td 
                                        colSpan={tableData.columns.length} 
                                        style={{textAlign:'center', height:'200px'}}
                                    >
                                        No data available
                                    </td>
                            }
                        </tbody>
                    </table>
                </TableOperationsProvider>
            </TableDataProvider>
        );
    }
    
    if(tableData.data.length == 1) {
        const rows = tableData.data[0].map((_, c) => {

            /** The current element in the row to be displayed */
            const currentElement = <TableCell key={0} r={0} c={c} />

            /** 
             * If in create mode, this represents the new values to create in the same 
             * column as the current element. 
             */
            const renderedNewRowElements = mode == 'create' && newRows
                ? newRows.map((_, r) => (
                    <NewRowTableCell key={r + 1} r={r} c={c} />
                ))
                : null;

            return (
                <tr key={c}>
                    <th scope='row'>
                        { tableData.columns[c].title }
                    </th>
                    { currentElement }
                    { renderedNewRowElements }
                    <CreateRowTableCell oneRow={true} />
                </tr>
            );
        });

        return (
            <TableDataProvider props={props}>
                <TableOperationsProvider props={props}>
                    <table>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </TableOperationsProvider>
            </TableDataProvider>
        );
    }

    const rows = tableData.data.map((row, r) => {
        return (
            <tr key={r}>
                {
                    row.map((_, c) => (
                        <TableCell key={c} r={r} c={c} />
                    ))
                }
            </tr>
        );
    });

    const renderedNewRows = mode == 'create' && newRows
        ? newRows.map((row, r) => {
            return (
                <tr key={r + tableData.data.length}>
                    {
                        row.map((_, c) => (
                            <NewRowTableCell key={c} r={r} c={c} />
                        ))
                    }
                </tr>
            );
        })
        : null;

    return (
        <TableDataProvider props={props}>
            <TableOperationsProvider props={props}>
                <table>
                    <thead>
                        { columnHeaders }
                    </thead>
                    <tbody>
                        { rows } 
                        { renderedNewRows }
                        { mode == 'create' && <CreateRowTableCell /> }
                    </tbody>
                </table>
            </TableOperationsProvider>
        </TableDataProvider>
    );
}