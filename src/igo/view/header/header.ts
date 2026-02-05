import { State } from "../../state";
import { PerPageButtons } from "./per-page-buttons";
import { ListZoomButtons } from "./list-zoom-buttons";
import { SaveLoad } from "./save-load";


export class GlobalHeader {
    dom = document.createElement('div');

    perPageButtons: PerPageButtons;
    listZoomButtons: ListZoomButtons;
    saveLoad: SaveLoad;

    constructor(state: State) {
        this.dom.classList.add('no-print');

        this.perPageButtons = new PerPageButtons(state);
        this.dom.appendChild(this.perPageButtons.dom);

        this.listZoomButtons = new ListZoomButtons(state);
        this.dom.appendChild(this.listZoomButtons.dom);

        this.dom.appendChild(document.createElement('hr'));

        this.saveLoad = new SaveLoad(state);
        this.dom.appendChild(this.saveLoad.dom);
    }
    
    render(state: State):void {
        this.perPageButtons.render(state);
        this.listZoomButtons.render(state);
        this.saveLoad.render(state);
    }
}
