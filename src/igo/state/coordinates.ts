import { ButtonState } from "./buttons";

class CoordinatesState extends ButtonState {
    constructor() {
        super();
        this._active = 0,
        this._data = [
            {value: 'null', text: '（無し）'},
            {value: 'nums', text: '1,2,3...'},
            {value: 'aiu', text: 'あ,い,う...'},
            {value: 'iroha', text: 'イ,ロ,ハ...'},
        ]
    }
}

export class HCoordinatesState extends CoordinatesState {
    constructor() {
        super();
        this._title = '座標（縦）：';
    }
}

export class VCoordinatesState extends CoordinatesState {
    constructor() {
        super();
        this._title = '座標（横）：';
    }

}
