import { GoHeader } from "./go-controller/go-header";
import { GoBoard } from "./go-board/go-board";
import { Textarea } from "./go-controller/textarea";
import { GoWrapperState } from "../state";

export class GoWrapper {
    dom = document.createElement('div');
    idx: number;
    state: null|GoWrapperState = null;
    goHeader: GoHeader;
    goBoard: GoBoard;
    textarea: Textarea;

    constructor(idx: number) {
        this.idx = idx;
        this.goHeader = new GoHeader(idx);
        this.goBoard = new GoBoard(idx);
        this.textarea = new Textarea(idx);

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
