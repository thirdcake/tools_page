import { ColorState } from "./color";
import { CharacterState } from "./character";
import { VCoordinatesState, HCoordinatesState } from "./coordinates";
import { WidthState, HeightState } from "./ranges";

export class State {
    color = new ColorState();
    character = new CharacterState();
    vertical = new VCoordinatesState();
    holizontal = new HCoordinatesState();
    width = new WidthState();
    height = new HeightState();

    #type:null|string = null;
    #oldVal:null|string = null;
    #newVal:null|string = null;

    reset() {
        this.#type = null;
        this.#oldVal = null;
        this.#newVal = null;
    }

    get isChange():boolean { return (this.#newVal !== null) } 
    updateStart():void { this.reset() }
    updateEnd():void { this.reset() }

    get type() { return this.#type }
    get oldVal() { return this.#oldVal }
    get newVal() { return this.#newVal }

    onClick(target: HTMLButtonElement) {
        const type = target.dataset.gostateType;
        const value = target.dataset.gostateValue;
        if(typeof value === 'undefined') return;
        
        switch(type) {
            case 'color':
            case 'character':
            case 'vertical':
            case 'holizontal':
                this.#type = type;
                this.#oldVal = this[type].value;
                this[type].value = value;
                if(this[type].value !== this.#oldVal) {
                    this.#newVal = this[type].value;
                }
                break;
        }

    }
    onChange(target: HTMLInputElement) {
        const type = target.dataset.gostateType;
        const dir = target.dataset.gostateDir;
        const value = target.value;

        if(type==='range') {
            if(dir === 'x') {
                this.#type = 'width';
                this.#oldVal = this.width.value;
                this.width.value = value;
                if(this.width.value !== this.#oldVal) {
                    this.#newVal = this.width.value;
                }
            }else if(dir === 'y') {
                this.#type = 'height';
                this.#oldVal = this.height.value;
                this.height.value = value;
                if(this.height.value !== this.#oldVal) {
                    this.#newVal = this.height.value;
                }
            }
        }

    }
}
