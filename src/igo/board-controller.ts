import { GoBoard } from "./board/go-board";
import { createHeader } from "./controller/create-header";
import { Textarea } from "./controller/textarea";

export type DisplayMode = 'none' | 'list' | 'detail';

export class BoardController extends HTMLElement {
    #header = createHeader();
    #board = new GoBoard();
    #textarea = new Textarea();

    static observedAttributes = [
        // "data-gostate-data",
        "data-display",
    ];

    constructor() {
        super();

        this.appendChild(this.#header);
        this.appendChild(this.#board.dom);
        this.appendChild(this.#textarea.dom);

        this.#header.addEventListener('click', (ev: PointerEvent) => {
            const target = ev.target;
            if(target instanceof HTMLButtonElement) {
                switch(target.dataset.type) {
                    case 'color':
                        this.#board.color = target.dataset.value;
                        console.log(this.#board.tupple);
                        break;
                    case 'character':
                        this.#board.character = target.dataset.value;
                        break;
                    case 'x-axis':
                        this.#board.xAxis = target.dataset.value;
                        break;
                    case 'y-axis':
                        this.#board.yAxis = target.dataset.value;
                        break;
                }
            }
        });
        this.#header.addEventListener('change', (ev: Event) => {
            const target = ev.target;
            if(target instanceof HTMLInputElement && target.type === 'range') {
                switch(target.dataset.type) {
                    case 'width':
                        this.#board.rangeCols = target.value;
                        break;
                    case 'height':
                        this.#board.rangeRows = target.value;
                        break;
                }
            }
        });
        this.addEventListener('blur', (ev: Event) => {});
    }

    // document に接続時実行
    connectedCallback() {
    }

    // 属性変更時実行
    attributeChangedCallback(attr:string, oldVal:string, newVal:string) {
        switch(attr) {
            case 'data-display':
                switch (newVal) {
                    case 'none':
                        this.#header.style.display = 'none';
                        this.#board.displayMode = 'none';
                        this.#textarea.displayMode = 'none';
                        break;
                    case 'list':
                        this.#header.style.display = 'none';
                        this.#board.displayMode = 'list';
                        this.#textarea.displayMode = 'list';
                        break;
                    case 'detail':
                        this.#header.style.display = 'block';
                        this.#board.displayMode = 'detail';
                        this.#textarea.displayMode = 'detail';
                        break;
                }
                break;
            // case '':
        }
    }
     
}
