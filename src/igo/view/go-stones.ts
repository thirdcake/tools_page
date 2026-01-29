import { config } from "./consts";
import { State } from "../state";

class Stone {
    dom = document.createElementNS(config.ns, 'g');

    constructor(x: number, y: number) {
        this.dom.addEventListener('click', () => {

        }, false);
    }

    render():void {}
}

export class GoStones {
    dom = document.createElementNS(config.ns, 'g');

    constructor(idx: number) {
    }

    render(state: State):void {}
}