import { State } from "../wrapper";
import { Board } from "./body/board";
import { Vertical, Horizontal } from "./body/coordinates";
import { config } from "./body/config";
import { outerViewBox } from "./body/viewbox";

export class Body {
    dom = document.createElementNS(config.ns, 'svg') as SVGSVGElement;
    #state: State;
    board: Board;
    vertical: Vertical;
    horizontal: Horizontal;

    constructor(state: State) {
        this.#state = state;
        this.dom.setAttribute('viewBox', outerViewBox(state));

        this.board = new Board(state);
        this.dom.appendChild(this.board.dom);

        this.vertical = new Vertical(state);
        this.dom.appendChild(this.vertical.dom)
        this.horizontal = new Horizontal(state);
        this.dom.appendChild(this.horizontal.dom);

    }

    render(state: State):void {
        if(state === this.#state) return;
        if(this.#state.data !== state.data) {
            // stones の変更処理
            this.board.render(state);
        }
        if(
            (this.#state.width !== state.width)
            || (this.#state.height !== state.height)
            || (this.#state.vertical !== state.vertical)
            || (this.#state.horizontal !== state.horizontal)
        ) {
            // viewBox の変更処理
            this.dom.setAttribute('viewBox', outerViewBox(state));
            this.vertical.render(state);
            this.horizontal.render(state);
        }
        this.#state = state;
    }
}
