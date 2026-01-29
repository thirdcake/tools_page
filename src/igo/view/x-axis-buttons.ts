import { Buttons } from "./buttons";
import { State } from "../state";


export class XAxisButtons extends Buttons {
    constructor(idx: number) {
        super({
            title: '横軸：',
            type: 'click-x-axis',
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
                    type: 'click-x-axis',
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
