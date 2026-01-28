type InitData = {
    text: string;
    value: string;
}

type ButtonData = {
    title: string;
    type: string;
    init: InitData[];
}

class Buttons {
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
            btn.dataset.type = input.type;
            btn.dataset.value = ini.value;
            btn.textContent = ini.text;
            return btn;
        });

        this.buttons[0].classList.add('active');

        this.buttons.forEach(btn => {
            const li = document.createElement('li');
            li.appendChild(btn);
            this.dom.appendChild(li);
        });

        this.buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.buttons.forEach(b => {
                    b.classList.toggle('active', b===btn);
                });
            }, false);
        });
    }
}

export class ColorButtons extends Buttons {
    constructor() {
        super({
            title: '石の色：',
            type: 'color',
            init: [
                {text: '（無色）', value: '0'},
                {text: '黒', value: '1'},
                {text: '白', value: '2'},
            ],
        });
    }
}


export class CharacterButtons extends Buttons {
    constructor() {
        super({
            title: '文字：',
            type: 'character',
            init: [
                {text: '（無し）', value: ''},
                {text: 'A', value: 'A'},
                {text: 'B', value: 'B'},
                {text: 'C', value: 'C'},
                {text: 'D', value: 'D'},
                {text: 'E', value: 'E'},
                {text: '△', value: '△'},
                {text: '1', value: '1'},
                {text: '2', value: '2'},
                {text: '3', value: '3'},
                {text: '4', value: '4'},
                {text: '5', value: '5'},
            ],
        });
    }
}

export class XAxisButtons extends Buttons {
    constructor() {
        super({
            title: '横軸：',
            type: 'x-axis',
            init: [
                {text: '（無し）', value: 'none'},
                {text: '1,2,3,...', value: 'num'},
                {text: 'あ,い,う,...', value: 'aiu'},
                {text: 'イ,ロ,ハ,...', value: 'iroha'},
            ],
        });
    }
    set active(input:unknown) {
        if(input==='none'||input==='num'||input==='aiu'||input==='iroha') {
            this.buttons.forEach(btn => {
                btn.classList.toggle('active', input===btn.dataset.value);
            });
        }
    }
}

export class YAxisButtons extends Buttons {
    constructor() {
        super({
            title: '縦軸：',
            type: 'y-axis',
            init: [
                {text: '（無し）', value: 'none'},
                {text: '1,2,3,...', value: 'num'},
                {text: 'あ,い,う,...', value: 'aiu'},
                {text: 'イ,ロ,ハ,...', value: 'iroha'},
            ],
        });
    }
    set active(input:unknown) {
        if(input==='none'||input==='num'||input==='aiu'||input==='iroha') {
            this.buttons.forEach(btn => {
                btn.classList.toggle('active', input===btn.dataset.value);
            });
        }
    }
}
