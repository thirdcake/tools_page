import { config } from "./config";

type CellData = [0 | 1 | 2, string];
type GridData = CellData[][];

export class Data {
    #data: GridData;

    constructor(data: string) {
        this.#data = this.#parseData(data);
    }

    get data(): GridData { return this.#data }

    #parseData(data: string): GridData {
        try {
            const parsed = JSON.parse(data);
            return this.#isValidGrid(parsed) ? parsed : this.#createBlankData();
        } catch {
            // JSON.parse に失敗したとき
            return this.#createBlankData();
        }
    }

    #isValidGrid(data: any): data is GridData {
        if (!Array.isArray(data) || data.length !== config.size) {
            return false;
        }

        return data.every(row => 
            Array.isArray(row) && 
            row.length === config.size && 
            row.every(cell => this.#isValidCell(cell))
        );
    }

    #isValidCell(cell: any): cell is CellData {
        if (!Array.isArray(cell) || cell.length !== 2) {
            return false;
        }
        
        const [color, char] = cell;
        const isValidColor = color === 0 || color === 1 || color === 2;
        const isValidChar = typeof char === 'string' && char.length <= 1;

        return isValidColor && isValidChar;
    }

    #createBlankData(): GridData{
        return Array.from({length: config.size}, ()=>
            Array.from({length: config.size}, ()=>[0, ''])
        );
    }
}
