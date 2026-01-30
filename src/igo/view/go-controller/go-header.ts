import { ColorButtons } from "./color-buttons";
import { CharacterButtons } from "./character-buttons";
import { RowsRange, ColsRange } from "./size-range";
import { XAxisButtons, YAxisButtons } from "./axis-buttons";
import { GoWrapperState } from "../../state";

export class GoHeader {
    dom = document.createElement('div');

    color: ColorButtons;
    character: CharacterButtons;
    cols: ColsRange;
    rows: RowsRange;
    xAxis: XAxisButtons;
    yAxis: YAxisButtons;

    constructor(idx: number) {
        this.color = new ColorButtons(idx);
        this.character = new CharacterButtons(idx);
        this.cols = new ColsRange(idx);
        this.rows = new RowsRange(idx);
        this.xAxis = new XAxisButtons(idx);
        this.yAxis = new YAxisButtons(idx);

        this.dom.appendChild(this.color.dom);
        this.dom.appendChild(this.character.dom);
        this.dom.appendChild(this.cols.dom);
        this.dom.appendChild(this.rows.dom);
        this.dom.appendChild(this.xAxis.dom);
        this.dom.appendChild(this.yAxis.dom);
    }
    
    render(state: GoWrapperState) {
        switch(state.list) {
            case 'detail':
                this.dom.style.display = 'block';
                this.color.render(state);
                this.character.render(state);
                this.cols.render(state);
                this.rows.render(state);
                this.xAxis.render(state);
                this.yAxis.render(state);
                break;
            default:
                this.dom.style.display = 'none';
                break;
        }
    }
}
