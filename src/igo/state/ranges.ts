interface RangeInterface {
    value: number,
    min: number,
    max: number,
    text: string,
}

export class RangesState {
    protected _title: string = '';
    protected _value: number = 19;
    protected _min: number = 1;
    protected _max: number = 19;
    protected _direction: string = '';

    get title():string { return this._title }
    get direction():string { return this._direction }
    get value():string { return `${this._value}` }
    set value(value:string) {
        const num:number = Number(value);
        if(this._min <= num && num <= this._max) {
            this._value = num;
        }
    }
    get min():string { return `${this._min}` }
    get max():string { return `${this._max}` }
}

export class WidthState extends RangesState {
    constructor() {
        super();

        this._title = '横幅';
        this._direction = 'x';
    }
}

export class HeightState extends RangesState {
    constructor() {
        super();

        this._title = '縦幅';
        this._direction = 'y';
    }
}
