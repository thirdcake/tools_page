import { State } from "../wrapper";
import {
    createColorButtons,
    createCharacterButtons,
    createVerticalButtons,
    createHorizontalButtons,
} from "./header/buttons";
import { createRange } from "./header/ranges";

export class Header {
    dom: HTMLElement = document.createElement('div');
    #state: State;

    constructor(state: State) {
        this.#state = state;
        
        this.dom.appendChild(createColorButtons());
        this.dom.appendChild(createCharacterButtons());
        this.dom.appendChild(createRange('width', '横幅：'));
        this.dom.appendChild(createRange('height', '高さ：'));

        this.dom.appendChild(createVerticalButtons());
        this.dom.appendChild(createHorizontalButtons());
    }

    render(state: State):void {
        if(this.#state === state) return;
        if(state.color !== this.#state.color) {
            // color が変わったときの処理
        }
        if(state.character !== this.#state.character) {
        }
        this.#state = state;
    }
}
