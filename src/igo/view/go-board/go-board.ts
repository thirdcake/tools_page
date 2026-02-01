import { GoWrapperState } from "../../state";
import { config } from "../../consts";
import { GoCoordinates } from "./go-coordinates";
import { createGoGrid } from "./create-go-grid";
import { GoStones } from "./go-stones";

export class GoBoard {
    dom = document.createElementNS(config.ns, 'svg');
    stones: GoStones;
    coordinates: GoCoordinates;

    constructor(idx: number, state: GoWrapperState) {
        this.dom.classList.add('board');

        this.stones = new GoStones(idx);
        this.coordinates = new GoCoordinates(state);

        this.dom.appendChild(createGoGrid());
        this.dom.appendChild(this.stones.dom);
        this.dom.appendChild(this.coordinates.dom);
    }

    render(state: GoWrapperState):void {
        this.dom.setAttribute('viewBox', state.viewBox);
        this.stones.render(state.data);
        this.coordinates.render(state);
    }
}
