import { Buttons, ButtonData } from "../buttons";
import { GoWrapperState } from "../../state";

class AxisButtons extends Buttons {
    type: 'xAxis' | 'yAxis';
    idx: number;
    state: string;

    constructor(idx: number, state: GoWrapperState, type: 'xAxis' | 'yAxis', data: ButtonData) {
        super(data);

        this.type = type;
        this.idx = idx;
        this.state = state[this.type];

        this.buttons[0].classList.add('active');

        this.buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.dispatchEvent(data.type, button.value);
            }, false);
        });
    }
    
    dispatchEvent(detail_type: string, button_value: string) {
        const event = new CustomEvent('go-event', {
            bubbles: true,
            detail: {
                type: detail_type,
                input: {
                    index: this.idx,
                    value: button_value,
                },
            }
        });
        this.dom.dispatchEvent(event);
    }
    
    render(state: GoWrapperState):void {
        if(this.state === state[this.type]) return;
        this.state = state[this.type];
        this.buttons.forEach(button => {
            button.classList.toggle('active', state[this.type]===button.value);
        });
    }
}

export class XAxisButtons extends AxisButtons {
    constructor(idx: number, state: GoWrapperState) {
        super(idx, state, 'xAxis', {
            title: '横軸：',
            type: 'click-x-axis',
            init: [
                {text: '（無し）', value: 'none'},
                {text: '1,2,3,...', value: 'num'},
                {text: 'あ,い,う,...', value: 'aiu'},
                {text: 'イ,ロ,ハ,...', value: 'iroha'},
            ],
        });

    }
}

export class YAxisButtons extends AxisButtons {
    constructor(idx: number, state: GoWrapperState) {
        super(idx, state, 'yAxis', {
            title: '縦軸：',
            type: 'click-y-axis',
            init: [
                {text: '（無し）', value: 'none'},
                {text: '1,2,3,...', value: 'num'},
                {text: 'あ,い,う,...', value: 'aiu'},
                {text: 'イ,ロ,ハ,...', value: 'iroha'},
            ],
        });

    }
}
