import { StoneData, StonesData } from "../state";
import { config } from "./config";

export class Helper {
    static parseData(data: string): StonesData {
        try {
            const parsed = JSON.parse(data);
            return Helper.isValidGrid(parsed) ? parsed : Helper.createBlankData();
        } catch {
            // JSON.parse に失敗したとき
            return Helper.createBlankData();
        }
    }

    static isValidGrid(data: unknown): data is StonesData {
        if (!Array.isArray(data) || data.length !== config.size) {
            return false;
        }

        return data.every(row => 
            Array.isArray(row) && 
            row.length === config.size && 
            row.every(cell => Helper.isValidCell(cell))
        );
    }

    static isValidCell(cell: unknown): cell is StoneData {
        if (!Array.isArray(cell) || cell.length !== 2) {
            return false;
        }
        
        const [color, char] = cell;
        const isValidColor = color === '0' || color === '1' || color === '2';
        const isValidChar = typeof char === 'string' && char.length <= 1;

        return isValidColor && isValidChar;
    }

    static createBlankData(): StonesData{
        return Array.from({length: config.size}, ()=>
            Array.from({length: config.size}, ()=>['0', ''])
        );
    }
}
