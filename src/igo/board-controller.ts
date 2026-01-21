import { Board } from "./board/board";
import { Controller } from "./controller/controller";
import { TextArea } from "./controller/textarea";
import { State } from "./state";

export class BoardController extends HTMLElement {

    #state: State;

    static observedAttributes = [
        // "data-gostate-data",
        "data-display",
    ];

    constructor() {
        super();

        this.#state = new State();
        const controller = new Controller(this.#state);
        const board = new Board(this.#state);
        const textarea = new TextArea(this.#state);

        this.appendChild(controller.dom);
        this.appendChild(board.dom);
        this.appendChild(textarea.dom);
        
        board.dom.addEventListener('click', (ev: PointerEvent)=>{
            if(this.classList.contains('large')) {
                this.dataset.gostateData = board.onClickBoard(ev, this.#state);
            }
        }, false);
    }

    // document に接続時実行
    connectedCallback() {
    }

    // 属性変更時実行
    attributeChangedCallback(attr:string, oldVal:string, newVal:string) {
        switch(attr) {
            //case 'data-gostate-data':
            //    break;
            case 'data-display':
                ['none', 'small', 'large'].forEach(className => {
                    this.classList.toggle(className, className === newVal);
                    //this.querySelector('svg.board')?.classList.toggle(className, className === newVal);
                    //this.querySelector('div.controller')?.classList.toggle(className, className === newVal);
                });
                break;
        }
    }
     
}
