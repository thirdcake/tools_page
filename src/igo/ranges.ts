type RangeType = {
    input: HTMLInputElement,
    span: HTMLSpanElement,
}

export class Ranges {
    
    dom: HTMLDivElement;
    #ranges: RangeType[];
    constructor(
        init: {
            title: string,
            dir: string,
            min: string,
            max: string,
            value: string,
        }[]
    ) {
        this.#ranges = [];
        this.dom = document.createElement('div');
        this.dom.classList.add('go-form-range');
        
        init.forEach(dat => {
            const label = document.createElement('label');

            const title = document.createElement('span');
            title.textContent = dat.title;
            label.appendChild(title);
            
            const input = document.createElement('input');
            input.type = 'range';
            input.dataset.gostateType = 'range';
            input.dataset.gostateDir = dat.dir;
            input.value = dat.value;
            input.min = dat.min;
            input.max = dat.max;
            label.appendChild(input);
            
            const span = document.createElement('span');
            span.textContent = dat.value;
            label.appendChild(span);
            
            this.dom.appendChild(label);
            
            this.#ranges.push({
                input: input,
                span: span,
            });
        });
    }
    
    pushRanges(parentRanges: RangeType[]): RangeType[] {
        this.#ranges.forEach(range => {
            parentRanges.push(range);
        });
        return parentRanges;
    }
}
