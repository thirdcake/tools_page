import { ColorState, CharacterState, LengthState, CoordinatesState} from "../constants";

type ButtonData<T> = {
    value: T,
    text: string,
}

export type ButtonsData<T> = {
    title: string,
    active: number,
    data: ButtonData<T>[],
}
export type RangeData = {
    title: string,
    min: 1,
    max: 19,
    value: 19,
}

export const init_data : {
    color: ButtonsData<ColorState>,
    character: ButtonsData<CharacterState>,
    width: RangeData,
    height: RangeData,
    horizontal: ButtonsData<CoordinatesState>,
    vertical: ButtonsData<CoordinatesState>,
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
    width: {
        title: '横幅',
        min: 1,
        max: 19,
        value: 19,
    },
    height: {
        title: '高さ',
        min: 1,
        max: 19,
        value: 19,
    },
    horizontal: {
        title: '座標（横）',
        active: 0,
        data: [
            {value: 'null', text: '（無し）'},
            {value: 'nums', text: '1,2,3,...'},
            {value: 'aiu', text: 'あ,い,う,...'},
            {value: 'iroha', text: 'イ,ロ,ハ,...'},
        ],
    },
    vertical: {
        title: '座標（縦）',
        direction: 'vertical',
        active: 0,
        data: [
            {value: 'null', text: '（無し）'},
            {value: 'nums', text: '1,2,3,...'},
            {value: 'aiu', text: 'あ,い,う,...'},
            {value: 'iroha', text: 'イ,ロ,ハ,...'},
        ],
    },
});

