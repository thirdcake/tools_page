import { BoardConfig } from "./config";
import { Stone } from "./stone";

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
                this.g.appendChild(stone.group);
            })
        });
    }

    #createStones(positions: number[]): Stone[][] {
        return positions.map(row_pos => 
            positions.map(col_pos => 
                new Stone(row_pos, col_pos, 0, '')
            )
        );
    }
}