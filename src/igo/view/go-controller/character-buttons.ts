import { Buttons } from "../buttons";
import { GoWrapperState } from "../../state";


export class CharacterButtons extends Buttons {
    constructor(idx: number) {
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
        this.buttons.forEach((button) => {
            button.classList.toggle('active', state.character===button.value);
        });
    }
}
