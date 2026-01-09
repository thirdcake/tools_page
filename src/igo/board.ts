import { BoardConfig } from "./config";
import { Grid } from "./grid";
import { Coordinates } from "./coordinates";
import { State } from "./state";
import { Stones } from "./stones";

export class Board {
    #ns = 'http://www.w3.org/2000/svg';
    #config:BoardConfig = {
        color: '#333',
        thin: 2,
        thick: 4,
        size: 19,
        interval: 48,
        text_size: 36,
        radius: 20,
    }
    #width = this.#config.size * this.#config.interval;
    #viewBox = [0, 0, this.#width, this.#width];

    #positions: number[];

    svg: SVGSVGElement;
    #grid: Grid;
    #coodinates: Coordinates;
    #state: State;
    #stones: Stones;

    constructor() {
        this.#positions = this.#createPositions();

        this.svg = document.createElementNS(this.#ns, 'svg') as SVGSVGElement;
        this.svg.setAttribute('viewBox', this.#viewBox.join(' '));
        this.svg.setAttribute('style', 'width:100%;height:auto;max-width:600px;');

        this.#grid = new Grid(this.#config, this.#positions);
        this.svg.appendChild(this.#grid.g);

        this.#coodinates = new Coordinates(this.#config, this.#positions);
        this.svg.appendChild(this.#coodinates.g);

        this.#state = new State();

        this.#stones = new Stones(this.#config, this.#positions);
        this.svg.appendChild(this.#stones.g);
    }
    onClickSVG(clix:number, cliy:number) {
        const pt = this.svg.createSVGPoint();
        pt.x = clix;
        pt.y = cliy;
        const {x, y} = pt.matrixTransform(this.svg.getScreenCTM()?.inverse());
        this.#stones.onClick(x, y, this.#state);
    }

    onClickVertical(oldVal:string, newVal:string) {
        if(oldVal==='null' && newVal!=='null') {
            this.#viewBox[0] -= this.#config.interval;
            this.#viewBox[2] += this.#config.interval;
        }else if(oldVal!=='null' && newVal==='null') {
            this.#viewBox[0] += this.#config.interval;
            this.#viewBox[2] -= this.#config.interval;
        }
        this.svg.setAttribute('viewBox', this.#viewBox.join(' '));
        this.#coodinates.onChangeCoord('vertical', newVal);
    }

    onClickHolizontal(oldVal:string, newVal:string) {
        if(oldVal==='null' && newVal!=='null') {
            this.#viewBox[3] += this.#config.interval;
        }else if(oldVal!=='null' && newVal==='null') {
            this.#viewBox[3] -= this.#config.interval;
        }
        this.svg.setAttribute('viewBox', this.#viewBox.join(' '));
        this.#coodinates.onChangeCoord('holizontal', newVal);
    }

    #createPositions():number[] {
        const margin = Math.floor(this.#config.interval / 2);
        const func = (_:undefined, i:number) => margin + this.#config.interval * i;
        const positions = Array.from({length: this.#config.size}, func);
        return positions;
    }
}
