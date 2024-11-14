import { useCellValidityContext } from "../../../lib/cell-validity";
import type { TableHeaderElementProps } from "../../../types/table";

import Button from "../../common/Button";
import Edit from "../../svg/Edit";
import Plus from "../../svg/Plus";
import ThumbsUp from "../../svg/ThumbsUp";
import Trash from "../../svg/Trash";
import XMark from "../../svg/XMark";

export function LoadingTableHeaderElement() {
    return (
        <div className='app-table-header loading'>
            <span>Loading some sample text here</span>
        </div>
    );
}
  
export function TableHeaderElement({ tableHeader, mode, setMode, newRows, updates, rowsToDelete, reset, empty = false }: TableHeaderElementProps) {
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
        <Button text={<span><ThumbsUp />CONFIRM</span>} onClick={performAction} buttonType={2} />
        <Button text={<span><XMark />CANCEL</span>} onClick={() => {resetInvalidCells(); reset()}} buttonType={2} />
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