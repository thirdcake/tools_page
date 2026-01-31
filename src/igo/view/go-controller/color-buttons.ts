import { Buttons } from "../buttons";
import { GoWrapperState } from "../../state";

export class ColorButtons extends Buttons {
    state: null|number = null;

    constructor(idx: number) {
        super({
            title: '碁石の色：',
            type: 'click-color',
            init: [
                { text: '（無色）', value: '0', },
                { text: '黒', value: '1', },
                { text: '白', value: '2', },
            ],
        });

        this.buttons.forEach(button => {
            const event = new CustomEvent('go-event', {
                bubbles: true,
                detail: {
                    type: 'click-color',
                    input: {
                        index: idx,
                        value: button.value,
                    },
                }
            });

            button.addEventListener('click', () => {
                this.dom.dispatchEvent(event);
            }, false);
        });
    }

    render(state: GoWrapperState):void {
        if(this.state === state.color) return;
        this.state = state.color;
        this.buttons.forEach((button, i) => {
            button.classList.toggle('active', i===this.state);
        });
    }
}
