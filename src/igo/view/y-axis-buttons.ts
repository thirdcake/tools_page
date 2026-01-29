import { Buttons } from "./buttons";
import { State } from "../state";


export class YAxisButtons extends Buttons {
    constructor(idx: number) {
        super({
            title: '縦軸：',
            type: 'click-y-axis',
            init: [
                {text: '（無し）', value: 'none'},
                {text: '1,2,3,...', value: 'num'},
                {text: 'あ,い,う,...', value: 'aiu'},
                {text: 'イ,ロ,ハ,...', value: 'iroha'},
            ],
        });

        this.buttons[1].classList.add('active');

        this.buttons.forEach(button => {
            const event = new CustomEvent('go-event', {
                bubbles: true,
                detail: {
                    type: 'click-y-axis',
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

    render(state: State):void {
        this.buttons.forEach(button => {});
    }
}
