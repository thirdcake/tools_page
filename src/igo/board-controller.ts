import { GoBoard } from "./board/go-board";
import { Header } from "./controller/header";
import { Textarea } from "./controller/textarea";
import { StoneTupple } from "./board/stone";

export type DisplayMode = 'none' | 'list' | 'detail';
export type State = [
    string,  // xAxis
    string,  // yAxis
    number,  // rows
    number,  // cols
    StoneTupple[][],  // stone
    string,  // textarea
];

export class BoardController extends HTMLElement {
    #header = new Header();
    #board = new GoBoard();
    #textarea = new Textarea();

    static observedAttributes = [
        // "data-gostate-data",
        "data-display",
    ];

    constructor() {
        super();

        this.appendChild(this.#header.dom);
        this.appendChild(this.#board.dom);
        this.appendChild(this.#textarea.dom);

        this.#header.dom.addEventListener('click', (ev: PointerEvent) => {
            const target = ev.target;
            if(target instanceof HTMLButtonElement) {
                switch(target.dataset.type) {
                    case 'color':
                        this.#board.color = target.dataset.value;
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
        this.#header.dom.addEventListener('change', (ev: Event) => {
            const target = ev.target;
            if(target instanceof HTMLInputElement && target.type === 'range') {
                switch(target.dataset.type) {
                    case 'cols':
                        this.#board.rangeCols = target.value;
                        break;
                    case 'rows':
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
                if (newVal==='none' || newVal==='list' || newVal==='detail') {
                    this.#header.displayMode = newVal;
                    this.#board.displayMode = newVal;
                    this.#textarea.displayMode = newVal;
                }
                break;
        }
    }

    get state ():State {
        return [
            ...this.#board.viewBoxState,
            this.#board.tupples,
            this.#textarea.area.value,
        ];
    }

    set state (input: unknown) {
        if(Array.isArray(input)) {
            const [
                xAxis,
                yAxis,
                rows,
                cols,
                tupples,
                textarea,
            ] = input;
            this.#header.xaxis = xAxis;
            this.#header.yaxis = yAxis;
            this.#header.rows = rows;
            this.#header.cols = cols;
            this.#board.tupples = tupples;
            this.#textarea.area.value = textarea;
        }
    }

}
