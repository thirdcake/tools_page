import { Model, AllActions, LoadAction } from "./model/model";
import { initState, State } from "./state";
import { View } from "./view/view";

declare global {
    interface HTMLElementEventMap {
        'go-event': CustomEvent<{
            detail: AllActions
        }>;
        'go-save': Event;
        'go-load': CustomEvent<{
            detail: LoadAction
        }>;
    }
}

class Controller extends HTMLElement{
    constructor() {
        super();

        let state: State = { ...initState };
        const model = new Model();
        const view = new View(state);

        this.appendChild(view.dom);

        view.render(state);

        view.dom.addEventListener('go-event', (ev: CustomEvent)=>{
            state = model.update(state, ev.detail);
            view.render(state);
        }, false);

        view.dom.addEventListener('go-save', () => {
            model.save(state);
        }, false);

        view.dom.addEventListener('go-load', (ev: CustomEvent) => {
            state = model.load(state, ev.detail);
            view.render(state);
        }, false);
    }
}

customElements.define('go-quiz', Controller);
