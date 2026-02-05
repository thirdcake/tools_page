import { Buttons } from "../buttons";
import { State } from "../../state";


export class PerPageButtons extends Buttons {
    constructor(state: State) {
        super({
            title: '１ページに表示する数：',
            type: 'click-per-page',
            init: [
                { text: '4つ', value: '4', },
                { text: '6つ', value: '6', },
            ],
        });

        this.dom.classList.add('no-print');

        this.#activeClass(state);

        this.buttons.forEach(button => {
            const event = new CustomEvent('go-event', {
                bubbles: true,
                detail: {
                    type: 'click-per-page',
                    input: button.value,
                }
            });

            button.addEventListener('click', () => {
                this.dom.dispatchEvent(event);
            }, false);
        });
    }

    #activeClass(state: State): void {
        this.buttons.forEach(button => {
            button.classList.toggle('active', `${state.perPage}`===button.value);
        });
    }

    render(state: State):void {
        this.#activeClass(state);
    }
}
