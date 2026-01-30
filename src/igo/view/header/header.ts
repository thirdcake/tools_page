import { State } from "../../state";
import { PerPageButtons } from "./per-page-buttons";
import { ListZoomButtons } from "./list-zoom-buttons";
import { createSaveLoad } from "./save-load";


export class GlobalHeader {
    dom = document.createElement('div');

    perPageButtons = new PerPageButtons();
    listZoomButtons = new ListZoomButtons();

    constructor() {
        this.dom.classList.add('no-print');
        this.dom.appendChild(this.perPageButtons.dom);
        this.dom.appendChild(this.listZoomButtons.dom);
        this.dom.appendChild(document.createElement('hr'));
        this.dom.appendChild(createSaveLoad());
        this.dom.appendChild(document.createElement('hr'));
    }
    
    render(state: State):void {
        this.perPageButtons.render(state);
        this.listZoomButtons.render(state);
    }
}
