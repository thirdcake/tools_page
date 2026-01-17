import { config } from "./config";
import { Grid } from "./grid";
import { Coordinates } from "./coordinates";
import { Stones } from "./stones";
import { Svg } from "./svg";
import { State } from "../state/state";
import { CoordinatesState } from "../constants";

export class Board {
    #positions: number[];
    
    #parent: Svg;
    #child: Svg;
    #grid: Grid;
    #coorinates: Coordinates;
    #stones: Stones;
    
    constructor() {
        this.#positions = this.#createPositions();
        
        this.#parent = new Svg('board');
        this.#child = new Svg();
        
        this.#parent.dom.appendChild(this.#child.dom);

        this.#coorinates = new Coordinates(this.#positions);
        this.#parent.dom.appendChild(this.#coorinates.dom);
 
        this.#grid = new Grid(this.#positions);
        this.#child.dom.appendChild(this.#grid.dom);

        this.#stones = new Stones(this.#positions);
        this.#child.dom.appendChild(this.#stones.dom);
    }
    
    get dom():SVGSVGElement { return this.#parent.dom }
    
    onClickBoard(ev: PointerEvent, state: State):string {
        const [x, y] = this.#child.getClickedXY(ev.clientX, ev.clientY);
        return this.#stones.onClick(x, y, state);
    }
    
    onChangeViewBox(state: State) {
        if(!state.isChange) return;
        if(state.type === 'width' || state.type === 'height') {
            this.#onChangeBoardSize(state, state.type);
        }else if(state.type === 'vertical' || state.type === 'horizontal') {
            this.#onChangeCoordinates(state, state.type);
        }
    }
    
    #onChangeBoardSize(state: State, type:'width'|'height') {
        const idx = Number(state.newVal);
        if(idx <= 0 || config.size < idx) return;

        const length = idx * config.interval;
        const oppositMap = {
            width: 'vertical',
            height: 'horizontal',
        } as const;
        const oppositType = oppositMap[type];
        const hasCoord:boolean = state.fields[oppositType].state !== 'null'
        this.#child[type] = length;
        this.#parent[type] = hasCoord ? length + config.interval : length;
    }
    
    #onChangeCoordinates(state: State, type: 'vertical'|'horizontal') {
        const newVal = state.newVal as CoordinatesState;
        const hasCoord = newVal !== 'null';
        let min: number = hasCoord ? -config.interval : 0;
        let length: number = hasCoord ? config.interval : 0;
        const oppositMap = {
            vertical: {
                opMin: 'min_x',
                opLength: 'width',
            },
            horizontal: {
                opMin: 'min_y',
                opLength: 'height',
            }
        } as const;
        const {opMin, opLength} = oppositMap[type];
        this.#parent[opMin] = min;
        this.#parent[opLength] = length + this.#child[opLength];
    }

    #createPositions():number[] {
        const margin = Math.floor(config.interval / 2);
        const func = (_:undefined, i:number) => margin + config.interval * i;
        const positions = Array.from({length: config.size}, func);
        return positions;
    }

}
