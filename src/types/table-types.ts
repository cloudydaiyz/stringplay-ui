// Types for the `Table` component

export const PROPERTY_TYPES = [
    "string?", "string!", 
    "number?", "number!", // entries must be convertible to a number
    "boolean?", "boolean!", // entries must be either true or false
    "date?", "date!", // entries must be in ISO format
    "action",
    "null",
] as const;

export type TableMode = 'create' | 'edit' | 'delete' | null;

export type TableDataType = string | boolean | number | Date | null;

export interface TableHeader {

    /** Title for the table */
    title: string;
  
    /** 
     * Called when new rows are requested to be created for the table.
     * Called with the data for each row of the table.
     */
    onDataCreate?: ((newRows: TableDataType[][]) => Promise<void>) | ((newRows: TableDataType[][]) => void);
  
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
    onDataUpdate?: ((updates: (TableDataType | undefined)[][]) => Promise<void>) | ((updates: (TableDataType | undefined)[][]) => void);
  
    /** 
     * Called when new rows are requested to be deleted from the table. 
     * Called with the indicies of rows to delete from the table.
     */
    onDataDelete?: ((rowsToDelete: boolean[]) => Promise<void>) | ((rowsToDelete: boolean[]) => void);
  
    /** Called on successful operation */
    onSuccess?: () => void;
  
    /** Called on failed operation */
    onError?: () => void;
}

/** Information about the data to display for the table */
export interface TableData {
  
    /** 
     * Information about each column in the table data array. 
     * The number of columns must match the number of columns in `data`.
     */
    columns: {
        
        /** The title of the column */
        title: string;

        /** The property type of the column */
        type: typeof PROPERTY_TYPES[number];

        /** 
         * Prevents the configuration of the element in create mode. 
         * Disabled by default for matrix type columns. 
         */
        disableCreate?: boolean;

        /** 
         * Prevents the manipulation of the element in update mode.
         * Disabled by default for matrix type columns. 
         */
        disableUpdate?: boolean;

        /** 
         * Prevents deletion of singular element in update mode.
         * Disabled by default if `disableUpdate` is true.
         */
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
  
    /** Callback that validates data in the table on update. Returns true if the data is invalid. */
    validateData?: (data: TableDataType, r: number, c: number) => boolean;

    /** Callback that executes whenever an action button is pressed */
    onAction?: (r: number, c: number) => void;
}

export interface LoadingTableBodyElementProps {
    tableData?: TableData;
    newRows: TableDataType[][] | null;
}

export interface TableBodyElementProps {
    tableData: TableData;
    mode: TableMode;
    newRows: TableDataType[][] | null;
    setNewRows: React.Dispatch<React.SetStateAction<TableDataType[][] | null>>;
    updates: (TableDataType | undefined)[][] | null;
    setUpdates: React.Dispatch<React.SetStateAction<(TableDataType | undefined)[][] | null>>;
    rowsToDelete: boolean[] | null;
    setRowsToDelete: React.Dispatch<React.SetStateAction<boolean[] | null>>;
}

export interface TableHeaderElementProps {
    tableHeader: TableHeader;
    mode: TableMode;
    setMode: React.Dispatch<React.SetStateAction<TableMode>>;
    newRows: TableDataType[][] | null;
    updates: (TableDataType | undefined)[][] | null;
    rowsToDelete: boolean[] | null;
    empty: boolean;
    reset: () => void;
}

export interface TableCellProps {
    r: number,
    c: number,
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

    /** The maximum number of rows for the table */
    maxRows?: number;
}