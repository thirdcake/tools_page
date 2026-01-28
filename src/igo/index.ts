import { Model, AllActions } from "./model";
import { State } from "./state";
import { View } from "./view";

declare global {
    interface HTMLElementEventMap {
        'go-event': CustomEvent<{
            detail: AllActions
        }>;
    }
}

class Controller extends HTMLElement{
    constructor() {
        super();
        
        let state = new State();
        const model = new Model();
        const view = new View();
        
        this.appendChild(view.dom);

        view.dom.addEventListener('go-event', (ev: CustomEvent)=>{
            state = model.update(state, ev.detail);
            view.render(state);
        }, false);
    }
}

customElements.define('go-quiz', Controller);
