import { ButtonState, BasicDataInterface } from "./buttons";


interface ColorDataInterface extends BasicDataInterface {
    value: '0'|'1'|'2';
    text: string,
}

export class ColorState extends ButtonState<ColorDataInterface> {

    constructor() {
        super();

        this._title = '色：';
        this._active = 0;
        this._data = [
            {value:'0', text:'透明'},
            {value:'1', text:'黒'},
            {value:'2', text:'白'},
        ];
    }

    get value():"0"|"1"|"2" {
        if(this._active < this._data.length) {
            return this._data[this._active].value;
        } else {
            return this._data[0].value;
        }
    }
    set value(value:string) {
        const idx = this._data.findIndex(dat => dat.value === value);
        this._active = idx === -1 ? 0 : idx;
    }

}

