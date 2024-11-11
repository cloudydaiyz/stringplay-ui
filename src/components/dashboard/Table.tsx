import '../../app/shared.css';
import './Table.css';

import Button from '../common/Button';
import Check from '../svg/Check';
import Edit from '../svg/Edit';
import Plus from '../svg/Plus';
import Trash from '../svg/Trash';
import ThumbsUp from '../svg/ThumbsUp';
import XMark from '../svg/XMark';
import Pencil from '../svg/Pencil';
import XCircle from '../svg/XCircle';
import Minus from '../svg/Minus';

import { useState } from 'react';
import { useCellValidityContext, CellValidityProvider } from '../../lib/cell-validity';

export const PROPERTY_TYPES = [
  "string?", "string!", 
  "number?", "number!", // entries must be convertible to a number
  "boolean?", "boolean!", // entries must be either true or false
  "date?", "date!", // entries must be in ISO format
  "null",
] as const;

type TableMode = 'create' | 'edit' | 'delete' | null;

type TableDataType = string | boolean | number | Date | null;

/** Converts the data to the corresponding element for the table based on its type */
function tableDataToElement(data: TableDataType): string | JSX.Element {
  return data instanceof Date
    ? `${data.getMonth() + 1}/${data.getDate()}/${data.getFullYear()}`
    : data === null 
    ? '\u00A0'
    : typeof data == 'boolean'
    ? (data as boolean ? <Check /> : '')
    : data.toString()
}

function tableDataToInputValue(type: typeof PROPERTY_TYPES[number], data: TableDataType): string {
  if((type as string).startsWith('date') && data instanceof Date){
    if(Number.isNaN(data.getTime())) return "";

    return data.getFullYear() + "-" 
      + ("0" + (data.getMonth() + 1)).slice(-2) + "-"
      + ("0" + data.getDate()).slice(-2);
  } else if(data === null) {
    return "";
  }

  return data.toString();
}

interface TableHeader {

  /** Title for the table */
  title: string;

  /** 
   * Called when new rows are requested to be created for the table.
   * Called with the data for each row of the table.
   */
  onDataCreate?: (newRows: TableDataType[][]) => Promise<void>;

  /**
   * Called when rows are requested to be updated for the table.
   * 
   * Called with a 2D array, with the dimensions of the 1st order array matching
   * the dimensions of the table data. 
   * - If the element of the 1st order array is undefined, it skips over the
   *   row, leaving it unchanged. 
   * - If the element of the 1st order array is not undefined, it specifies an array 
   *   matching the dimensions of the corresponding row in the table data. If the element
   *   of the array is undefined, it leaves the item unchanged. Otherwise, it indicates
   *   the new value of the item at the array index.
   */
  onDataUpdate?: (updates: (TableDataType | undefined)[][]) => Promise<void>;

  /** 
   * Called when new rows are requested to be deleted from the table. 
   * Called with the indicies of rows to delete from the table.
   */
  onDataDelete?: (rowsToDelete: boolean[]) => Promise<void>;

  /** Called on successful operation */
  onSuccess?: () => void;

  /** Called on failed operation */
  onError?: () => void;
}

/** Information about the data to display for the table */
interface TableData {

  /** 
   * Information about each column in the table data array. 
   * The number of columns must match the number of columns in `data`.
   */
  columns: {
    title: string;
    type: typeof PROPERTY_TYPES[number];
    disableUpdate?: boolean;
    disableDelete?: boolean;
  }[];

  /** 
   * 2D array containing the table data.
   * Must be rectangular in shape, and the number of columns must match the length
   * of `columns`.
   */
  data: TableDataType[][];

  /** Rows that cannot be changed (updated/deleted) */
  immutableRows?: boolean[];

  /** Callback that validates data in the table on update */
  validateData?: (data: TableDataType, r: number, c: number) => boolean;
}

function LoadingTableHeaderElement() {
  return (
    <div className='app-table-header loading'>
      <span>Loading some sample text here</span>
    </div>
  );
}

interface TableHeaderElementProps {
  tableHeader: TableHeader;
  mode: TableMode;
  setMode: React.Dispatch<React.SetStateAction<TableMode>>;
  newRows: TableDataType[][] | null;
  updates: (TableDataType | undefined)[][] | null;
  rowsToDelete: boolean[] | null;
  empty: boolean;
  reset: () => void;
}

function TableHeaderElement({ tableHeader, mode, setMode, newRows, updates, rowsToDelete, reset, empty = false }: TableHeaderElementProps) {
  const { resetInvalidCells, getNumInvalidCells } = useCellValidityContext();

  const performAction = () => {
    if(getNumInvalidCells() > 0) return;

    if(tableHeader.onDataCreate && mode == 'create' && newRows) {
      console.log('Creating rows');
      console.log(newRows);

      tableHeader.onDataCreate(newRows)
        .then(() => tableHeader.onSuccess?.())
        .catch((err) => { tableHeader.onError?.(); console.log('error:', err) })
        .finally(() => { reset(); resetInvalidCells() });
    } else if(tableHeader.onDataUpdate && mode == 'edit' && updates) {
      console.log('Performing update');
      console.log(updates);

      tableHeader.onDataUpdate(updates)
        .then(() => tableHeader.onSuccess?.())
        .catch(() => tableHeader.onError?.())
        .finally(() => { reset(); resetInvalidCells(); tableHeader.onSuccess?.() });
    } else if(tableHeader.onDataDelete && mode == 'delete' && rowsToDelete) {
      console.log('Performing deletion');
      console.log(rowsToDelete);

      tableHeader.onDataDelete(rowsToDelete)
        .then(() => tableHeader.onSuccess?.())
        .catch(() => tableHeader.onError?.())
        .finally(() => { reset(); resetInvalidCells(); tableHeader.onSuccess?.() });
    }
  }

  const actions = mode 
    ? <div className='actions'>
      {tableHeader.onDataCreate && <Button text={<span><ThumbsUp />CONFIRM</span>} onClick={performAction} buttonType={2} />}
      {tableHeader.onDataUpdate && <Button text={<span><XMark />CANCEL</span>} onClick={() => {resetInvalidCells(); reset()}} buttonType={2} />}
    </div>
    : <div className='actions'>
      {tableHeader.onDataCreate && <Button text={<span><Plus />NEW</span>} onClick={() => setMode('create')} buttonType={2} />}
      {!empty && tableHeader.onDataUpdate && <Button text={<span><Edit />EDIT</span>} onClick={() => setMode('edit')} buttonType={2} />}
      {!empty && tableHeader.onDataDelete && <Button text={<span><Trash />DELETE</span>} onClick={() => setMode('delete')} buttonType={2} />}
    </div>

  return (
    <div className='app-table-header'>
      <div className='app-table-subheader'>
        <h3>{ tableHeader.title }</h3>
        { actions }
      </div>
      { mode && <p className='app-table-mode-text'>You are currently in <strong>{mode}</strong> mode.</p> }
    </div>
  );
}

interface LoadingTableBodyElementProps {
  tableData?: TableData;
  newRows: TableDataType[][] | null;
}

function LoadingTableBodyElement({ tableData, newRows }: LoadingTableBodyElementProps) {
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

function TableBodyElement(props: TableBodyElementProps) {
  const { tableData, mode, newRows, setNewRows, updates, setUpdates, rowsToDelete, setRowsToDelete } = props;
  const { invalidCells, setInvalidCell, unsetInvalidCell } = useCellValidityContext();

  /** Adds an empty row to the new set of rows */
  const addNewRow = () => {
    setNewRows(newRows
      ? [ ...newRows, Array(tableData.columns.length).fill(null) ]
      : [ Array(tableData.columns.length).fill(null) ]
    );
  }

  /** Removes the new row at specified index from the new set of rows */
  const removeNewRow = (index: number) => {
    const newRowsAfterRemove = newRows?.slice() || null;
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

  // The table body element
  if(tableData.data.length == 0) {
    if(tableData.columns.length == 0) {
      throw new Error("Invalid state: table cannot have 0 columns and no data")
    }

    const columnHeaders = <tr>
      { tableData.columns.map((item, c) => <th key={c} scope='col'>{item.title}</th>) }
    </tr>;

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
            <Pencil />
            {
              <input 
                type={
                  tableData.columns[c].type.startsWith('number')
                  ? 'number'
                  : tableData.columns[c].type.startsWith('date')
                  ? 'date'
                  : tableData.columns[c].type.startsWith('boolean')
                  ? 'checkbox'
                  : 'text'
                }
                onChange={(e) => {
                  let invalid = false;
                  const newRowsUpdate = newRows.slice();
                  if(e.currentTarget.value === "" && !tableData.columns[c].type.startsWith('boolean')) {
                    invalid = tableData.columns[c].disableDelete === true || tableData.columns[c].type.endsWith('!');
                    newRowsUpdate[r][c] = null;
                  } else if(tableData.columns[c].type.startsWith('number')) {
                    newRowsUpdate[r][c] = Number(e.currentTarget.value);
                  } else if(tableData.columns[c].type.startsWith('boolean')) {
                    newRowsUpdate[r][c] = e.currentTarget.checked;
                  } else if(tableData.columns[c].type.startsWith('date')) {
                    newRowsUpdate[r][c] = new Date(e.currentTarget.value);
                  } else {
                    newRowsUpdate[r][c] = e.currentTarget.value;
                  }
                  invalid = invalid 
                    || (
                      tableData.validateData 
                      ? tableData.validateData(newRowsUpdate[r][c], r, c)
                      : false
                    );

                  if(!invalid && invalidCells[r]?.[c]) unsetInvalidCell(r, c);
                  if(invalid && !invalidCells[r]?.[c]) setInvalidCell(r, c);
                  setNewRows(newRowsUpdate);
                }}
                className={ invalidCells[r]?.[c] ? 'invalid' : '' }
              />
            }
          </td>
        ))
      }
    </tr>)
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
                {/* The first index of all the rows specify the columns. */}
                { <button onClick={() => addNewRow()}><Plus /></button> }
              </td>
            </tr>
            : <td colSpan={tableData.columns.length} style={{textAlign:'center', height:'200px'}}>
              No data available
            </td>
          }
        </tbody>
      </table>
    )
  }
  
  if(tableData.data.length == 1) {
    const rows = tableData.data[0].map((item, c) => {

      /** The current element in the row to be displayed */
      let currentElement: JSX.Element;
      if(isEditingCell(0, c)) {
        currentElement = <td className='edit-cell'>
          <button onClick={() => cancelCellEdit(0, c)}><XCircle /></button>
          <Pencil />
          <input 
            type={
              tableData.columns[c].type.startsWith('number')
              ? 'number'
              : tableData.columns[c].type.startsWith('date')
              ? 'date'
              : tableData.columns[c].type.startsWith('boolean')
              ? 'checkbox'
              : 'text'
            } 
            defaultValue={
              updates?.[0][c] !== undefined 
                ? tableDataToInputValue(tableData.columns[c].type, updates![0][c]!)
                : tableDataToInputValue(tableData.columns[c].type, tableData.data[0][c])
            }
            defaultChecked={ tableData.data[0][c] as boolean }
            onChange={(e) => {
              let invalid = false;
              let newValue: TableDataType;
              if(e.currentTarget.value === "" && !tableData.columns[c].type.startsWith('boolean')) {
                invalid = tableData.columns[c].disableDelete === true || tableData.columns[c].type.endsWith('!');
                newValue = null;
              } else if(tableData.columns[c].type.startsWith('number')) {
                newValue = Number(e.currentTarget.value);
              } else if(tableData.columns[c].type.startsWith('boolean')) {
                newValue = e.currentTarget.checked;
              } else if(tableData.columns[c].type.startsWith('date')) {
                newValue = new Date(e.currentTarget.value);
              } else {
                newValue = e.currentTarget.value;
              }
              markCellEdit(0, c, newValue);
              invalid = invalid 
                || (
                  tableData.validateData 
                  ? tableData.validateData(newValue, 0, c)
                  : false
                );

              if(!invalid && invalidCells[0]?.[c]) unsetInvalidCell(0, c);
              if(invalid && !invalidCells[0]?.[c]) setInvalidCell(0, c);
            }}
            className={ invalidCells[0]?.[c] ? 'invalid' : '' }
          />
        </td>
      } else if(isDeletingRow(0)) {
        currentElement = <td className='delete-cell'>
          { c == 0 && <button onClick={() => cancelRowDelete(0)}><XCircle /></button> }
          <Trash />
          <span>{ tableDataToElement(item) }</span>
        </td>
      } else {
        currentElement = <td>
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
      }

      /** 
       * If in create mode, this represents the new values to create in the same 
       * column as the current element. 
       */
      const renderedNewRowElements = mode == 'create' && newRows
        ? newRows.map((_, r) => <td className='new-data' key={r}>
          { c == 0 && <button onClick={() => removeNewRow(r)}><XCircle /></button> }
          <Pencil />
          {
            <input 
              type={
                tableData.columns[c].type.startsWith('number')
                ? 'number'
                : tableData.columns[c].type.startsWith('date')
                ? 'date'
                : tableData.columns[c].type.startsWith('boolean')
                ? 'checkbox'
                : 'text'
              }
              onChange={(e) => {
                let invalid = false;
                const newRowsUpdate = newRows.slice();
                if(e.currentTarget.value === "" && !tableData.columns[c].type.startsWith('boolean')) {
                  invalid = tableData.columns[c].disableDelete === true || tableData.columns[c].type.endsWith('!');
                  newRowsUpdate[r][c] = null;
                } else if(tableData.columns[c].type.startsWith('number')) {
                  newRowsUpdate[r][c] = Number(e.currentTarget.value);
                } else if(tableData.columns[c].type.startsWith('boolean')) {
                  newRowsUpdate[r][c] = e.currentTarget.checked;
                } else if(tableData.columns[c].type.startsWith('date')) {
                  newRowsUpdate[r][c] = new Date(e.currentTarget.value);
                } else {
                  newRowsUpdate[r][c] = e.currentTarget.value;
                }
                invalid = invalid 
                  || (
                    tableData.validateData 
                    ? tableData.validateData(newRowsUpdate[r + tableData.data.length][c], r, c)
                    : false
                  );

                if(!invalid && invalidCells[r + tableData.data.length]?.[c]) unsetInvalidCell(r + tableData.data.length, c);
                if(invalid && !invalidCells[r + tableData.data.length]?.[c]) setInvalidCell(r + tableData.data.length, c);
                setNewRows(newRowsUpdate);
              }}
              className={ invalidCells[r + tableData.data.length]?.[c] ? 'invalid' : '' }
            />
          }
        </td>)
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

  const columnHeaders = <tr>
    { tableData.columns.map((item, c) => <th key={c} scope='col'>{item.title}</th>) }
  </tr>;

  const rows = tableData.data.map((row, r) => {
    const elements = row.map((item, c) => {
      if(isEditingCell(r, c)) {
        return <td className='edit-cell' key={c}>
          <button onClick={() => cancelCellEdit(r, c)}><XCircle /></button>
          <Pencil />
          <input 
            type={
              tableData.columns[c].type.startsWith('number')
              ? 'number'
              : tableData.columns[c].type.startsWith('date')
              ? 'date'
              : tableData.columns[c].type.startsWith('boolean')
              ? 'checkbox'
              : 'text'
            } 
            defaultValue={
              updates?.[r][c] !== undefined 
                ? tableDataToInputValue(tableData.columns[c].type, updates![r][c]!)
                : tableDataToInputValue(tableData.columns[c].type, tableData.data[r][c])
            }
            defaultChecked={ tableData.data[r][c] as boolean }
            onChange={(e) => {
              let invalid = false;
              let newValue: TableDataType;
              if(e.currentTarget.value === "" && !tableData.columns[c].type.startsWith('boolean')) {
                invalid = tableData.columns[c].disableDelete === true || tableData.columns[c].type.endsWith('!');
                newValue = null;
              } else if(tableData.columns[c].type.startsWith('number')) {
                newValue = Number(e.currentTarget.value);
              } else if(tableData.columns[c].type.startsWith('boolean')) {
                newValue = e.currentTarget.checked;
              } else if(tableData.columns[c].type.startsWith('date')) {
                newValue = new Date(e.currentTarget.value);
              } else {
                newValue = e.currentTarget.value;
              }
              markCellEdit(r, c, newValue);
              invalid = invalid 
                || (
                  tableData.validateData 
                  ? tableData.validateData(newValue, r, c)
                  : false
                );

              if(!invalid && invalidCells[r]?.[c]) unsetInvalidCell(r, c);
              if(invalid && !invalidCells[r]?.[c]) setInvalidCell(r, c);
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
        <Pencil />
        {
          <input 
            type={
              tableData.columns[c].type.startsWith('number')
              ? 'number'
              : tableData.columns[c].type.startsWith('date')
              ? 'date'
              : tableData.columns[c].type.startsWith('boolean')
              ? 'checkbox'
              : 'text'
            } 
            onChange={(e) => {
              let invalid = false;
              const newRowsUpdate = newRows.slice();
              if(e.currentTarget.value === "" && !tableData.columns[c].type.startsWith('boolean')) {
                invalid = tableData.columns[c].disableDelete === true || tableData.columns[c].type.endsWith('!');
                newRowsUpdate[r][c] = null;
              } else if(tableData.columns[c].type.startsWith('number')) {
                newRowsUpdate[r][c] = Number(e.currentTarget.value);
              } else if(tableData.columns[c].type.startsWith('boolean')) {
                newRowsUpdate[r][c] = e.currentTarget.checked;
              } else if(tableData.columns[c].type.startsWith('date')) {
                newRowsUpdate[r][c] = new Date(e.currentTarget.value);
              } else {
                newRowsUpdate[r][c] = e.currentTarget.value;
              }
              invalid = invalid 
                || (
                  tableData.validateData 
                  ? tableData.validateData(newRowsUpdate[r][c], r + tableData.data.length, c)
                  : false
                );
              
              if(!invalid && invalidCells[r + tableData.data.length]?.[c]) unsetInvalidCell(r + tableData.data.length, c);
              if(invalid && !invalidCells[r + tableData.data.length]?.[c]) setInvalidCell(r + tableData.data.length, c);
              setNewRows(newRowsUpdate);
            }}
            className={ invalidCells[r + tableData.data.length]?.[c] ? 'invalid' : '' }
          />
        }
      </td>);
      
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