import { BoardConfig } from "./config";
import { Grid } from "./grid";
import { Coordinates } from "./coordinates";
import { Stones } from "./stones";
import { State } from "./state";

type ViewBoxType = {
    min_x: number,
    min_y: number,
    width: number,
    height: number,
}
export class Board {
    #ns: string = 'http://www.w3.org/2000/svg';
    #config:BoardConfig = {
        color: '#333',
        thin: 2,
        thick: 4,
        size: 19,
        interval: 48,
        text_size: 36,
        radius: 20,
    }
    #parentViewBox: ViewBoxType = {
        min_x: 0,
        min_y: 0,
        width: this.#config.size * this.#config.interval,
        height: this.#config.size * this.#config.interval,
    }
    #childViewBox: ViewBoxType = {
        min_x: 0,
        min_y: 0,
        width: this.#config.size * this.#config.interval,
        height: this.#config.size * this.#config.interval,
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

        this.#coorinates = new Coordinates(this.#config, this.#positions);
        this.dom.appendChild(this.#coorinates.dom);
 
        this.#grid = new Grid(this.#config, this.#positions);
        this.#childDom.appendChild(this.#grid.dom);

        this.#stones = new Stones(this.#config, this.#positions);
        this.#childDom.appendChild(this.#stones.dom);

    }
    
    onClick(ev: PointerEvent, state: State) {
        const pt = this.#childDom.createSVGPoint();
        pt.x = ev.clientX;
        pt.y = ev.clientY;
        const {x, y} = pt.matrixTransform(this.#childDom.getScreenCTM()?.inverse());
        this.#stones.onClick(x, y, state);
    }

    #createPositions():number[] {
        const margin = Math.floor(this.#config.interval / 2);
        const func = (_:undefined, i:number) => margin + this.#config.interval * i;
        const positions = Array.from({length: this.#config.size}, func);
        return positions;
    }

    #createDom():SVGSVGElement {
        const dom = document.createElementNS(this.#ns, 'svg');
        if(!(dom instanceof SVGSVGElement)) {
            throw new Error('SVG 要素の作成に失敗しています。');
        }
        dom.setAttribute('viewBox', this.#getViewBox(this.#parentViewBox));
        return dom;
    }
    
    #createChild(): SVGSVGElement {
        const dom = document.createElementNS(this.#ns, 'svg');
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
    /*
    onClickColor(oldVal:string, newVal:string) {
        this.#state.color = newVal;
    }

    onClickChar(oldVal:string, newVal:string) {
        this.#state.character = newVal;
    }

    onChangeXL(oldVal:string, newVal:string) {
    }
    onChangeXR(oldVal:string, newVal:string) {
        const oldNum = Number(oldVal);
        const newNum = Number(newVal);
        if(isNaN(oldNum) || isNaN(newNum)) return;
        const oldLeft = this.#config.interval * (oldNum - 1);
        const newLeft = this.#config.interval * (newNum - 1);
        this.#viewBox[2] += newLeft - oldLeft;
        this.svg.setAttribute('viewBox', this.#viewBox.join(' '));
    }
    onChangeYU(oldVal:string, newVal:string) {
        const oldNum = Number(oldVal);
        const newNum = Number(newVal);
        if(isNaN(oldNum) || isNaN(newNum)) return;
        const oldUp = this.#config.interval * (oldNum - 1);
        const newUp = this.#config.interval * (newNum - 1);
        this.#viewBox[1] += oldUp - newUp;
        this.#viewBox[3] -= oldUp - newUp;
        this.svg.setAttribute('viewBox', this.#viewBox.join(' '));
    }
    onChangeYD(oldVal:string, newVal:string) {}

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

    */
}
