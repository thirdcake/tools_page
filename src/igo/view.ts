import { State } from "./state";
import { PerPageBtn } from "./view/per-page-btn";

export class View {
    dom = document.createElement('div');
    perPageBtn = new PerPageBtn();

    constructor() {
        this.dom.appendChild(this.perPageBtn.dom);
    }

    render(state: State):void {
    }
}
