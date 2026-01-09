import { Board } from "./board";

export class BoardSVG extends HTMLElement {

    board: Board;

    static observedAttributes = ["clientxy", "color", "char", "vertical", "holizontal"];

    constructor() {
        super();
        this.setAttribute('color', '0');
        this.setAttribute('char', '');
        this.setAttribute('vertical', 'null');
        this.setAttribute('holizontal', 'null');
        this.board = new Board();
    }

    // document に接続時実行
    connectedCallback() {
        this.appendChild(this.board.svg);
        this.board.svg.addEventListener('click', (ev:PointerEvent) => {
            this.board.onClickSVG(ev.clientX, ev.clientY);
        }, false);
    }

    // 属性変更時実行
    attributeChangedCallback(attr:string, oldVal:string, newVal:string) {
        switch(attr) {
            case 'color':
                break;
            case 'char':
                break;
            case 'vertical':
                this.board.onClickVertical(oldVal, newVal);
                break;
            case 'holizontal':
                this.board.onClickHolizontal(oldVal, newVal);
                break;
        }
    }

}
