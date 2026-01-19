import {
    ColorState,
    CharacterState,
    LengthState,
    COORDINATES_DATA,
    CoordinatesState,
} from "../constants";


abstract class StateHolder <T> {
    abstract _state: T;
    get state(): string { return `${this._state}` }
    set state(input: unknown) {
        this._state = this.validate(input);
    }
    abstract validate(input:unknown):T;
}

export class Color extends StateHolder<ColorState> {
    _state: ColorState = 0;
    validate(input:unknown):ColorState {
        const str = `${input}`;
        switch(str) {
            case '1': return 1;
            case '2': return 2;
            default: return 0;
        }
    }
}

export class Character extends StateHolder<CharacterState> {
    _state: CharacterState = '';
    validate(input:unknown):CharacterState {
        const str = `${input}`;
        return str.length > 0 ? str[0] : '';
    }
}

export class Coordinates extends StateHolder<CoordinatesState> {
    _state: CoordinatesState = 'null';
    validate(input:unknown):CoordinatesState {
        const str = `${input}`;
        const isCoState = (str: string): str is CoordinatesState => {
            return (COORDINATES_DATA as readonly string[]).includes(str);
        }
        return isCoState(str) ? str : COORDINATES_DATA[0];
    }
}

export class Length extends StateHolder<LengthState> {
    _state: LengthState = 19;
    #max = 19;
    #min = 1;
    validate(input:unknown):LengthState {
        const num = Number(input ?? 19);
        const isOverMin = this.#min <= num;
        const isUnderMax = num <= this.#max;
        return (isOverMin && isUnderMax) ? num : 19;
    }
}
