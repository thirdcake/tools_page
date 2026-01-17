import {
    ColorState,
    CharacterState,
    LengthState,
    COORDINATES_DATA,
    CoordinatesState,
} from "../constants";

const isCoordinatesState = (str: any): str is CoordinatesState => 
    COORDINATES_DATA.includes(str);

abstract class StateHolder<T = any> {
    protected abstract _state: T;
    abstract get state(): string;
    abstract set state(input: any);
}


export class Color extends StateHolder<ColorState> {
    protected _state: ColorState = 0;
    
    get state(): string { return `${this._state}`; }
    set state(input: any) {
        const str = `${input}`;
        if (str === '1' || str === '2') {
            this._state = Number(str) as ColorState;
        } else {
            this._state = 0;
        }
    }
}

export class Character extends StateHolder<CharacterState> {
    protected _state: CharacterState = '';
    
    get state(): string { return this._state; }
    set state(input: any) {
        const str = `${input}`;
        this._state = str.length > 0 ? str[0] : '';
    }
}

export class Coordinates extends StateHolder<CoordinatesState> {
    protected _state: CoordinatesState = 'null';
    
    get state(): string { return this._state; }
    set state(input: any) {
        const str = `${input}`;
        this._state = isCoordinatesState(str) ? str : COORDINATES_DATA[0];
    }
}

export class Length extends StateHolder<LengthState> {
    protected _state: LengthState = 19;
    private readonly MAX = 19;
    private readonly MIN = 1;

    get state(): string { return `${this._state}`; }
    set state(input: any) {
        const num = Number(input);
        if (num >= this.MIN && num <= this.MAX) {
            this._state = num;
        }
    }
}
