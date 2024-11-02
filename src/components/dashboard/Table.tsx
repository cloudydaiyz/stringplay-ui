import { useState } from 'react';
import '../../app/shared.css';
import Button from '../common/Button';
import Check from '../svg/Check';
import Edit from '../svg/Edit';
import Plus from '../svg/Plus';
import Trash from '../svg/Trash';
import './Table.css';

import assert from 'assert';
import ThumbsUp from '../svg/ThumbsUp';
import XMark from '../svg/XMark';
import Pencil from '../svg/Pencil';
import XCircle from '../svg/XCircle';

export const PROPERTY_TYPES = [
  "string?", "string!", 
  "number?", "number!", // entries must be convertible to a number
  "boolean?", "boolean!", // entries must be either true or false
  "date?", "date!", // entries must be in ISO format
  "null",
] as const;

type TableMode = 'create' | 'edit' | 'delete' | null;

type TableDataType = string | boolean | number | Date | null;

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
   * row, leaving it unchanged. 
   * - If the element of the 1st order array is not undefined, it specifies an array 
   * matching the dimensions of the corresponding row in the table data. If the element
   * of the array is undefined, it leaves the item unchanged. Otherwise, it indicates
   * the new value of the item at the array index.
   */
  onDataUpdate?: (updates: ((TableDataType | undefined)[] | undefined)[]) => Promise<void>;

  /** 
   * Called when new rows are requested to be deleted from the table. 
   * Called with the indicies of rows to delete from the table.
   */
  onDataDelete?: (rowsToDelete: boolean[]) => Promise<void>;
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
    canUpdate?: boolean;
    canDelete?: boolean;
  }[];

  /** 
   * 2D array containing the table data.
   * Must be rectangular in shape, and the number of columns must match the length
   * of `columns`.
   */
  data: TableDataType[][];
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
  updates: ((TableDataType | undefined)[] | undefined)[] | null;
  rowsToDelete: boolean[] | null;
  reset: () => void;
}

function TableHeaderElement({ tableHeader, mode, newRows, setMode, reset }: TableHeaderElementProps) {
  const performAction = () => {
    if(mode == 'create' && newRows) {
      console.log('Creating rows');
      console.log(newRows);
      tableHeader?.onDataCreate && tableHeader?.onDataCreate(newRows);
    }
    reset();
  }

  const actions = mode 
    ? <div className='actions'>
      {tableHeader.onDataCreate && <Button text={<span><ThumbsUp />CONFIRM</span>} onClick={performAction} buttonType={2} />}
      {tableHeader.onDataUpdate && <Button text={<span><XMark />CANCEL</span>} onClick={reset} buttonType={2} />}
    </div>
    : <div className='actions'>
      {tableHeader.onDataCreate && <Button text={<span><Plus />NEW</span>} onClick={() => setMode('create')} buttonType={2} />}
      {tableHeader.onDataUpdate && <Button text={<span><Edit />EDIT</span>} onClick={() => setMode('edit')} buttonType={2} />}
      {tableHeader.onDataDelete && <Button text={<span><Trash />DELETE</span>} onClick={() => setMode('delete')} buttonType={2} />}
    </div>

  return (
    <div className='app-table-header'>
      <div className='app-table-subheader'>
        <h3>{tableHeader.title}</h3>
        { actions }
      </div>
      { mode && <p>You are currently in <strong>{mode}</strong> mode.</p> }
    </div>
  );
}

function LoadingTableBodyElement() {
  const columnHeaders = Array(5).fill(null).map((_, i) => <th key={i} scope='col'><span>Loading...</span></th>);
  const rows = Array(7).fill(null).map((_, i) => (
      <tr key={i}>
        {
          Array(5).fill(null).map((_, j) => <td key={j}><span>Loading data...</span></td>)
        }
      </tr>
    )
  );

  return (
    <table className='loading'>
      <thead>
        <tr>{ columnHeaders }</tr>
      </thead>
      <tbody>{ rows }</tbody>
    </table>
  );
}

function tableDataToElement(data: TableDataType): string | JSX.Element {
  return data instanceof Date 
    ? `${data.getMonth()}/${data.getDate()}/${data.getFullYear()}`
    : data === null 
    ? ""
    : typeof data == 'boolean'
    ? (data as boolean ? <Check /> : '')
    : data.toString()
}

interface TableBodyElementProps {
  tableData: TableData;
  mode: TableMode;
  newRows: TableDataType[][] | null;
  setNewRows: React.Dispatch<React.SetStateAction<TableDataType[][] | null>>;
  updates: ((TableDataType | undefined)[] | undefined)[] | null;
  setUpdates: React.Dispatch<React.SetStateAction<((TableDataType | undefined)[] | undefined)[] | null>>;
  rowsToDelete: boolean[] | null;
  setRowsToDelete: React.Dispatch<React.SetStateAction<boolean[] | null>>;
}

function TableBodyElement({ tableData, mode, newRows, setNewRows }: TableBodyElementProps) {
  let body;

  /** Adds an empty row to the new set of rows */
  const addNewRow = () => {
    setNewRows(newRows
      ? [ ...newRows, Array(tableData.columns.length).fill(null) ]
      : [ Array(tableData.columns.length).fill(null) ]
    );
  }

  /** Removes the row at specified index from the new set of rows */
  const removeNewRow = (index: number) => {
    const newRowsAfterRemove = newRows?.slice() || null;
    newRowsAfterRemove?.splice(index, 1);
    setNewRows(newRowsAfterRemove);
  }

  if(tableData.data.length == 1) {
    const rows = tableData.data[0].map((item, i) => {
      const renderedNewRow = mode == 'create' && newRows
        ? newRows.map((_, j) => <td className='new-data' key={j}>
              { i == 0 && <button onClick={() => removeNewRow(j)}><XCircle /></button> }
              <Pencil />
              {
                <input 
                  type={
                    tableData.columns[i].type.startsWith('number')
                    ? 'number'
                    : tableData.columns[i].type.startsWith('date')
                    ? 'date'
                    : tableData.columns[i].type.startsWith('boolean')
                    ? 'checkbox'
                    : 'text'
                  } 
                  value={newRows[j][i]?.toString()}
                  onInput={(e) => {
                    if(tableData.columns[i].type.startsWith('string')) {
                      newRows[j][i] = e.currentTarget.value;
                    } else if(tableData.columns[i].type.startsWith('number')) {
                      newRows[j][i] = Number(e.currentTarget.value);
                    } else if(tableData.columns[i].type.startsWith('boolean')) {
                      newRows[j][i] = e.currentTarget.value == 'true' ? true : false;
                    } else {
                      newRows[j][i] = new Date(e.currentTarget.value);
                    }
                  }}
                />
              }
          </td>
        )
        : null;

      return (
        <tr key={i}>
          <th scope='row'>{ tableData.columns[i].title }</th>
          <td>
            { tableDataToElement(item) }
            { mode == 'edit' && <button className='edit-btn'><Edit /></button>}
          </td>
          { renderedNewRow }
          {
            mode == 'create'
            && <td className='create-row'>
              {/* Confusing, I know. But the first index of all the rows technically specify the columns. */}
              { i == 0 && <button onClick={() => addNewRow()}><Plus /></button> }
            </td>
          }
        </tr>
      );
    });

    body = <table>
      <tbody>
        {rows}
      </tbody>
    </table>;
  } else {
    const columnHeaders = <tr>
      { tableData.columns.map((c, i) => <th key={i} scope='col'>{c.title}</th>) }
    </tr>;

    const rows = tableData.data.map((row, i) => <tr key={i}>
      {
        row.map((item, i) => <td key={i}>{tableDataToElement(item)}</td>)
      }
    </tr>);

    body = <table>
      <thead>{columnHeaders}</thead>
      <tbody>{rows}</tbody>
    </table>;
  }

  return body;
}

interface TableProps {

  /** True if this table is loading. If loading, no given table data will be displayed. */
  loading?: boolean;

  /** Header data for the table (title and action buttons) */
  tableHeader?: TableHeader;

  /** Main data to be displayed for the table */
  tableData: TableData;

  /** Overrides the current mode of the table */
  modeOverride?: TableMode;
}

const Table = ({ loading = false, tableHeader, tableData, modeOverride }: TableProps) => {
  const [mode, setMode] = useState<TableMode>(null);
  const [newRows, setNewRows] = useState<TableDataType[][] | null>(null);
  const [updates, setUpdates] = useState<((TableDataType | undefined)[] | undefined)[] | null>(null);
  const [rowsToDelete, setRowsToDelete] = useState<boolean[] | null>(null);
  assert(loading || tableData.columns.length > 0);

  const reset = () => {
    setNewRows(null);
    setMode(null);
  }

  const header = loading
    ? <LoadingTableHeaderElement />
    : tableHeader 
    ? <TableHeaderElement 
        tableHeader={tableHeader} 
        mode={mode == null && modeOverride != undefined ? modeOverride : mode} 
        setMode={setMode}
        newRows={newRows}
        updates={updates}
        rowsToDelete={rowsToDelete}
        reset={reset}
      />
    : null;

  const body = loading 
    ? <LoadingTableBodyElement /> 
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
      className={`
        app-table 
        content-unit 
        ${ !header ? 'no-header' : ''} 
        ${ tableData.data.length == 1 ? 'one-row' : ''}
      `}
    >
      { header }
        { body }
    </div>
  );
}

export default Table;