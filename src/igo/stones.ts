import { BoardConfig } from "./config";
import { Stone } from "./stone";
import { State } from "./state";

export class Stones {
    #ns = 'http://www.w3.org/2000/svg';
    #config: BoardConfig;
    #positions: number[];

    stones: Stone[][];
    g: SVGGElement;

    constructor(config: BoardConfig, positions: number[]) {
        this.#config = config;
        this.#positions = positions;
        this.stones = this.#createStones(positions);
        this.g = document.createElementNS(this.#ns, 'g') as SVGGElement;
        this.stones.forEach(row => {
            row.forEach(stone => {
                this.g.appendChild(stone.g);
            })
        });
    }

    onClick(x:number, y:number, state:State) {
        if(x < 0) return;
        const max_height = this.#config.size * this.#config.interval;
        if(max_height < y) return;
        const positions = this.#positions;
        const init_x = {idx: 0, dist: Math.abs(positions[0] - x), now: x};
        const init_y = {idx: 0, dist: Math.abs(positions[0] - y), now: y};
        const minDist = (obj, pos:number, i:number) => {
            if(Math.abs(pos - obj.now) < obj.dist) {
                obj.idx = i;
                obj.dist = Math.abs(pos - obj.now);
            }
            return obj;
        }
        const col = positions.reduce(minDist, init_x).idx;
        const row = positions.reduce(minDist, init_y).idx;
        const color = state.color;
        const character = state.character;
        this.#stones[row][col].onChange(color, character);
    }

    #createStones(positions: number[]): Stone[][] {
        return positions.map(row_pos => 
            positions.map(col_pos => 
                new Stone(row_pos, col_pos, 0, '')
            )
        );
    }
}
