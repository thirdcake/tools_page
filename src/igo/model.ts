import { State } from "./state";

interface BaseAction {
    type: string;
}

interface ClickPerPage extends BaseAction {
    type: 'click-per-page';
    input: {};
}

export type AllActions = ClickPerPage

export class Model {
    update(state: State, detail:AllActions):State {
        switch(detail.type) {
            case 'click-per-page':
                break;
        }
        return state;
    }
}
