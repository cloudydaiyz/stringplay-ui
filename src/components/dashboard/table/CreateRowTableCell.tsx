import { useTableDataContext, useTableOperationsContext } from '../../../lib/table-data';
import Plus from '../../svg/Plus';

const CreateRowTableCell = ({ oneRow = false }: { oneRow?: boolean }) => {
    const { tableData, newRows } = useTableDataContext();
    const { addNewRow } = useTableOperationsContext();

    if(oneRow) {
        return (
            <td className='create-row'>
                {/* The first index of all the rows specify the columns. */}
                <button onClick={() => addNewRow()}>
                    <Plus />
                </button>
            </td>
        );
    }
    
    return (
        <tr key={tableData.data.length + (newRows?.length || 0)}>
            <td className='create-row'>
                {/* The first index of all the rows specify the columns. */}
                <button onClick={() => addNewRow()}>
                    <Plus />
                </button>
            </td>
        </tr>
    );
}

export default CreateRowTableCell