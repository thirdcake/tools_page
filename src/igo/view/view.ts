import { State } from "../state";
import { GlobalHeader } from "./header/header";
import { GoWrapper } from "./go-wrapper";

export class View {
    dom = document.createDocumentFragment();
    wrapper = document.createElement('div');

    globalHeader: GlobalHeader;
    goWrappers: GoWrapper[];

    constructor(state: State) {
        this.globalHeader = new GlobalHeader(state);
        this.dom.appendChild(this.globalHeader.dom);

        this.wrapper.classList.add('go-wrapper');
        this.dom.appendChild(this.wrapper);

        this.goWrappers = Array.from(
            {length: 6},
            (_, i) => new GoWrapper(i, state.goWrapper[i])
        );
        this.goWrappers.forEach(gW => {
            this.wrapper.appendChild(gW.dom);
        });

        this.#display(state);
    }

    #display (state: State): void {
        this.wrapper.dataset.goPerPage = `${state.perPage}`;
    }

    render(state: State):void {
        this.#display(state);
        this.globalHeader.render(state);
        this.goWrappers.forEach((gW, i) => gW.render(state.goWrapper[i]));
    }
}
