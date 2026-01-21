import { State } from "../state";
import { config } from "./config";
import { Coordinates } from "./coordinates";
import { Grid } from "./grid";
import { Svg } from "./svg";
import { Stones } from "./stones";


export class Board {
    dom: SVGSVGElement;

    innerSvg: Svg;
    stones: Stones;

    constructor(state: State) {
        const positions = Array.from(
            {length: config.size},
            (_, i)=> Math.floor(config.interval/2)+i*config.interval
        );

        const outerSvg = new Svg('board');
        this.dom = outerSvg.dom;

        const innerSvg = new Svg();
        this.innerSvg = innerSvg;
        this.dom.appendChild(innerSvg.dom);

        const grid = new Grid(positions);
        innerSvg.dom.appendChild(grid.dom);

        const stones = new Stones(positions, state);
        this.stones = stones;
        innerSvg.dom.appendChild(stones.dom);

        const coordinates = new Coordinates(positions);
        this.dom.appendChild(coordinates.dom);

    }

    onClickBoard(ev: PointerEvent, state: State):string {
        const [x, y] = this.innerSvg.getClickedXY(ev.clientX, ev.clientY);
        const json = '';
        return json;
    }

}
