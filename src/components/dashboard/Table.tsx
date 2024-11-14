import '../../app/shared.css';
import './Table.css';

import { useState } from 'react';
import { CellValidityProvider } from '../../lib/cell-validity';
import { TableHeader, TableData, TableMode, TableDataType } from '../../types/table-types';
import { LoadingTableBodyElement, TableBodyElement } from './table/TableBodyElement';
import { LoadingTableHeaderElement, TableHeaderElement } from './table/TableHeaderElement';

export interface TableProps {

    /** True if this table is loading. If loading, no given table data will be displayed. */
    loading?: boolean;

    /** True if the loading element should match the given table data (and header) */
    useDataWhileLoading?: boolean;

    /** Header data for the table (title and action buttons) */
    tableHeader?: TableHeader;

    /** Main data to be displayed for the table */
    tableData: TableData;

    /** Overrides the current mode of the table */
    modeOverride?: TableMode;

    /** The maximum number of columns for the table */
    maxCols?: number;
}

const Table = ({ loading = false, useDataWhileLoading = false, tableHeader, tableData, modeOverride, maxCols }: TableProps) => {
    const [mode, setMode] = useState<TableMode>(null);
    const [newRows, setNewRows] = useState<TableDataType[][] | null>(null);
    const [updates, setUpdates] = useState<(TableDataType | undefined)[][] | null>(null);
    const [rowsToDelete, setRowsToDelete] = useState<boolean[] | null>(null);

    const reset = () => {
        setNewRows(null);
        setUpdates(null);
        setRowsToDelete(null);
        setMode(null);
    }

    const header = loading && !useDataWhileLoading
        ? <LoadingTableHeaderElement />
        : tableHeader 
        ? <TableHeaderElement 
            tableHeader={
            loading 
            ? { title: tableHeader.title } 
            : tableHeader
            } 
            mode={mode == null && modeOverride != undefined ? modeOverride : mode} 
            setMode={setMode}
            newRows={newRows}
            updates={updates}
            rowsToDelete={rowsToDelete}
            reset={reset}
            empty={tableData.data.length == 0}
        />
        : null;

    const body = loading 
        ? <LoadingTableBodyElement
            tableData={useDataWhileLoading ? tableData : undefined}
            newRows={useDataWhileLoading ? newRows : null}
        /> 
        : <TableBodyElement 
            tableData={tableData} 
            mode={mode == null && modeOverride != undefined ? modeOverride : mode}
            newRows={newRows}
            setNewRows={setNewRows}
            updates={updates}
            setUpdates={setUpdates}
            rowsToDelete={rowsToDelete}
            setRowsToDelete={setRowsToDelete}
        />;

    return (
        <div 
            className={
                "app-table "
                + "content-unit " 
                + `${ !header ? 'no-header' : ''} ` 
                + `${ tableData.data.length == 1 ? 'one-row' : ''} `
            }

            style={{
                "--max-cols": maxCols
            } as React.CSSProperties}
        >
            <CellValidityProvider>
                { header }
                <div className="app-table-body">
                    { body }
                </div>
            </CellValidityProvider>
        </div>
    );
}

export default Table;