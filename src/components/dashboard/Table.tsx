import '../../app/shared.css';
import Button from '../common/Button';
import Check from '../svg/Check';
import './Table.css';

import assert from 'assert';

export const PROPERTY_TYPES = [
  "string?", "string!", 
  "number?", "number!", // entries must be convertible to a number
  "boolean?", "boolean!", // entries must be either true or false
  "date?", "date!", // entries must be in ISO format
  "null",
] as const;

type TableDataType = string|boolean|number|Date|null;

function tableDataToElement(data: TableDataType): string | JSX.Element {
  return data instanceof Date 
    ? `${data.getMonth()}/${data.getDate()}/${data.getFullYear()}`
    : data === null 
    ? ""
    : typeof data == 'boolean'
    ? (data as boolean ? <Check /> : '')
    : data.toString()
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
   * Called when new rows are requested to be deleted from the table. 
   * Called with the indicies of rows and columns to delete from the table.
   */
  onDataDelete?: (rowsToDelete: boolean[], columnsToDelete: boolean[]) => Promise<void>;

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

interface TableProps {

  /** True if this table is loading. If loading, no given table data will be displayed. */
  loading?: boolean;

  /** Header data for the table (title and action buttons) */
  tableHeader?: TableHeader;

  /** Main data to be displayed for the table */
  tableData: TableData;
}

const Table = ({ loading = false, tableHeader, tableData }: TableProps) => {
  assert(loading || tableData.columns.length > 0);

  const header = tableHeader 
    ? <div className='app-table-header'>
      <h3>{tableHeader.title}</h3>
      <div className='actions'>
        {tableHeader.onDataCreate && <Button text='NEW' buttonType={3} />}
        {tableHeader.onDataUpdate && <Button text='EDIT' buttonType={3} />}
        {tableHeader.onDataDelete && <Button text='DELETE' buttonType={3} />}
      </div>
    </div>
    : null;

  let body;
  if(tableData.data.length == 1) {
    const rows = tableData.data[0].map((item, i) => (
      <tr key={i}>
        <th scope='row'>{ tableData.columns[i].title }</th>
        <td>{ tableDataToElement(item) }</td>
      </tr>
    ));

    body = <tbody>{rows}</tbody>;
  } else {
    const columnHeaders = <tr>
      { tableData.columns.map((c, i) => <th key={i} scope='col'>{c.title}</th>) }
    </tr>;

    const rows = tableData.data.map((row, i) => <tr key={i}>
      {
        row.map((item, i) => <td key={i}>{tableDataToElement(item)}</td>)
      }
    </tr>);

    body = <>
      <thead>{columnHeaders}</thead>
      <tbody>{rows}</tbody>
    </>
  }

  return (
    <div className='app-table content-unit'>
      { header }
      <table>
        { body }
      </table>
    </div>
  );
}

export default Table;