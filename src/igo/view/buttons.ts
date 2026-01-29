type InitData = {
    text: string;
    value: string;
}

type ButtonData = {
    title: string;
    type: string;
    init: InitData[];
}

export class Buttons {
    dom = document.createElement('ul');
    buttons: HTMLButtonElement[];

    constructor(input: ButtonData) {
        this.dom.classList.add('go-form-ul');

        const title = document.createElement('li');
        title.textContent = input.title;
        this.dom.appendChild(title);

        this.buttons = input.init.map(ini => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.value = ini.value;
            btn.textContent = ini.text;
            return btn;
        });

        this.buttons.forEach(btn => {
            const li = document.createElement('li');
            li.appendChild(btn);
            this.dom.appendChild(li);
        });
    }
}
