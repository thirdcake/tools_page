import { RangeData } from "./init_data";

type RangeType = {
    input: HTMLInputElement,
    span: HTMLSpanElement,
}

export class Ranges {
    
    dom: HTMLDivElement;
    #ranges: RangeType[];
    constructor(rangeData: RangeData) {
        this.#ranges = [];
        this.dom = document.createElement('div');
        this.dom.classList.add('go-form-range');

        const label = document.createElement('label');

        const title = document.createElement('span');
        title.textContent = rangeData.title;
        label.appendChild(title);
        
        const input = document.createElement('input');
        input.type = 'range';
        input.dataset.gostateType = 'range';
        input.dataset.gostateDir = rangeData.direction;
        input.value = rangeData.value;
        input.min = rangeData.min;
        input.max = rangeData.max;
        label.appendChild(input);
        
        const span = document.createElement('span');
        span.textContent = rangeData.value;
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
