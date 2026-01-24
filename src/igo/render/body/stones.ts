import { config } from "./config";
import { Stone } from "./stone";
import { State } from "../../wrapper";

export class Stones {
    dom = document.createElementNS(config.ns, 'g') as SVGGElement;
    data: [string, string][][];
    stones: Stone[][];

    constructor(state: State) {
        this.data = state.data;
        this.stones = config.positions.map(
            row => config.positions.map(
                col => new Stone(row, col, '0', '')
            )
        );
    }

    /*
    onClick(x:number, y:number, state:State):string {
        
        if(x < 0) return JSON.stringify(this.data);
        const max_height = config.size * config.interval;
        if(max_height < y) return JSON.stringify(this.data);
        const positions = this.#positions;
        const init_x = {idx: 0, dist: Math.abs(positions[0] - x), now: x};
        const init_y = {idx: 0, dist: Math.abs(positions[0] - y), now: y};
        const minDist = (obj:{idx:number, dist:number, now:number}, pos:number, i:number) => {
            if(Math.abs(pos - obj.now) < obj.dist) {
                obj.idx = i;
                obj.dist = Math.abs(pos - obj.now);
            }
            return obj;
        }
        const col = positions.reduce(minDist, init_x).idx;
        const row = positions.reduce(minDist, init_y).idx;
        const color = this.#state.color.input.init[this.#state.color.input.active].value as ColorData;
        const character = this.#state.character.input.init[this.#state.character.input.active].value;
        this.stones[row][col].onChange(color, character);
        return JSON.stringify(this.data);
    }
    */

    render(state: State):void {
        if(this.data === state.data) return;
        this.data.forEach((row, ridx) => {
            if(row !== state.data[ridx]) {
                row.forEach((cell, cidx) => {
                    if(cell !== state.data[ridx][cidx]) {
                        this.stones[ridx][cidx].render(cell[0], cell[1]);
                    }
                });
            }
        });
    }
}
