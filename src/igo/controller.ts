import { State } from "./state";
import { Buttons } from "./buttons";
import { Ranges } from "./ranges";

export class Controller {
    
    buttons: HTMLButtonElement[];
    ranges: {
        span: HTMLSpanElement,
        input: HTMLInputElement,
    }[];
    
    dom: HTMLDivElement;
    
    #init_data = {
        color: {
            title: '色：',
            active: 0,
            data:[
                {value:'0', text:'透明'},
                {value:'1', text:'黒'},
                {value:'2', text:'白'},
            ]
        },
        character: {
            title: '文字：',
            active: 0,
            data:[
                {value: '', text: '（無し）'},
                {value: 'A', text: 'A'},
                {value: 'B', text: 'B'},
                {value: 'C', text: 'C'},
                {value: 'D', text: 'D'},
                {value: 'E', text: 'E'},
                {value: '△', text: '△'},
                {value: '1', text: '1'},
                {value: '2', text: '2'},
                {value: '3', text: '3'},
                {value: '4', text: '4'},
            ]
        },
        holizontal: {
            title: '座標（縦）：',
            active: 0,
            data: [
                {value: 'null', text: '（無し）'},
                {value: 'nums', text: '1,2,3...'},
                {value: 'aiu', text: 'あ,い,う...'},
                {value: 'iroha', text: 'イ,ロ,ハ...'},
            ]
        },
        vertical: {
            title: '座標（横）：',
            active: 0,
            data: [
                {value: 'null', text: '（無し）'},
                {value: 'nums', text: '1,2,3...'},
                {value: 'aiu', text: 'あ,い,う...'},
                {value: 'iroha', text: 'イ,ロ,ハ...'},
            ]
        },
        range: {
            data: [
                {title: '縦幅', dir: 'range-y', min: '1', max: '19', value: '19'},
                {title: '横幅', dir: 'range-x', min: '1', max: '19', value: '19'},
            ]
        },
    }
    
    constructor() {
        this.buttons = [];
        const color_buttons = new Buttons('color', this.#init_data.color);
        this.buttons = color_buttons.pushButtons(this.buttons);
        const character_buttons = new Buttons('character', this.#init_data.character);
        this.buttons = character_buttons.pushButtons(this.buttons);
        const hollizontal_buttons = new Buttons('holizontal', this.#init_data.holizontal);
        this.buttons = hollizontal_buttons.pushButtons(this.buttons);
        const vertical_buttons = new Buttons('vertical', this.#init_data.vertical);
        this.buttons = vertical_buttons.pushButtons(this.buttons);
        
        this.ranges = [];
        const dir_ranges = new Ranges(this.#init_data.range.data);
        this.ranges = dir_ranges.pushRanges(this.ranges);
        
        this.dom =  document.createElement('div');
        this.dom.appendChild(color_buttons.dom);
        this.dom.appendChild(character_buttons.dom);
        this.dom.appendChild(dir_ranges.dom);
        this.dom.appendChild(hollizontal_buttons.dom);
        this.dom.appendChild(vertical_buttons.dom);
        
    }
    
    onClick(state: State) {
        if(state.is_change === false) return;
        this.buttons.forEach(button => {
            const isSameType = button.dataset.gostateType === state.type;
            const isSameValue = button.dataset.gostateValue === state.value;
            if(isSameType) {
                if(isSameValue) {
                    button.classList.add('active');
                }else{
                    button.classList.remove('active');
                }
            }
        });
    }
    onChange(state: State) {
        if(state.is_change === false) return;
        this.ranges.forEach(range => {
            const isSameDir = range.input.dataset.gostateDir === state.type;
            if(isSameDir) {
                range.span.textContent = state.value;
            }
        });
    }

}
