import { Board } from "./board";

export class BoardSVG extends HTMLElement {

    board: Board;

    static observedAttributes = [
        "color",
        "char",
        "x_left",
        "x_right",
        "y_up",
        "y_down",
        "vertical",
        "holizontal",
    ];

    constructor() {
        super();
        const inits = [
            ["color", "0"],
            ["char", ""],
            ["x_left", "1"],
            ["x_right", "19"],
            ["y_up", "19"],
            ["y_down", "1"],
            ["vertical", "null"],
            ["holizontal", "null"],
        ];
        inits.forEach(arr => {
            this.setAttribute(arr[0], arr[1]);
        });
        this.board = new Board();
    }

    // document に接続時実行
    connectedCallback() {
        this.appendChild(this.board.svg);
    }

    // 属性変更時実行
    attributeChangedCallback(attr:string, oldVal:string, newVal:string) {
        switch(attr) {
            case "color":
                this.board.onClickColor(oldVal, newVal);
                break;
            case "char":
                this.board.onClickChar(oldVal, newVal);
                break;
            case "x_left":
                break;
            case "x_right":
                this.board.onChangeXR(oldVal, newVal);
                break;
            case "y_up":
                this.board.onChangeYU(oldVal, newVal);
                break;
            case "y_down":
                break;
            case "vertical":
                this.board.onClickVertical(oldVal, newVal);
                break;
            case "holizontal":
                this.board.onClickHolizontal(oldVal, newVal);
                break;
        }
    }

}
