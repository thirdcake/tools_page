import { State } from "../state/state";
import { Buttons } from "./buttons";
import { Ranges } from "./ranges";
import { init_data } from "./init_data";
import { ColorState, CharacterState, LengthState, CoordinatesState} from "../constants";

type ButtonState =
    | Buttons<ColorState>
    | Buttons<CharacterState>
    | Buttons<LengthState>
    | Buttons<CoordinatesState>;
type Field = ButtonState | Ranges;

export class Controller {
    
    dom: HTMLDivElement;
    fields: Field[];
    
    constructor() {
        this.dom = document.createElement('div');
        this.fields = [];
    }


}
