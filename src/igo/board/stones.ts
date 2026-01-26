import { config } from "./config";
import { Stone, StoneTupple } from "./stone";

export class Stones {
    dom: SVGGElement;
    stones: Stone[][];

    constructor() {
        this.dom = document.createElementNS(config.ns, 'g');
        this.stones = config.positions.map(pos_r => 
            config.positions.map(pos_c => new Stone(pos_r, pos_c))
        );
    }
    
    update(row: number, col: number, tupple: StoneTupple):void {
        this.stones[row][col].render(tupple);
    }

    bulkUpdate(val: string):void {
        const data = this.parseData(val);
        data.forEach((row_data, r) => {
            row_data.forEach((cell_data, c) => {
                this.stones[r][c].render(cell_data);
            });
        });
    }

    parseData(jsonString: string):StoneTupple[][] {
        const baseStone: StoneTupple = [0, ''];
        const blankData = Array.from(
            {length: 19},
            ()=>Array.from({length:19}, ()=>([...baseStone] as StoneTupple))
        );

        try {
            const input = JSON.parse(jsonString);
            if(!Array.isArray(input) || input.length !== 19) return blankData;
            const isValid = input.every(row => {
                if(!Array.isArray(row) || row.length !== 19) return false;
                return row.every(cell => {
                    if(!Array.isArray(cell) || cell.length !== 2) return false;
                    if(cell[0] !== 0 && cell[0] !== 1 && cell[0] !== 2) return false;
                    if(typeof cell[1] !== 'string' || cell[1].length > 1) return false;
                    return true;
                });
            });
            return isValid ? input: blankData;
        } catch(e) {
            console.error('parse error: ', e);
            return blankData;
        }

    }
}
