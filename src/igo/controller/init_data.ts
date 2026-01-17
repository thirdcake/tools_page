import { ColorState, CharacterState, LengthState, CoordinatesState} from "../constants";

export type ButtonsData<T> = {
    title: string,
    active: number,
    data: {value: T, text:string}[],
}
export type RangeData<T> = {
    title: string,
}

export const init_data : {
    color: ButtonsData<ColorState>,
    character: ButtonsData<CharacterState>,
    length: ButtonsData<LengthState>,
    coordinates: RangeData<CoordinatesState>,
} = Object.freeze({
    color: {
        title: '',
        active: 0,
        data: [
            {value:0, text:'透明'},
            {value:1, text:'黒'},
            {value:2, text:'白'},
        ]
    },
    character: {
        title: '',
        active: 0,
        data: [
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
        ],
    },
    length: {
        title: '',
        active: 0,
        data: [],
    },
    coordinates: {
        title: '',
        active: 0,
        data: [],
    },
});

