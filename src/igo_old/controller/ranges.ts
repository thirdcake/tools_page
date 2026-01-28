type RangeData = {
    title: string;
    type: string;
}

class Range {
    dom = document.createElement('div');
    input = document.createElement('input');
    span = document.createElement('span');

    constructor(data: RangeData) {
        this.dom.classList.add('go-form-range');
        const title = document.createElement('span');
        title.textContent = data.title;

        this.input.type = 'range';
        this.input.min = '5';
        this.input.max = '19';
        this.input.value = '19';
        this.input.dataset.type = data.type;

        this.span.textContent = '19';

        this.dom.appendChild(title);
        this.dom.appendChild(this.input);
        this.dom.appendChild(this.span);

        this.input.addEventListener('change', () => {
            this.span.textContent = this.input.value;
        }, false);
    }

    set range(input:unknown) {
        const num = Number(input);
        if(0 < num && num <= 19) {
            this.span.textContent = `${num}`;
            this.input.value = `${num}`;
        }
    }

}

export class ColsRange extends Range {
    constructor() {
        super({
            title: '横幅：',
            type: 'cols',
        });
    }
}

export class RowsRange extends Range {
    constructor() {
        super ({
            title: '高さ：',
            type: 'rows',
        });
    }
}

