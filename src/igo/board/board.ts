import { config } from "./config";
import { Grid } from "./grid";
import { Coordinates } from "./coordinates";
import { Stones } from "./stones";
import { State } from "../state/state";

type ViewBoxType = {
    min_x: number,
    min_y: number,
    width: number,
    height: number,
}

export class Board {
    #parentViewBox: ViewBoxType = {
        min_x: 0,
        min_y: 0,
        width: config.size * config.interval,
        height: config.size * config.interval,
    }
    #childViewBox: ViewBoxType = {
        min_x: 0,
        min_y: 0,
        width: config.size * config.interval,
        height: config.size * config.interval,
    }
    #positions: number[];
    
    dom: SVGSVGElement;
    #childDom: SVGSVGElement;
    #grid: Grid;
    #coorinates: Coordinates;
    #stones: Stones;
    
    constructor() {
        this.#positions = this.#createPositions();
 
        this.dom = this.#createDom();
 
        this.#childDom = this.#createChild();
        this.dom.appendChild(this.#childDom);

        this.#coorinates = new Coordinates(this.#positions);
        this.dom.appendChild(this.#coorinates.dom);
 
        this.#grid = new Grid(this.#positions);
        this.#childDom.appendChild(this.#grid.dom);

        this.#stones = new Stones(this.#positions);
        this.#childDom.appendChild(this.#stones.dom);

    }
    
    onClick(ev: PointerEvent, state: State):string {
        const pt = this.#childDom.createSVGPoint();
        pt.x = ev.clientX;
        pt.y = ev.clientY;
        const {x, y} = pt.matrixTransform(this.#childDom.getScreenCTM()?.inverse());
        return this.#stones.onClick(x, y, state);
    }

    #createPositions():number[] {
        const margin = Math.floor(config.interval / 2);
        const func = (_:undefined, i:number) => margin + config.interval * i;
        const positions = Array.from({length: config.size}, func);
        return positions;
    }

    #createDom():SVGSVGElement {
        const dom = document.createElementNS(config.ns, 'svg');
        if(!(dom instanceof SVGSVGElement)) {
            throw new Error('SVG 要素の作成に失敗しています。');
        }
        dom.setAttribute('viewBox', this.#getViewBox(this.#parentViewBox));
        dom.classList.add('board');
        return dom;
    }
    
    #createChild(): SVGSVGElement {
        const dom = document.createElementNS(config.ns, 'svg');
        if(!(dom instanceof SVGSVGElement)) {
            throw new Error('SVG child 要素の作成に失敗しています。');
        }
        dom.setAttribute('viewBox', this.#getViewBox(this.#childViewBox));
        return dom;
    }

    #getViewBox(viewBox: ViewBoxType): string {
        const {
            min_x,
            min_y,
            width,
            height,
        } = viewBox;
        return [min_x, min_y, width, height].join(' ');
    }
}
