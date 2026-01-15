import { Board } from "./board";
import { Controller } from "./controller";
import { State } from "./state";

export class BoardController extends HTMLElement {
    boardController: {
        board: Board,
        controller: Controller,
        state: State,
    }
    
    static observedAttributes = [
        //"data-gostate-data",
    ];
    

    constructor() {
        super();
        this.boardController = {
            board: new Board(),
            controller: new Controller(),
            state: new State(),
        }
        this.appendChild(this.boardController.controller.dom);
        this.appendChild(this.boardController.board.dom);
    }

    // document に接続時実行
    connectedCallback() {
        const board = this.boardController.board;
        const controller = this.boardController.controller;
        const state = this.boardController.state;
        
        board.dom.addEventListener('click', (ev: PointerEvent)=>{
            board.onClick(ev, state);
        }, false);

        controller.dom.addEventListener('click', (ev: PointerEvent)=>{
            const target = ev.target;
            if(!(target instanceof HTMLElement)) return;
            if(!target.closest('button')) return;
            state.onClick(ev);
            controller.onClick(state);
        }, false);

        controller.dom.addEventListener('change', (ev: Event)=>{
            console.log(state);
            state.onChange(ev);
            console.log(state);
            controller.onChange(state);
        }, false);

    }

    // 属性変更時実行
    attributeChangedCallback(attr:string, oldVal:string, newVal:string) {
        if(attr === 'data-gostate-data') {
            // この customElement 外へイベントなどを発火
        }
    }
     
}
