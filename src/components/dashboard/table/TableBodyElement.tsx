import { useCellValidityContext } from "../../../lib/cell-validity";
import { tableDataToInputValue, tableDataToElement } from "../../../lib/table-helper";
import { TableData, TableDataType, TableMode } from "../../../types/table";

import Edit from "../../svg/Edit";
import Minus from "../../svg/Minus";
import Pencil from "../../svg/Pencil";
import Plus from "../../svg/Plus";
import Trash from "../../svg/Trash";
import XCircle from "../../svg/XCircle";

interface LoadingTableBodyElementProps {
    tableData?: TableData;
    newRows: TableDataType[][] | null;
}

export function LoadingTableBodyElement({ tableData, newRows }: LoadingTableBodyElementProps) {
    const numRows = tableData?.data?.length;
    const numCols = tableData?.columns?.length;

    if(numRows === 1) {
        const rows = tableData!.data[0].map((_, c) => (
            <tr key={c}>
            <th scope='row'><span>Loading...</span></th>
            <td><span>Loading...</span></td>
            { newRows?.map(() => <td className='new-data'><span>Loading...</span></td>) }
            </tr>
        ));

        return (
            <table className='loading'>
            <tbody>{ rows }</tbody>
            </table>
        );
    }

    const columnHeaders = Array(numCols !== undefined ? numCols : 5).fill(null).map((_, r) => (
        <th key={r} scope='col'>
            <span>Loading...</span>
        </th>
    ));

    const rows = Array((numRows !== undefined && numRows > 0 ? numRows : 7) + (newRows?.length || 0)).fill(null).map((_, c) => (
        <tr key={c}>
            {
            Array(numCols !== undefined ? numCols : 5).fill(null).map((_, j) => (
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
            <tr>{ columnHeaders }</tr>
            </thead>
            <tbody>{ rows }</tbody>
        </table>
    );
}

interface TableBodyElementProps {
    tableData: TableData;
    mode: TableMode;
    newRows: TableDataType[][] | null;
    setNewRows: React.Dispatch<React.SetStateAction<TableDataType[][] | null>>;
    updates: (TableDataType | undefined)[][] | null;
    setUpdates: React.Dispatch<React.SetStateAction<(TableDataType | undefined)[][] | null>>;
    rowsToDelete: boolean[] | null;
    setRowsToDelete: React.Dispatch<React.SetStateAction<boolean[] | null>>;
}

export function TableBodyElement(props: TableBodyElementProps) {
    const { tableData, mode, newRows, setNewRows, updates, setUpdates, rowsToDelete, setRowsToDelete } = props;
    const { invalidCells, setInvalidCell, bulkSetInvalidCell, unsetInvalidCell, bulkUnsetInvalidCell } = useCellValidityContext();

    console.log(invalidCells);

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

    // The table body element
    if(tableData.data.length == 0) {
        if(tableData.columns.length == 0) {
            throw new Error("Invalid state: table cannot have 0 columns and no data")
        }

        const columnHeaders = (
            <tr>
                { tableData.columns.map((item, c) => <th key={c} scope='col'>{item.title}</th>) }
            </tr>
        );

        /** 
         * If in create mode, this represents the new values to create in the same 
         * column as the current element. 
         */
        const renderedNewRowElements = mode == 'create' && newRows
            ? newRows.map((_, r) => <tr key={r}>
                {
                    tableData.columns.map((_, c) => (
                        <td className='new-data' key={r}>
                            { c == 0 && <button onClick={() => removeNewRow(r)}><XCircle /></button> }
                            {
                                tableData.columns[c].disableCreate
                                ? <span>&nbsp;</span>
                                : <>
                                    { <Pencil /> }
                                    {
                                        <input 
                                            type={getInputType(c)}
                                            onChange={(e) => {
                                                const newRowsUpdate = newRows.slice();
                                                newRowsUpdate[r][c] = getInputValueOnChange(e, c);
    
                                                validateCell(newRowsUpdate[r][c], r, c);
                                                setNewRows(newRowsUpdate);
                                            }}
                                            className={ invalidCells[r]?.[c] ? 'invalid' : '' }
                                        />
                                    }
                                </>
                            }
                        </td>
                    ))
                }
            </tr>
            )
            : null;

        return (
            <table>
                <thead>{ columnHeaders }</thead>
                <tbody>
                    { renderedNewRowElements }
                    {
                    mode == 'create'
                        ? <tr key={newRows?.length || 0}>
                            <td className='create-row'>
                            { 
                                /* The first index of all the rows specify the columns. */
                                <button onClick={() => addNewRow()}><Plus /></button> 
                            }
                            </td>
                        </tr>
                        : <td colSpan={tableData.columns.length} style={{textAlign:'center', height:'200px'}}>
                            No data available
                        </td>
                    }
                </tbody>
            </table>
        );
    }
    
    if(tableData.data.length == 1) {
        const rows = tableData.data[0].map((item, c) => {

            /** The current element in the row to be displayed */
            let currentElement: JSX.Element;
            if(isEditingCell(0, c)) {
                currentElement = (
                    <td className='edit-cell'>
                        <button onClick={() => cancelCellEdit(0, c)}><XCircle /></button>
                        <Pencil />
                        <input 
                            type={getInputType(c)} 
                            defaultValue={
                                updates?.[0][c] !== undefined 
                                ? tableDataToInputValue(tableData.columns[c].type, updates![0][c]!)
                                : tableDataToInputValue(tableData.columns[c].type, tableData.data[0][c])
                            }
                            defaultChecked={ tableData.data[0][c] as boolean }
                            onChange={(e) => {
                                let newValue = getInputValueOnChange(e, c);

                                validateCell(newValue, 0, c);
                                markCellEdit(0, c, newValue);
                            }}
                            className={ invalidCells[0]?.[c] ? 'invalid' : '' }
                        />
                    </td>
                );
            } else if(isDeletingRow(0)) {
                currentElement = (
                    <td className='delete-cell'>
                        { c == 0 && <button onClick={() => cancelRowDelete(0)}><XCircle /></button> }
                        <Trash />
                        <span>{ tableDataToElement(item) }</span>
                    </td>
                );
            } else {
                currentElement = (
                    <td>
                        <span>{ tableDataToElement(item) }</span>
                        { 
                            // Render the edit button in edit mode
                            mode == 'edit' && !tableData.columns[c].disableUpdate && !tableData.immutableRows?.[0]
                                && <button 
                                    className='edit-btn'
                                    onClick={() => { markCellEdit(0, c, tableData.data[0][c]!) }}
                                >
                                    <Edit />
                                </button>
                        }
                        {
                            // Render the delete button in delete mode
                            mode == 'delete' && !tableData.immutableRows?.[0]
                                && <button
                                    className='delete-btn'
                                    onClick={() => { markRowDelete(0) }}
                                >
                                    <Minus />
                                </button>
                        }
                    </td>
                );
            }

            /** 
             * If in create mode, this represents the new values to create in the same 
             * column as the current element. 
             */
            const renderedNewRowElements = mode == 'create' && newRows
            ? newRows.map((_, r) => <td className='new-data' key={r}>
                { c == 0 && <button onClick={() => removeNewRow(r)}><XCircle /></button> }
                {
                    tableData.columns[c].disableCreate 
                    ? <span>&nbsp;</span>
                    : <>
                        <Pencil />
                        {
                            <input 
                                type={getInputType(c)}
                                onChange={(e) => {
                                    const newRowsUpdate = newRows.slice();
                                    newRowsUpdate[r][c] = getInputValueOnChange(e, c);
        
                                    validateCell(newRowsUpdate[r][c], r + tableData.data.length, c);
                                    setNewRows(newRowsUpdate);
                                }}
                                className={ invalidCells[r + tableData.data.length]?.[c] ? 'invalid' : '' }
                            />
                        }
                    </>
                }
            </td>
            )
            : null;

            return (
            <tr key={c}>
                <th scope='row'>{ tableData.columns[c].title }</th>
                { currentElement }
                { renderedNewRowElements }
                {
                    mode == 'create'
                    && <td className='create-row'>
                        {/* The first index of all the rows specify the columns. */}
                        { c == 0 && <button onClick={() => addNewRow()}><Plus /></button> }
                    </td>
                }
            </tr>
            );
        });

        return (
            <table>
                <tbody>{rows}</tbody>
            </table>
        );
    }

    const columnHeaders = (
        <tr>
            { tableData.columns.map((item, c) => <th key={c} scope='col'>{item.title}</th>) }
        </tr>
    );

    const rows = tableData.data.map((row, r) => {
        const elements = row.map((item, c) => {
            if(isEditingCell(r, c)) {
                return <td className='edit-cell' key={c}>
                    <button onClick={() => cancelCellEdit(r, c)}><XCircle /></button>
                        <Pencil />
                    <input 
                        type={getInputType(c)} 
                        defaultValue={
                            updates?.[r][c] !== undefined 
                            ? tableDataToInputValue(tableData.columns[c].type, updates![r][c]!)
                            : tableDataToInputValue(tableData.columns[c].type, tableData.data[r][c])
                        }
                        defaultChecked={ tableData.data[r][c] as boolean }
                        onChange={(e) => {
                            let newValue = getInputValueOnChange(e, c);

                            validateCell(newValue, r, c);
                            markCellEdit(r, c, newValue);
                        }}
                        className={ invalidCells[r]?.[c] ? 'invalid' : '' }
                    />
                </td>
            } else if(isDeletingRow(r)) {
                return <td className='delete-cell' key={c}>
                    { c == 0 && <button onClick={() => cancelRowDelete(r)}><XCircle /></button> }
                    <Trash />
                    <span>{ tableDataToElement(item) }</span>
                </td>
            }

            return <td key={c}>
                <span>{ tableDataToElement(item) }</span>
                { 
                    // Render the edit button in edit mode
                    mode == 'edit' && !tableData.columns[c].disableUpdate && !tableData.immutableRows?.[r]
                    && <button 
                        className='edit-btn'
                        onClick={() => { markCellEdit(r, c, tableData.data[r][c]!) }}
                    >
                        <Edit />
                    </button>
                }
                {
                    // Render the delete button in delete mode
                    mode == 'delete' && !tableData.immutableRows?.[r]
                    && <button
                        className='delete-btn'
                        onClick={() => {
                        console.log('Time to delete');
                        markRowDelete(r);
                        }}
                    >
                        <Minus />
                    </button>
                }
            </td>
        });

        return (
            <tr key={r}>
                {elements}
            </tr>
        );
    });

    const renderedNewRows = mode == 'create' && newRows
        ? newRows.map((row, r) => {
            const elements = row.map((_, c) => <td className='new-data' key={c}>
                { c == 0 && <button onClick={() => removeNewRow(r)}><XCircle /></button> }
                {
                    tableData.columns[c].disableCreate 
                    ? <span>&nbsp;</span>
                    : <>
                        <Pencil />
                        {
                            <input 
                                type={getInputType(c)} 
                                onChange={(e) => {
                                    const newRowsUpdate = newRows.slice();
                                    newRowsUpdate[r][c] = getInputValueOnChange(e, c);
        
                                    validateCell(newRowsUpdate[r][c], r + tableData.data.length, c);
                                    setNewRows(newRowsUpdate);
                                }}
                                className={ invalidCells[r + tableData.data.length]?.[c] ? 'invalid' : '' }
                            />
                        }
                    </>
                }
                </td>
            );
            
            return (
                <tr key={r + tableData.data.length}>
                    {elements}
                </tr>
            );
        })
        : null;

    return (
        <table>
            <thead>{columnHeaders}</thead>
            <tbody>
            {rows} 
            {renderedNewRows}
            {
                mode == 'create'
                && <tr>
                    <td className='create-row'>
                        {/* The first index of all the rows specify the columns. */}
                        <button onClick={() => addNewRow()}><Plus /></button>
                    </td>
                </tr>
            }
            </tbody>
        </table>
    );
}