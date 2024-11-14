// Table Data & Table Operations contexts

import { createContext, useContext } from "react";
import { TableBodyElementProps, TableDataType } from "../types/table-types";
import { useCellValidityContext } from "./cell-validity";

/** Obtains values for the TableDataContext */
function useTableDataContextValue(props: TableBodyElementProps) {
    const { tableData, mode, newRows, updates } = props;
    const { invalidCells } = useCellValidityContext();

    return {
        tableData,
        invalidCells,
        mode,
        newRows,
        updates,
    }
}

function useTableOperationsContextValue(props: TableBodyElementProps) {
    const { tableData, newRows, setNewRows, updates, setUpdates, rowsToDelete, setRowsToDelete } = props;
    const { invalidCells, setInvalidCell, bulkSetInvalidCell, unsetInvalidCell, bulkUnsetInvalidCell } = useCellValidityContext();

    /** Adds an empty row to the new set of rows */
    const addNewRow = () => {
        const cells: [number, number][] = [];
        tableData.columns.forEach((col, c) => {
            if(col.type.endsWith("!") && !tableData.columns[c].disableCreate) {
                cells.push([tableData.data.length + (newRows?.length || 0), c]);
            }
        });
        bulkSetInvalidCell(cells);

        setNewRows(newRows
            ? [ ...newRows, Array(tableData.columns.length).fill(null) ]
            : [ Array(tableData.columns.length).fill(null) ]
        );
    }

    /** Removes the new row at specified index from the new set of rows */
    const removeNewRow = (index: number) => {
        const newRowsAfterRemove = newRows?.slice() || null;
        if(newRowsAfterRemove) {
            const cells: [number, number][] = [];
            tableData.columns.forEach((_, c) => {
                cells.push([tableData.data.length + index, c]);
            });
            bulkUnsetInvalidCell(cells);
        }
        newRowsAfterRemove?.splice(index, 1);
        setNewRows(newRowsAfterRemove);
    }

    /** Returns true if the cell at the given dimension is being edited */
    const isEditingCell = (r: number, c: number) => {
        return updates !== null && updates[r][c] !== undefined;
    }

    /** Marks a cell as being edited, and initializes the updates array if it's null. */
    const markCellEdit = (r: number, c: number, newValue: TableDataType) => {

        // Clone the 2D array of updates, or initialize it if it's not already defined
        const newUpdates = updates 
            ? updates.slice() 
            : Array.from(Array(tableData.data.length), () => Array(tableData.columns.length).fill(undefined));
        
        // Update the value
        newUpdates[r][c] = newValue;
        setUpdates(newUpdates);
    }

    /** Unsets the edit at the cell */
    const cancelCellEdit = (r: number, c: number) => {
        if(updates && updates[r][c] !== undefined) {
            const newUpdates = updates.slice();
            newUpdates[r][c] = undefined;
            setUpdates(newUpdates);
        }
    }

    /** True if the row is marked for deletion */
    const isDeletingRow = (r: number) => {
        return rowsToDelete != null && rowsToDelete[r];
    }

    /** Marks the row for deletion */
    const markRowDelete = (r: number) => {

        // Clone the 2D array of deletes, or initialize it if it's not already defined
        const newRowsToDelete = rowsToDelete 
            ? rowsToDelete.slice() 
            : Array(tableData.columns.length).fill(false);

        // Update the value
        newRowsToDelete[r] = true;
        setRowsToDelete(newRowsToDelete);
    }

    /** Unmarks the row for deletion */
    const cancelRowDelete = (r: number) => {
        if(rowsToDelete && rowsToDelete[r] == true) {
            const newRowsToDelete = rowsToDelete.slice();
            newRowsToDelete[r] = false;
            setRowsToDelete(newRowsToDelete);
        }
    }

    /** Returns the type for the input based on the column */
    const getInputType = (c: number) => {
        return tableData.columns[c].type.startsWith('number')
            ? 'number'
            : tableData.columns[c].type.startsWith('date')
            ? 'date'
            : tableData.columns[c].type.startsWith('boolean')
            ? 'checkbox'
            : 'text'
    }

    /** Returns the new table data value on input change */
    const getInputValueOnChange = (event: React.ChangeEvent<HTMLInputElement>, c: number) => {
        let value: TableDataType;
        if(event.currentTarget.value === "" && !tableData.columns[c].type.startsWith('boolean')) {
            value = null;
        } else if(tableData.columns[c].type.startsWith('number')) {
            value = Number(event.currentTarget.value);
        } else if(tableData.columns[c].type.startsWith('boolean')) {
            value = event.currentTarget.checked;
        } else if(tableData.columns[c].type.startsWith('date')) {
            value = new Date(event.currentTarget.value);
        } else {
            value = event.currentTarget.value;
        }
        return value;
    }

    const validateCell = (value: TableDataType, r: number, c: number) => {
        let invalid = false;
        if((value === "" || value === null) && !tableData.columns[c].type.startsWith('boolean')) {
            invalid = tableData.columns[c].disableDelete === true || tableData.columns[c].type.endsWith('!');
        }
        invalid = invalid 
            || (
            tableData.validateData 
            ? !tableData.validateData(value, r + tableData.data.length, c)
            : false
            );
        
        if(!invalid && invalidCells[r]?.[c]) unsetInvalidCell(r, c);
        if(invalid && !invalidCells[r]?.[c]) setInvalidCell(r, c);
    }

    return {
        addNewRow,
        removeNewRow,
        isEditingCell,
        markCellEdit,
        cancelCellEdit,
        isDeletingRow,
        markRowDelete,
        cancelRowDelete,
        getInputType,
        getInputValueOnChange,
        validateCell,
        setNewRows,
    }
}

const TableDataContext = createContext<ReturnType<typeof useTableDataContextValue> | undefined>(undefined);

export function useTableDataContext(): ReturnType<typeof useTableDataContextValue> {
    const client = useContext(TableDataContext);
    if(client === undefined) {
        throw new Error("Invalid state. Make sure that you're using `TableDataProvider` correctly.");
    }
    return client;
}

export const TableDataProvider = ({ props, children }: { props: TableBodyElementProps, children: React.ReactNode }) => {
    const tableData = useTableDataContextValue(props);
    return (
        <TableDataContext.Provider value={tableData}>
            {children}
        </TableDataContext.Provider>
    );
}

const TableOperationsContext = createContext<ReturnType<typeof useTableOperationsContextValue> | undefined>(undefined);

export function useTableOperationsContext(): ReturnType<typeof useTableOperationsContextValue> {
    const client = useContext(TableOperationsContext);
    if(client === undefined) {
        throw new Error("Invalid state. Make sure that you're using `TableOperationsProvider` correctly.");
    }
    return client;
}

export const TableOperationsProvider = ({ props, children }: { props: TableBodyElementProps, children: React.ReactNode }) => {
    const tableData = useTableOperationsContextValue(props);
    return (
        <TableOperationsContext.Provider value={tableData}>
            {children}
        </TableOperationsContext.Provider>
    );
}