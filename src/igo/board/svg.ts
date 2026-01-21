import { config } from "./config";

type ViewBoxType = {
    min_x: number,
    min_y: number,
    width: number,
    height: number,
}

export class Svg {
    dom: SVGSVGElement;
    #viewBox: ViewBoxType = {
        min_x: 0,
        min_y: 0,
        width: config.size * config.interval,
        height: config.size * config.interval,
    }
    
    constructor(...classNames: string[]) {
        this.dom = document.createElementNS(config.ns, 'svg');
        this.#updateViewBox();
        this.dom.classList.add(...classNames);
    }
    
    getClickedXY(clientX: number, clientY: number): [number, number] {
        const pt = this.dom.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        const {x, y} = pt.matrixTransform(this.dom.getScreenCTM()?.inverse());
        return [x, y];
    }

    set min_x(num: number) {
        this.#viewBox.min_x = num;
        this.#updateViewBox();
    }

    set min_y(num: number) {
        this.#viewBox.min_y = num;
        this.#updateViewBox();
    }
    
    set width(num: number) {
        this.#viewBox.width = num;
        this.#updateViewBox();
    }
    
    set height(num: number) {
        this.#viewBox.height = num;
        this.#updateViewBox();
    }

    #updateViewBox():void {
        const {
            min_x,
            min_y,
            width,
            height,
        } = this.#viewBox;
        const viewBox = [min_x, min_y, width, height].join(' ');
        this.dom.setAttribute('viewBox', viewBox);
    }

}
