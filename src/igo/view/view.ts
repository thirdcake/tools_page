import { State } from "../state";
import { GlobalHeader } from "./header/header";
import { GoWrapper } from "./go-wrapper";

export class View {
    dom = document.createElement('div');

    globalHeader: GlobalHeader;
    goWrappers: GoWrapper[];

    constructor(state: State) {
        this.globalHeader = new GlobalHeader(state);
        this.dom.appendChild(this.globalHeader.dom);

        this.goWrappers = Array.from({length: 6}, (_, i) => ( new GoWrapper(i, state.goWrapper[i]) ));
        this.goWrappers.forEach(gW => {
            this.dom.appendChild(gW.dom);
        });
    }

    render(state: State):void {
        this.globalHeader.render(state);
        this.goWrappers.forEach((gW, i) => gW.render(state.goWrapper[i]));
    }
}
