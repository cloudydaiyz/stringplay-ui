// Types for the `Table` component

export const PROPERTY_TYPES = [
    "string?", "string!", 
    "number?", "number!", // entries must be convertible to a number
    "boolean?", "boolean!", // entries must be either true or false
    "date?", "date!", // entries must be in ISO format
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
export interface TableData {
  
    /** 
     * Information about each column in the table data array. 
     * The number of columns must match the number of columns in `data`.
     */
    columns: {
      title: string;
      type: typeof PROPERTY_TYPES[number];

      /** Prevents the configuration of the element in create mode */
      disableCreate?: boolean;

      /** Prevents the manipulation of the element in update mode */
      disableUpdate?: boolean;

      /** 
       * Prevents deletion of singular element in update mode.
       * If `disableUpdate` is true, then this is also true by default.
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
}