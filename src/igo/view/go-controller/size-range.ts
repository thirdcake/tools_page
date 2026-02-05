import { GoWrapperState } from "../../state";

class Range {
    dom = document.createElement('div');

    title = document.createElement('span');
    input = document.createElement('input');
    disp = document.createElement('span');
    
    state: number = 19;
    type: 'cols'|'rows';

    constructor(idx: number, title: string, type: 'cols'|'rows') {
        this.type = type;
        this.dom.classList.add('go-form-range');

        // title
        this.title.textContent = title;
        this.dom.appendChild(this.title);

        // input
        this.input.type = 'range';
        this.input.min = '5';
        this.input.max = '19';
        this.input.value = `${this.state}`;
        this.dom.appendChild(this.input);

        // disp
        this.disp.textContent = `${this.state}`;
        this.dom.appendChild(this.disp);
        
        this.input.addEventListener('input', () => {
            const event = new CustomEvent('go-event', {
                bubbles: true,
                detail: {
                    type: `change-${type}`,
                    input: {
                        index: idx,
                        value: this.input.value,
                    },
                }
            })
            this.dom.dispatchEvent(event);
        }, false);
    }
    
    render(state: GoWrapperState):void {
        if(this.state === state[this.type]) return;
        this.state = state[this.type];
        this.disp.textContent = `${this.state}`;
    }
}

export class ColsRange extends Range {
    constructor(idx: number) {
        super(idx, '横幅：', 'cols');
    }
}

export class RowsRange extends Range {
    constructor(idx: number) {
        super(idx, '高さ：', 'rows');
    }
}
