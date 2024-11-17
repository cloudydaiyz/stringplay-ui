import { useCellValidityContext } from "../../../lib/cell-validity";
import type { TableHeaderElementProps } from "../../../types/table-types";

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
  
export function TableHeaderElement({ tableHeader, loading, mode, setMode, newRows, updates, rowsToDelete, reset, empty = false }: TableHeaderElementProps) {
    const { resetInvalidCells, getNumInvalidCells } = useCellValidityContext();

    /** Handles the (sync or async) function calls from the actions defined in the header */
    function handleAction<T>(func: ((arg: T) => Promise<void>) | ((arg: T) => void), arg: T) {
        try {
            const call = func(arg);
            if(call instanceof Promise) {
                call.then(() => tableHeader.onSuccess?.())
                    .catch((err) => { tableHeader.onError?.(); console.log('error:', err) })
                    .finally(() => { reset(); resetInvalidCells() });
                return;
            }
        } catch(err) {
            tableHeader.onError?.(); 
            console.log('error:', err);
        }

        reset(); 
        resetInvalidCells();
    }

    /** Performs the action based on the mode for the table */
    const performAction = () => {
        if(getNumInvalidCells() > 0) return;

        if(tableHeader.onDataCreate && mode == 'create' && newRows) {
            console.log('Creating rows');
            console.log(newRows);
            handleAction(tableHeader.onDataCreate, newRows);
        } else if(tableHeader.onDataUpdate && mode == 'edit' && updates) {
            console.log('Performing update');
            console.log(updates);
            handleAction(tableHeader.onDataUpdate, updates);
        } else if(tableHeader.onDataDelete && mode == 'delete' && rowsToDelete) {
            console.log('Performing deletion');
            console.log(rowsToDelete);
            handleAction(tableHeader.onDataDelete, rowsToDelete);
        }
    }

    const actions = mode 
        ? (
            <div className='actions'>
                <Button text={<span><ThumbsUp />CONFIRM</span>} onClick={() => performAction()} buttonType={2} />
                <Button text={<span><XMark />CANCEL</span>} onClick={() => {resetInvalidCells(); reset()}} buttonType={2} />
            </div>
        )
        : (
            <div className='actions'>
                {tableHeader.onDataCreate && <Button text={<span><Plus />NEW</span>} onClick={() => setMode('create')} buttonType={2} />}
                {!empty && tableHeader.onDataUpdate && <Button text={<span><Edit />EDIT</span>} onClick={() => setMode('edit')} buttonType={2} />}
                {!empty && tableHeader.onDataDelete && <Button text={<span><Trash />DELETE</span>} onClick={() => setMode('delete')} buttonType={2} />}
            </div>
        )

    return (
        <div className='app-table-header'>
            <div className='app-table-subheader'>
                <h3>{ tableHeader.title }</h3>
                { !loading && actions }
            </div>
            { mode && <p className='app-table-mode-text'>You are currently in <strong>{mode}</strong> mode.</p> }
        </div>
    );
}