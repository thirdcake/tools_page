import { State } from "../state";
import { ColorButtons } from "./color-buttons";
import { CharacterButtons } from "./character-buttons";
import { RowsRange } from "./rows-range";
import { ColsRange } from "./cols-range";
import { XAxisButtons } from "./x-axis-buttons";
import { YAxisButtons } from "./y-axis-buttons";
import { GoBoard } from "./go-board";
import { Textarea } from "./textarea";
import { GoWrapperState } from "../state";

export class GoWrapper {
    dom = document.createElement('div');
    idx: number;
    state: null|GoWrapperState = null;
    color: ColorButtons;
    character: CharacterButtons;
    cols: ColsRange;
    rows: RowsRange;
    xAxis: XAxisButtons;
    yAxis: YAxisButtons;
    goBoard: GoBoard;
    textarea: Textarea;

    constructor(idx: number) {
        this.idx = idx;
        this.color = new ColorButtons(idx);
        this.character = new CharacterButtons(idx);
        this.cols = new ColsRange(idx);
        this.rows = new RowsRange(idx);
        this.xAxis = new XAxisButtons(idx);
        this.yAxis = new YAxisButtons(idx);
        this.goBoard = new GoBoard(idx);
        this.textarea = new Textarea(idx);

        this.dom.appendChild(this.color.dom);
        this.dom.appendChild(this.character.dom);
        this.dom.appendChild(this.cols.dom);
        this.dom.appendChild(this.rows.dom);
        this.dom.appendChild(this.xAxis.dom);
        this.dom.appendChild(this.yAxis.dom);
        this.dom.appendChild(this.goBoard.dom);
        this.dom.appendChild(this.textarea.dom);
    }

    render(state: State):void {
        if(this.state === state.goWrapper[this.idx]) return;
        this.state = state.goWrapper[this.idx];

        switch(state.listZoom[this.idx]) {
            case 'detail':
                this.dom.style.display = 'block';
                this.color.render(state);
                this.character.render(state);
                this.cols.render(state);
                this.rows.render(state);
                this.xAxis.render(state);
                this.yAxis.render(state);
                this.goBoard.render(state);
                this.textarea.render(state);
                break;
            case 'list':
                this.dom.style.display = 'block';
                this.color.render(state);
                this.character.render(state);
                this.cols.render(state);
                this.rows.render(state);
                this.xAxis.render(state);
                this.yAxis.render(state);
                this.goBoard.render(state);
                this.textarea.render(state);
                break;
            case 'none':
                this.dom.style.display = 'none';
                break;
        }
    }
}