import { State } from "./state";
import { clickPerPage } from "./model/click-per-page";
import { clickListZoom } from "./model/click-list-zoom";

interface BaseAction {
    type: string;
}

interface ClickPerPage extends BaseAction {
    type: 'click-per-page';
    input: string;
}

interface ClickListZoom extends BaseAction {
    type: 'click-list-zoom';
    input: string;
}

interface ClickColor extends BaseAction {
    type: 'click-color';
    input: {
        index: number,
        value: string,
    };
}

interface ClickCharacter extends BaseAction {
    type: 'click-character';
    input: {
        index: number,
        value: string,
    };
}

interface ClickXAxis extends BaseAction {
    type: 'click-x-axis';
    input: {
        index: number,
        value: string,
    };
}

interface ClickYAxis extends BaseAction {
    type: 'click-y-axis';
    input: {
        index: number,
        value: string,
    };
}

export type AllActions = ClickPerPage | ClickListZoom
 | ClickColor | ClickCharacter | ClickXAxis | ClickYAxis

export class Model {
    update(state: State, detail: AllActions):State {
        switch(detail.type) {
            case 'click-per-page':
                return clickPerPage(state, detail.input);
            case 'click-list-zoom':
                return clickListZoom(state, detail.input);
            case 'click-color':
                return state;
            case 'click-character':
                return state;
            case 'click-x-axis':
                return state;
            case 'click-y-axis':
                return state;
            default:
                return state;
        }
    }
    save(state: State):void {}
    load(input: unknown):void {}
}
