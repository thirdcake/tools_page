import { DisplayMode } from "../board-controller";
import {
    ColorButtons,
    CharacterButtons,
    XAxisButtons,
    YAxisButtons,
} from "./buttons";
import {
    ColsRange,
    RowsRange,
} from "./ranges";

export class Header {
    dom = document.createElement('div');
    children = {
        color: new ColorButtons(),
        character: new CharacterButtons(),
        cols: new ColsRange(),
        rows: new RowsRange(),
        xaxis: new XAxisButtons(),
        yaxis: new YAxisButtons(),
    }
    constructor() {
        this.dom.appendChild(this.children.color.dom);
        this.dom.appendChild(this.children.character.dom);
        this.dom.appendChild(this.children.cols.dom);
        this.dom.appendChild(this.children.rows.dom);
        this.dom.appendChild(this.children.xaxis.dom);
        this.dom.appendChild(this.children.yaxis.dom);
    }

    set rows(input: unknown) { this.children.rows.range = input; }
    set cols(input: unknown) { this.children.cols.range = input; }
    set xaxis(input: unknown) { this.children.xaxis.active = input; }
    set yaxis(input: unknown) { this.children.yaxis.active = input; }

    set displayMode(input: DisplayMode) {
        switch(input) {
            case 'none':
            case 'list':
                this.dom.style.display = 'none';
                break;
            case 'detail':
                this.dom.style.display = 'block';
                break;
        }
    }
}
