import { Buttons } from "../buttons";
import { GoWrapperState } from "../../state";


export class ColorButtons extends Buttons {
    state: number;
    constructor(idx: number, state: GoWrapperState) {
        super({
            title: '碁石の色：',
            type: 'click-color',
            init: [
                { text: '（無色）', value: '0', },
                { text: '黒', value: '1', },
                { text: '白', value: '2', },
            ],
        });
        this.state = state.color;

        this.buttons[0].classList.add('active');

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
        if(state.color === this.state) return;
        this.state = state.color;
        this.buttons.forEach((button, i) => {
            button.classList.toggle('active', i===this.state);
        });
    }
}
