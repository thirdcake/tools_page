import { State } from "../state";

export class Buttons {
    dom: HTMLUListElement;
    #buttons: HTMLButtonElement[];
    #state: State;

    constructor(
        type: 'color' | 'character' | 'vertical' | 'horizontal',
        state: State,
    ) {
        this.dom = document.createElement('ul');
        this.dom.classList.add('go-form-ul');

        this.#state = state;
        const input = state[type].input;

        const title = document.createElement('li');
        title.textContent = input.title;
        this.dom.appendChild(title);

        this.#buttons = input.init.map(ipt => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.dataset.type = type;
            btn.dataset.value = ipt.value;
            btn.textContent = ipt.text;
            return btn;
        });

        this.#buttons[input.active].classList.add('active');
        this.#buttons.forEach(btn => {
            const li = document.createElement('li');
            li.appendChild(btn);
            this.dom.appendChild(li);
        });

        this.#buttons.forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                this.#buttons.forEach(b => {
                    b.classList.toggle('active', b === btn);
                });
            }, false);

            input.active = idx;
        });
    }

}
