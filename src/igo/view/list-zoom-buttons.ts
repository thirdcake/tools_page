import { Buttons } from "./buttons";
import { State } from "../state";

export class ListZoomButtons extends Buttons {
    constructor() {
        super({
            title: '表示：',
            type: 'click-list-zoom',
            init: [
                { text: '全体を俯瞰', value: '-1', },
                { text: '1つ目を拡大', value: '0', },
                { text: '2つ目を拡大', value: '1', },
                { text: '3つ目を拡大', value: '2', },
                { text: '4つ目を拡大', value: '3', },
                { text: '5つ目を拡大', value: '4', },
                { text: '6つ目を拡大', value: '5', },
            ],
        });
        
        this.buttons[0].classList.add('active');

        this.buttons.forEach(button => {
            const event = new CustomEvent('go-event', {
                bubbles: true,
                detail: {
                    type: 'click-list-zoom',
                    input: button.value,
                }
            });

            button.addEventListener('click', () => {
                this.dom.dispatchEvent(event);
            }, false);
        });
    }

    render(state: State):void {}
}