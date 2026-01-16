import { config } from "./config";
import { Stone } from "./stone";
import { State } from "../state/state";

export class Stones {
    #positions: number[];

    stones: Stone[][];
    dom: SVGGElement;
    data: [0|1|2, string][][];

    constructor(positions: number[]) {
        this.#positions = positions;
        this.stones = this.#createStones(positions);
        const dom = document.createElementNS(config.ns, 'g');
        if(!(dom instanceof SVGGElement)) {
            throw new Error('stones error');
        }
        this.dom = dom;
        this.stones.forEach(row => {
            row.forEach(stone => {
                this.dom.appendChild(stone.g);
            })
        });
        this.data = this.#createBlankData();
    }

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
        const color = state.color.value;
        const character = state.character.value;
        this.stones[row][col].onChange(color, character);
        return JSON.stringify(this.data);
    }

    #createStones(positions: number[]): Stone[][] {
        return positions.map(row_pos => 
            positions.map(col_pos => 
                new Stone(row_pos, col_pos, 0, '')
            )
        );
    }

    #createBlankData():[0|1|2, string][][] {
        return Array.from({length: config.size}, ()=>
            Array.from({length: config.size}, () => [0, ''])
        );
    }
}
