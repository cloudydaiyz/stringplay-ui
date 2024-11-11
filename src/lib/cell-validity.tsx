// Cell validity context for `Table` component

import { useState, createContext, useContext } from "react";

function useInvalidCells() {
    const [invalidCells, setInvalidCells] = useState<boolean[][]>([]);

    function getNumInvalidCells() {
        let num = 0;
        for(const row of invalidCells) {
            if(row) {
                for(const cell of row) {
                if(cell) num++;
                }
            }
        }
        return num;
    }

    function setInvalidCell(r: number, c: number) {
        console.log('setting invalid cell');
        const newInvalidCells = invalidCells.map(r => r.slice());
        if(!newInvalidCells[r]) newInvalidCells[r] = [];
        newInvalidCells[r][c] = true;
        setInvalidCells(newInvalidCells);
    }

    function unsetInvalidCell(r: number, c: number) {
        console.log('unsetting invalid cell');
        if(invalidCells[r]?.[c]) {
        const newInvalidCells = invalidCells.map(r => r.slice());
        newInvalidCells[r][c] = false;
        setInvalidCells(newInvalidCells);
        }
    }

    function resetInvalidCells() {
        setInvalidCells([]);
    }

    return { invalidCells, getNumInvalidCells, setInvalidCell, unsetInvalidCell, resetInvalidCells };
}

const CellValidityContext = createContext<ReturnType<typeof useInvalidCells> | undefined>(undefined);

export const CellValidityProvider = ({ children }: { children: React.ReactNode }) => {
    const cellValidityOps = useInvalidCells();
    return (
        <CellValidityContext.Provider value={cellValidityOps}>
        { children }
        </CellValidityContext.Provider>
    );
}

export function useCellValidityContext(): ReturnType<typeof useInvalidCells> {
    const cellValidityOps = useContext(CellValidityContext);
    if(cellValidityOps === undefined) {
        throw new Error("Invalid state. Make sure that you're using `CellValidityContext` correctly.");
    }
    return cellValidityOps;
}