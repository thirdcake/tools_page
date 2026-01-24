import { State } from "../../wrapper";
import { config } from "./config";
import { createGrid } from "./grid";
import { innerViewBox } from "./viewbox";
import { Stones } from "./stones";

export class Board {
    dom = document.createElementNS(config.ns, 'svg') as SVGSVGElement;
    stones: Stones;

    constructor(state: State) {
        this.dom.setAttribute('viewBox', innerViewBox(state));
        this.dom.appendChild(createGrid());
        this.stones = new Stones(state);

        this.dom.addEventListener('click', (ev: PointerEvent) => {
            const pt = this.dom.createSVGPoint();
            pt.x = ev.clientX;
            pt.y = ev.clientY;
            const {x, y} = pt.matrixTransform(this.dom.getScreenCTM()?.inverse());

            const event = new CustomEvent('click-board', {
                bubbles: true,
                detail: [x, y],
            });
            this.dom.dispatchEvent(event);
        }, false);
    }
    
    render(state: State):void {
        this.dom.setAttribute('viewBox', innerViewBox(state));
        // stones の変更処理
        this.stones.render(state);
    }
}
