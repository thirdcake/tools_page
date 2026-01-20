import { Board } from "./board/board";
import { Controller } from "./controller/controller";
import { State } from "./state/state";

export class BoardController extends HTMLElement {

    static observedAttributes = [
        // "data-gostate-data",
        "data-display",
    ];

    constructor() {
        super();

        const state = new State();
        const board = new Board(state);
        const controller = new Controller(state);

        this.appendChild(controller.dom);
        this.appendChild(board.dom);
        
        board.dom.addEventListener('click', (ev: PointerEvent)=>{
            if(this.classList.contains('large')) {
                this.dataset.gostateData = board.onClickBoard(ev, state);
            }
        }, false);

        controller.dom.addEventListener('click', (ev: PointerEvent) => {
            const target = ev.target;
            if(!(target instanceof HTMLElement)) return;
            const button = target.closest('button');
            if(!(button instanceof HTMLButtonElement)) return;
            const inputType:string = `${button.dataset.gostateType}`;
            const inputVal:string = `${button.dataset.gostateValue}`;

            state.updateStart(inputType, inputVal);
            state.updateEnd();
        }, false);

        controller.dom.addEventListener('change', (ev: Event) => {
            const target = ev.target;
            if(!(target instanceof HTMLElement)) return;
            const inputRange = target.closest('input[type="range"]');
            if(!(inputRange instanceof HTMLInputElement)) return;
            const inputType:string = `${inputRange.dataset.gostateType}`;
            if(!(inputType in controller.fields)) return;
            const inputVal:string = `${inputRange.value}`;

            state.updateStart(inputType, inputVal);
            state.updateEnd();
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
                    this.querySelector('svg.board')?.classList.toggle(className, className === newVal);
                    this.querySelector('div.controller')?.classList.toggle(className, className === newVal);
                });
                break;
        }
    }
     
}
