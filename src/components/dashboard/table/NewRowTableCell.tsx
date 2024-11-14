import { useCellValidityContext } from "../../../lib/cell-validity";
import { useTableDataContext, useTableOperationsContext } from "../../../lib/table-data";
import { TableCellProps } from "../../../types/table";

import Pencil from "../../svg/Pencil";
import XCircle from "../../svg/XCircle";

/**
 * Cell of new rows in `Table`.
 * - `r` = row index in `newRows`
 * - `c` = column index
 */
const NewRowTableCell = ({ r, c }: TableCellProps) => {
    const { tableData, newRows } = useTableDataContext();
    const { removeNewRow, getInputType, getInputValueOnChange, validateCell, setNewRows } = useTableOperationsContext();
    const { invalidCells } = useCellValidityContext();

    return (
        <td className='new-data'>
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
                                const newRowsUpdate = newRows!.slice();
                                newRowsUpdate[r][c] = getInputValueOnChange(e, c);

                                validateCell(newRowsUpdate[r + tableData.data.length][c], r, c);
                                setNewRows(newRowsUpdate);
                            }}
                            className={ invalidCells[r + tableData.data.length]?.[c] ? 'invalid' : '' }
                        />
                    }
                </>
            }
        </td>
    )
}

export default NewRowTableCell;