import { State } from "./state";

export class Controller {
    
    dom: HTMLDivElement;

    #data = {
        color: {
            title: '色：',
            dat:[
                {value:'0', text:'透明', active:true},
                {value:'1', text:'黒', active:false},
                {value:'2', text:'白', active:false},
            ]
        },
        character: {
            title: '文字：',
            dat:[
                {value: '', text: '（無し）', active: true},
                {value: 'A', text: 'A', active: false},
                {value: 'B', text: 'B', active: false},
                {value: 'C', text: 'C', active: false},
                {value: 'D', text: 'D', active: false},
                {value: 'E', text: 'E', active: false},
                {value: '△', text: '△', active: false},
                {value: '1', text: '1', active: false},
                {value: '2', text: '2', active: false},
                {value: '3', text: '3', active: false},
                {value: '4', text: '4', active: false},
            ]
        },
        holizontal: {
            title: '座標（縦）：',
            dat: [
                {value: 'null', text: '（無し）', active: true},
                {value: 'nums', text: '1,2,3...', active: false},
                {value: 'aiu', text: 'あ,い,う...', active: false},
                {value: 'iroha', text: 'イ,ロ,ハ...', active: false},
            ]
        },
        vertical: {
            title: '座標（横）：',
            dat: [
                {value: 'null', text: '（無し）', active: true},
                {value: 'nums', text: '1,2,3...', active: false},
                {value: 'aiu', text: 'あ,い,う...', active: false},
                {value: 'iroha', text: 'イ,ロ,ハ...', active: false},
            ]
        },
    }

    buttons: {
        color: HTMLButtonElement[],
        character: HTMLButtonElement[],
        holizontal: HTMLButtonElement[],
        vertical: HTMLButtonElement[],
    }

    ranges = {
        x: document.createElement('span'),
        y: document.createElement('span'),
    };
    
    constructor() {
        this.buttons = {
            color: this.#createButtons('color', this.#data.color.dat),
            character: this.#createButtons('character', this.#data.character.dat),
            holizontal: this.#createButtons('holizontal', this.#data.holizontal.dat),
            vertical: this.#createButtons('vertical', this.#data.vertical.dat),
        };
        this.dom = this.#createDom();
    }
    
    onClick(state: State) {
        if(state.is_change===false) return;
        const updateActive = (type: 'color'|'character'|'holizontal'|'vertical') => {
            this.buttons[type].forEach(btn => {
                btn.classList.remove('active');
                const val = Number(btn.dataset.gostateValue);
                if(isNaN(val)) return;
                if(val === state.color) {
                    btn.classList.add('active');
                }
            });
        }
        switch(state.type) {
            case 'color':
            case 'character':
            case 'holizontal':
            case 'vertical':
                updateActive(state.type);
                break;
        }
    }

    onChange(state: State) {
        switch(state.type) {
            case 'range-x':
                this.ranges.x.textContent = `${state.rangeX}`;
                break;
            case 'range-y':
                this.ranges.y.textContent = `${state.rangeY}`;
                break;
        }
    }

    #createDom():HTMLDivElement {
        const dom = document.createElement('div');
        dom.appendChild(this.#createUl(
            this.#data.color.title,
            this.buttons.color,
        ));
        dom.appendChild(this.#createUl(
            this.#data.character.title,
            this.buttons.character,
        ));
        dom.appendChild(this.#createRange());
        dom.appendChild(this.#createUl(
            this.#data.holizontal.title,
            this.buttons.holizontal,
        ));
        dom.appendChild(this.#createUl(
            this.#data.vertical.title,
            this.buttons.vertical,
        ));
        return dom;
    }

    #createButtons(
        type: string,
        origin:{value:string, text:string, active:boolean}[],
    ):HTMLButtonElement[] {
        return origin.map(o => {
            const dom = document.createElement('button');
            dom.dataset.gostateType = type;
            dom.dataset.gostateValue = o.value;
            dom.textContent = o.text;
            if(o.active) {
                dom.classList.add('active');
            }
            return dom;
        });
    }

    #createUl(
        title: string,
        buttons: HTMLButtonElement[],
    ):HTMLUListElement {
        const ul = document.createElement('ul');
        ul.classList.add('go-form-ul');
        const li = document.createElement('li');
        li.textContent = title;
        ul.appendChild(li);
        return buttons.reduce((uldom, button) => {
            const li = document.createElement('li');
            li.appendChild(button);
            uldom.appendChild(li);
            return uldom;
        }, ul);
    }

    #createRange():HTMLDivElement {
        const div = document.createElement('div');
        div.classList.add('go-form-range');
        const data = [
            {text: '縦幅', dir: 'range-y', min: '1', max: '19', value: '19'},
            {text: '横幅', dir: 'range-x', min: '1', max: '19', value: '19'},
        ];
        data.forEach(obj => {
            const label = document.createElement('label');
            
            const title = document.createElement('span');
            title.textContent = obj.text;
            label.appendChild(title);
            
            const input = document.createElement('input');
            input.type = 'range';
            input.dataset.gostateType = 'range';
            input.dataset.gostateDir = obj.dir;
            input.value = obj.value;
            input.min = obj.min;
            input.max = obj.max;
            label.appendChild(input);

            switch(obj.dir) {
                case 'range-x':
                    this.ranges.x.textContent = obj.value;
                    label.appendChild(this.ranges.x);
                    break;
                case 'range-y':
                    this.ranges.y.textContent = obj.value;
                    label.appendChild(this.ranges.y);
                    break;
            }
            div.appendChild(label);
        });
        return div;
    }

}
