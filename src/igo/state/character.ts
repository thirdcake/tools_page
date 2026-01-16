import { ButtonState } from "./buttons";

export class CharacterState extends ButtonState {

    constructor() {
        super();

        this._title = '文字：';
        this._active = 0;
        this._data = [
            {value:'', text:'（無し）'},
            {value:'A', text:'A'},
            {value:'B', text:'B'},
            {value:'C', text:'C'},
            {value:'D', text:'D'},
            {value:'E', text:'E'},
            {value:'△', text:'△'},
            {value:'1', text:'1'},
            {value:'2', text:'2'},
            {value:'3', text:'3'},
            {value:'4', text:'4'},
        ]
    }
}


