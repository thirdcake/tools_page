import { ButtonsData } from "./init_data";

export class Buttons<T> {
    dom: HTMLUListElement;
    #buttons: HTMLButtonElement[];

    constructor(
        type: string,
        data: ButtonsData<T>
    ) {
        this.dom = document.createElement('ul');
        this.dom.classList.add('go-form-ul');
        this.dom.appendChild(this.#createTitle(data.title));
        this.#buttons = this.#createButtons(type, data)
        this.#buttons[data.active].classList.add('active');
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
        data: ButtonsData<T>,
    ):HTMLButtonElement[] {
        return data.data.map(dat => {
            const button = document.createElement('button');
            button.dataset.gostateType = type;
            button.dataset.gostateValue = `${dat.value}`;
            button.textContent = dat.text;
            return button;
        });
    }
    
}
