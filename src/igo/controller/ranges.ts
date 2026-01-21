import { State } from "../state";

export class Ranges {
    
    dom: HTMLDivElement;
    #input: HTMLInputElement;
    #span: HTMLSpanElement;
    #state: State;

    constructor(
        type: 'width' | 'height',
        state: State,
    ) {
        this.dom = document.createElement('div');
        this.dom.classList.add('go-form-range');

        this.#state = state;

        const input = state[type].input;

        const title = document.createElement('span');
        title.textContent = input.title;
        this.dom.appendChild(title);

        this.#input = document.createElement('input');
        this.#input.type = 'range';
        this.#input.min = `${input.min}`;
        this.#input.max = `${input.max}`;
        this.#input.value = `${input.value}`;
        this.dom.appendChild(this.#input);

        this.#span = document.createElement('span');
        this.#span.textContent = `${input.value}`;

        this.dom.addEventListener('change', ()=>{
            const num = Number(this.#input.value);
            this.#span.textContent = this.#input.value;

            if(input.min <= num && num <= input.max) {
                input.value = num;
            }
        }, false);

    }

}
