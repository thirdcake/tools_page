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

    constructor(idx: number, state: GoWrapperState) {
        this.idx = idx;
        this.goHeader = new GoHeader(idx, state);
        this.goBoard = new GoBoard(idx, state);
        this.textarea = new Textarea(idx, state);

        this.dom.appendChild(this.goHeader.dom);
        this.dom.appendChild(this.goBoard.dom);
        this.dom.appendChild(this.textarea.dom);

        this.#display(state);
    }

    #display(state: GoWrapperState):void {
        ['detail', 'list', 'none'].forEach(className => {
            this.dom.classList.toggle(`go-board-${className}`, className===state.list);
        });
    }

    render(state: GoWrapperState):void {
        if(this.state === state) return;
        this.state = state;

        this.#display(state);
        switch(state.list) {
            case 'detail':
            case 'list':
                this.goHeader.render(state);
                this.goBoard.render(state);
                this.textarea.render(state);
                break;
            case 'none':
                break;
        }
    }
}
