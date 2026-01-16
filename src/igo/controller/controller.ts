import { State } from "../state/state";
import { Buttons } from "./buttons";
import { Ranges } from "./ranges";

export class Controller {
    
    buttons: HTMLButtonElement[];
    ranges: {
        span: HTMLSpanElement,
        input: HTMLInputElement,
    }[];
    dom: HTMLDivElement;
    
    constructor(state: State) {
        this.buttons = [];
        const color_buttons = new Buttons('color', state.color);
        this.buttons = color_buttons.pushButtons(this.buttons);
        const character_buttons = new Buttons('character', state.character);
        this.buttons = character_buttons.pushButtons(this.buttons);
        const hollizontal_buttons = new Buttons('holizontal', state.holizontal);
        this.buttons = hollizontal_buttons.pushButtons(this.buttons);
        const vertical_buttons = new Buttons('vertical', state.vertical);
        this.buttons = vertical_buttons.pushButtons(this.buttons);
        
        this.ranges = [];
        const width_range = new Ranges(state.width);
        this.ranges = width_range.pushRanges(this.ranges);
        const height_range = new Ranges(state.height);
        this.ranges = height_range.pushRanges(this.ranges);
        
        this.dom =  document.createElement('div');
        this.dom.appendChild(color_buttons.dom);
        this.dom.appendChild(character_buttons.dom);
        this.dom.appendChild(width_range.dom);
        this.dom.appendChild(height_range.dom);
        this.dom.appendChild(hollizontal_buttons.dom);
        this.dom.appendChild(vertical_buttons.dom);
        
    }
    
    onClick(state: State) {
        this.buttons.forEach(button => {
            const isSameType = button.dataset.gostateType === state.type;
            const isSameValue = button.dataset.gostateValue === state.newVal;
            if(isSameType) {
                if(isSameValue) {
                    button.classList.add('active');
                }else{
                    button.classList.remove('active');
                }
            }
        });
    }

}
