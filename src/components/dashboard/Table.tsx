import '../../app/shared.css';
import './Table.css';

import { useState } from 'react';
import { CellValidityProvider } from '../../lib/cell-validity';
import { TableMode, TableDataType, TableProps } from '../../types/table-types';
import { LoadingTableBodyElement, TableBodyElement } from './table/TableBodyElement';
import { LoadingTableHeaderElement, TableHeaderElement } from './table/TableHeaderElement';
import { TableDataProvider, TableOperationsProvider } from '../../lib/table-data';

const Table = ({ loading = false, useDataWhileLoading = false, tableHeader, tableData, modeOverride, maxCols, maxRows }: TableProps) => {
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
            loading={loading}
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
    
    const tableBodyProps = {
        tableData,
        mode: mode == null && modeOverride != undefined ? modeOverride : mode,
        newRows,
        setNewRows,
        updates,
        setUpdates,
        rowsToDelete,
        setRowsToDelete
    }

    return (
        <CellValidityProvider>
            <TableDataProvider props={tableBodyProps}>
                <TableOperationsProvider props={tableBodyProps}>
                        <div 
                            className={
                                "app-table "
                                + "content-unit " 
                                + `${ !header ? 'no-header' : ''} ` 
                                + `${ tableData.data.length == 1 ? 'one-row' : ''} `
                            }
                            style={{
                                "--max-cols": maxCols,
                                "--max-rows": maxRows,
                            } as React.CSSProperties}
                        >
                            { header }
                            <div className="app-table-body">
                                { body }
                            </div>
                        </div>
                </TableOperationsProvider>
            </TableDataProvider>
        </CellValidityProvider>
    );
}

export default Table;