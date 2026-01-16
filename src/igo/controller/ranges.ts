import { RangesState } from "../state/ranges";

type RangeType = {
    input: HTMLInputElement,
    span: HTMLSpanElement,
}

export class Ranges {
    
    dom: HTMLDivElement;
    #ranges: RangeType[];
    constructor(state: RangesState) {
        this.#ranges = [];
        this.dom = document.createElement('div');
        this.dom.classList.add('go-form-range');

        const label = document.createElement('label');

        const title = document.createElement('span');
        title.textContent = state.title;
        label.appendChild(title);
        
        const input = document.createElement('input');
        input.type = 'range';
        input.dataset.gostateType = 'range';
        input.dataset.gostateDir = state.direction;
        input.value = state.value;
        input.min = state.min;
        input.max = state.max;
        label.appendChild(input);
        
        const span = document.createElement('span');
        span.textContent = state.value;
        label.appendChild(span);
        
        this.dom.appendChild(label);
        
        this.#ranges.push({
            input: input,
            span: span,
        });
    }
    
    pushRanges(parentRanges: RangeType[]): RangeType[] {
        this.#ranges.forEach(range => {
            parentRanges.push(range);
        });
        return parentRanges;
    }
}
