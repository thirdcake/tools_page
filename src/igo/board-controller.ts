import { Board } from "./board/board";
import { Controller } from "./controller/controller";
import { State } from "./state/state";

export class BoardController extends HTMLElement {

    static observedAttributes = [
        "data-gostate-data",
    ];
    

    constructor() {
        super();

        const state = new State();
        const board = new Board();
        const controller = new Controller();

        this.appendChild(controller.dom);
        this.appendChild(board.dom);
        
        board.dom.addEventListener('click', (ev: PointerEvent)=>{
            this.dataset.gostateData = board.onClick(ev, state);
        }, false);
        
        controller.buttons.forEach(button => {
            button.addEventListener('click', (ev: PointerEvent) => {
                const target = ev.target;
                if(!(target instanceof HTMLButtonElement)) return;
                const inputType:string = `${target.dataset.gostateType}`;
                const inputVal:string = `${target.dataset.gostateValue}`;

                state.updateStart(inputType, inputVal);
                controller.onClick(state);
                state.updateEnd();
            }, false);
        });
        
        controller.ranges.forEach(range => {
            range.input.addEventListener('change', (ev: Event) => {
                const target = ev.target;
                if(!(target instanceof HTMLInputElement)) return;

                state.updateStart();
                state.onChange(target);
                if(state.isChange) {
                    range.span.textContent = state.newVal;
                }
                state.updateEnd();
            }, false);
        });

    }

    // document に接続時実行
    connectedCallback() {
    }

    // 属性変更時実行
    attributeChangedCallback(attr:string, oldVal:string, newVal:string) {
        if(attr === 'data-gostate-data') {
            // この customElement 外へイベントなどを発火
            if(oldVal===newVal) return;
        }
    }
     
}
