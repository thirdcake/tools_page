import { State } from "../state";
import { Buttons } from "./buttons";
import { Ranges } from "./ranges";

export class Controller {
    
    dom: HTMLDivElement;
    state: State;

    constructor(state: State) {
        this.dom = document.createElement('div');
        this.state = state;

        const colorButtons = new Buttons('color', state);
        this.dom.appendChild(colorButtons.dom);

        const characterButtons = new Buttons('character', state);
        this.dom.appendChild(characterButtons.dom);

        const horizontalButtons = new Buttons('horizontal', state);
        this.dom.appendChild(horizontalButtons.dom);

        const verticalButtons = new Buttons('vertical', state);
        this.dom.appendChild(verticalButtons.dom);

        const widthRange = new Ranges('width', state);
        this.dom.appendChild(widthRange.dom);

        const heightRange = new Ranges('height', state);
        this.dom.appendChild(heightRange.dom);
    }


}
