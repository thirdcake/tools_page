import { State } from "../state";
import { config } from "./consts";
import { GoCoordinates } from "./go-coordinates";
import { GoGrid } from "./go-grid";
import { GoStones } from "./go-stones";

export class GoBoard {
    dom = document.createElementNS(config.ns, 'svg');
    grid: GoGrid;
    stones: GoStones;
    coordinates: GoCoordinates;

    constructor(idx: number) {
        this.grid = new GoGrid();
        this.stones = new GoStones(idx);
        this.coordinates = new GoCoordinates(idx);

        this.dom.appendChild(this.grid.dom);
        this.dom.appendChild(this.stones.dom);
        this.dom.appendChild(this.coordinates.dom);
    }

    render(state: State):void {
        //this.dom.setAttribute('viewBox', state.viewBox);
    }
}