import { GoHeader } from "./go-controller/go-header";
import { GoBoard } from "./go-board/go-board";
import { Textarea } from "./go-controller/textarea";
import { GoWrapperState } from "../state";

export class GoWrapper {
    dom = document.createElement('div');
    idx: number;
    state: GoWrapperState;
    goHeader: GoHeader;
    goBoard: GoBoard;
    textarea: Textarea;

    constructor(idx: number, state: GoWrapperState) {
        this.idx = idx;
        this.state = state;
        this.goHeader = new GoHeader(idx, state);
        this.goBoard = new GoBoard(idx, state);
        this.textarea = new Textarea(idx, state);

        this.dom.appendChild(this.goHeader.dom);
        this.dom.appendChild(this.goBoard.dom);
        this.dom.appendChild(this.textarea.dom);
    }

    render(state: GoWrapperState):void {
        if(this.state === state) return;
        this.state = state;

        switch(state.list) {
            case 'detail':
                this.dom.style.display = 'block';
                this.goHeader.render(state);
                this.goBoard.render(state);
                this.textarea.render(state);
                break;
            case 'list':
                this.dom.style.display = 'block';
                this.goHeader.render(state);
                this.goBoard.render(state);
                this.textarea.render(state);
                break;
            case 'none':
                this.dom.style.display = 'none';
                break;
        }
    }
}
