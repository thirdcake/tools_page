import { Buttons } from "../buttons";
import { GoWrapperState } from "../../state";


export class CharacterButtons extends Buttons {
    state: string;

    constructor(idx: number, state: GoWrapperState) {
        super({
            title: '文字：',
            type: 'click-character',
            init: [
                { text: '（無し）', value: '' },
                { text: 'A', value: 'A' },
                { text: 'B', value: 'B' },
                { text: 'C', value: 'C' },
                { text: 'D', value: 'D' },
                { text: 'E', value: 'E' },
                { text: '△', value: '△' },
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' },
                { text: '5', value: '5' },
            ],
        });

        this.state = state.character;

        this.buttons[1].classList.add('active');

        this.buttons.forEach(button => {
            const event = new CustomEvent('go-event', {
                bubbles: true,
                detail: {
                    type: 'click-character',
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
        if(this.state === state.character) return;
        this.state = state.character;
        this.buttons.forEach((button) => {
            button.classList.toggle('active', this.state === button.value);
        });
    }
}
