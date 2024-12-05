import { TableDataType, PROPERTY_TYPES } from "../types/table-types";
import Check from '../components/svg/Check';

/** Converts the data to the corresponding element for the table based on its type */
export function tableDataToElement(data: TableDataType): string | JSX.Element {
    return data instanceof Date
      ? `${data.getUTCMonth() + 1}/${data.getUTCDate()}/${data.getUTCFullYear()}`
      : data === null 
      ? '\u00A0'
      : typeof data == 'boolean'
      ? (data as boolean ? <Check /> : '')
      : data.toString()
}

/** Converts the data to the corresponding input element value for the table based on type */
export function tableDataToInputValue(type: typeof PROPERTY_TYPES[number], data: TableDataType): string {
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