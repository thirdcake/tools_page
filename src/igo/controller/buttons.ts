import { ButtonState } from "../state/buttons";

export class Buttons {
    dom: HTMLUListElement;
    #buttons: HTMLButtonElement[];

    constructor(
        type: string,
        state: ButtonState
    ) {
        this.dom = document.createElement('ul');
        this.dom.classList.add('go-form-ul');
        this.dom.appendChild(this.#createTitle(state.title));
        this.#buttons = this.#createButtons(type, state.data)
        this.#buttons[state.active].classList.add('active');
        this.#buttons.forEach(button => {
            const li = document.createElement('li');
            li.appendChild(button);
            this.dom.appendChild(li);
        });
    }
    
    pushButtons(parentButtons:HTMLButtonElement[]):HTMLButtonElement[] {
        this.#buttons.forEach(button => {
            parentButtons.push(button);
        });
        return parentButtons;
    }
    
    #createTitle(title: string): HTMLLIElement {
        const li = document.createElement('li');
        li.textContent = title;
        return li;
    }
    
    #createButtons(
        type: string,
        data: {value: string, text:string}[]
    ):HTMLButtonElement[] {
        return data.map(dat => {
            const button = document.createElement('button');
            button.dataset.gostateType = type;
            button.dataset.gostateValue = dat.value;
            button.textContent = dat.text;
            return button;
        });
    }
    
}
