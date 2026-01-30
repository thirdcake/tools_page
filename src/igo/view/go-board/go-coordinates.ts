import { config } from "../../consts";
import { GoWrapperState } from "../../state";

export class GoCoordinates {
    dom = document.createElementNS(config.ns, 'g');

    constructor(idx: number) {
    }

    render(state: GoWrapperState):void {}
}
