import { config } from "./config";
import { createGrid } from "./create-grid";
import { Stones } from "./stones";

export class Svg {
    dom: SVGSVGElement;
    stones: Stones;

    constructor() {
        this.dom = document.createElementNS(config.ns, 'svg');
        this.dom.appendChild(createGrid());

        this.stones = new Stones();
        this.dom.appendChild(this.stones.dom);
    }

    changeData(val: string):void {
        this.stones.changeData(val);
    }

    changeViewBox(type: string, value: string) {}
}
