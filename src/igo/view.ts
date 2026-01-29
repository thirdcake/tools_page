import { State } from "./state";
import { PerPageButtons } from "./view/per-page-buttons";
import { ListZoomButtons } from "./view/list-zoom-buttons";
import { GoWrapper } from "./view/go-wrapper";

export class View {
    dom = document.createElement('div');

    perPageButtons = new PerPageButtons();
    listZoomButtons = new ListZoomButtons();
    goWrappers = Array.from({length: 6}, (_, i) => ( new GoWrapper(i) ));

    constructor() {
        this.dom.appendChild(this.perPageButtons.dom);
        this.dom.appendChild(this.listZoomButtons.dom);
        this.goWrappers.forEach(gW => {
            this.dom.appendChild(gW.dom);
        })
    }

    render(state: State):void {
        this.perPageButtons.render(state);
        this.listZoomButtons.render(state);
        this.goWrappers.forEach(gW => gW.render(state));
    }
}
