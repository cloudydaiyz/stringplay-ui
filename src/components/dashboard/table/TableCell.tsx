import { useCellValidityContext } from "../../../lib/cell-validity";
import { useTableDataContext, useTableOperationsContext } from "../../../lib/table-data";
import { tableDataToInputValue, tableDataToElement } from "../../../lib/table-helper";
import { TableCellProps } from "../../../types/table-types";
import Bolt from "../../svg/Bolt";
import Edit from "../../svg/Edit";
import Minus from "../../svg/Minus";

import Pencil from "../../svg/Pencil";
import Trash from "../../svg/Trash";
import XCircle from "../../svg/XCircle";

/**
 * Cell in `Table`.
 * - `r` = row index in `tableData.data`
 * - `c` = column index
 */
const TableCell = ({ r, c }: TableCellProps) => {
    const { tableData, mode, updates } = useTableDataContext();
    const { invalidCells } = useCellValidityContext();
    const { 
        getInputType, 
        getInputValueOnChange, 
        validateCell, 
        cancelCellEdit, 
        markCellEdit, 
        isDeletingRow, 
        markRowDelete, 
        cancelRowDelete, 
        isEditingCell 
    } = useTableOperationsContext();
    const item = tableData.data[r][c];

    if(tableData.columns[c].type == "action") {
        return (
            <td className='action'>
                {
                    mode == null && item !== false
                        && <button 
                            onClick={() => {
                                if(!tableData.onAction) {
                                    console.warn('No action defined for this table.');
                                    return;
                                }
                                tableData.onAction(r, c);
                            }}
                        >
                            <Bolt />
                        </button>
                }
            </td>
        );
    }
    
    if(isEditingCell(r, c)) {
        return (
            <td className='edit-cell'>
                <button onClick={() => cancelCellEdit(r, c)}>
                    <XCircle />
                </button>
                <div className="svg">
                    <Pencil />
                </div>
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
        );
    } 
    
    if(isDeletingRow(r)) {
        return (
            <td className='delete-cell'>
                { 
                    c == 0 
                        && <button onClick={() => cancelRowDelete(r)}>
                            <XCircle />
                        </button> 
                }
                <div className="svg">
                    <Trash />
                </div>
                <span>
                    { tableDataToElement(item) }
                </span>
            </td>
        );
    }

    return (
        <td>
            <span>
                { tableDataToElement(item) }
            </span>
            { 
                // Render the edit button in edit mode
                mode == 'edit' 
                    && !tableData.columns[c].disableUpdate 
                    && !tableData.immutableRows?.[r]
                    && <button 
                        className='edit-btn'
                        onClick={() => { markCellEdit(r, c, tableData.data[r][c]!) }}
                    >
                        <Edit />
                    </button>
            }
            {
                // Render the delete button in delete mode
                mode == 'delete' 
                    && !tableData.immutableRows?.[r]
                    && <button
                        className='delete-btn'
                        onClick={() => { markRowDelete(r) }}
                    >
                        <Minus />
                    </button>
            }
        </td>
    );
}

export default TableCell;