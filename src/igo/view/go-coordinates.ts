import { config } from "./consts";
import { State } from "../state";

export class GoCoordinates {
    dom = document.createElementNS(config.ns, 'g');

    constructor(idx: number) {
    }

    render(state: State):void {}
}
