import { State } from "../state";
import { clickPerPage } from "./click-per-page";
import { clickListZoom } from "./click-list-zoom";
import { clickColor } from "./click-color";
import { clickCharacter } from "./click-character";
import {
    changeCols,
    changeRows,
    clickXAxis,
    clickYAxis,
} from "./change-view-box";
import { clickStone } from "./click-stone";
import { changeTextarea} from "./change-textarea";

interface BaseAction {
    type: string;
}

interface GlobalAction extends BaseAction {
    type: 'click-per-page' | 'click-list-zoom';
    input: string;
}

interface GoBoardButtonAction extends BaseAction {
    type: 'click-color' | 'click-character' | 'click-x-axis'
        | 'click-y-axis';
    input: {
        index: number,
        value: string,
    };
}

interface GoBoardRangeAction extends BaseAction {
    type: 'change-rows' | 'change-cols';
    input: {
        index: number,
        value: string,
    };
}

interface GoBoardStoneClick extends BaseAction {
    type: 'click-stone';
    input: {
        index: number,
        row: number,
        col: number,
    };
}

interface ChangeTextarea extends BaseAction {
    type: 'change-textarea';
    input: {
        index: number,
        text: string,
    }
}


export type AllActions = GlobalAction | GoBoardButtonAction
 | GoBoardRangeAction | GoBoardStoneClick | ChangeTextarea;

export type LoadAction = {
}

export class Model {
    update(state: State, detail: AllActions):State {
        switch(detail.type) {
            case 'click-per-page':
                return clickPerPage(state, detail.input);
            case 'click-list-zoom':
                return clickListZoom(state, detail.input);
            case 'click-color':
                return clickColor(state, detail.input);
            case 'click-character':
                return clickCharacter(state, detail.input);
            case 'change-rows':
                return changeRows(state, detail.input);
            case 'change-cols':
                return changeCols(state, detail.input);
            case 'click-x-axis':
                return clickXAxis(state, detail.input);
            case 'click-y-axis':
                return clickYAxis(state, detail.input);
            case 'click-stone':
                return clickStone(state, detail.input);
            case 'change-textarea':
                return changeTextarea(state, detail.input);
            default:
                return state;
        }
    }
    save(state: State):void {}
    load(state: State, input: unknown):State {
        return state;
    }
}
