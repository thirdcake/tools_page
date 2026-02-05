import { Model, AllActions, LoadAction } from "./model/model";
import { initState, State } from "./state";
import { View } from "./view/view";

declare global {
    interface HTMLElementEventMap {
        'go-event': CustomEvent<{
            detail: AllActions
        }>;
        'go-save': CustomEvent;
        'go-load': CustomEvent<{
            detail: LoadAction
        }>;
    }
}

class Controller extends HTMLElement{
    constructor() {
        super();

        let state: State = { ...initState };
        const view = new View(state);

        this.appendChild(view.dom);

        this.addEventListener('go-event', (ev: CustomEvent)=>{
            state = Model.update(state, ev.detail);
            view.render(state);
        }, false);

        this.addEventListener('go-save', () => {
            Model.save(state);
        }, false);

        this.addEventListener('go-load', (ev: CustomEvent) => {
            state = Model.load(state, ev.detail.input);
            view.render(state);
        }, false);
    }
}

customElements.define('go-quiz', Controller);
