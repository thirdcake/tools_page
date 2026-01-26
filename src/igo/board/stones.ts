import { config } from "./config";
import { createStone, Stone, StoneFunc } from "./stone";

export class Stones {
    dom: SVGGElement;
    funcs: StoneFunc[][];
    data: Stone[][];

    constructor() {
        this.dom = document.createElementNS(config.ns, 'g');
        this.funcs = [];
        this.data = [];
        config.positions.forEach((pos_r, r) => {
            this.funcs[r] = [];
            this.data[r] = [];
            config.positions.forEach((pos_c, c) => {
                const [dom, func] = createStone(pos_r, pos_c, '0', '');
                this.dom.appendChild(dom);
                this.funcs[r][c] = func;
                this.data[r][c] = {color: '0', character: ''};
            });
        });
    }

    changeData(val: string):void {
        const data = this.parseData(val);
        data.forEach((row_data, r) => {
            row_data.forEach((cell_data, c) => {
                const isChangeColor = this.data[r][c].color !== cell_data.color;
                const isChangeChar = this.data[r][c].character !== cell_data.character;
                if(isChangeColor || isChangeChar) {
                    this.funcs[r][c](cell_data);
                }
            });
        });
    }

    parseData(jsonString: string):Stone[][] {
        const baseStone: Stone = {color: '0', character: '' }
        const blankData = Array.from(
            {length: 19},
            ()=>Array.from({length:19}, ()=>({...baseStone}))
        );

        try {
            const input = JSON.parse(jsonString);
            if(!Array.isArray(input) || input.length !== 19) return blankData;
            const isValid = input.every(row => {
                if(!Array.isArray(row) || row.length !== 19) return false;
                return row.every(cell => {
                    if(!Array.isArray(cell) || cell.length !== 2) return false;
                    if(cell[0] !== '0' && cell[0] !== '1' && cell[0] !== '2') return false;
                    if(typeof cell[1] !== 'string' || cell[1].length > 1) return false;
                    return true;
                });
            });
            if(!isValid) return blankData;
            const data = input.map(row => row.map((cell:[string, string]) => ({color: cell[0], character: cell[1]})));
            return data;
        } catch(e) {
            console.error('parse error: ', e);
            return blankData;
        }

    }
}
