export interface ButtonsInit {
    value: string,
    text: string,
}

export interface ButtonsInput {
    title: string,
    active: number,
    init: ButtonsInit[],
}

export interface ButtonsDom {
    parent: HTMLDivElement | null,
    children: HTMLButtonElement[],
}

export interface RangesInput {
    title: string,
    value: number,
    min: number,
    max: number,
}

export interface RangesDom {
    input: HTMLInputElement,
    span: HTMLSpanElement,
}

export interface TextareaInput {
    placeholder: string,
}


export interface ButtonsFields {
    inputType: 'button',
    input: ButtonsInput,
    dom: ButtonsDom | null;
}

export interface RangesFields {
    inputType: 'range',
    input: RangesInput,
    dom: RangesDom | null;
}

export interface TextareaFields {
    inputType: 'textarea',
    input: TextareaInput,
    dom: HTMLTextAreaElement | null;
}

export type ColorData = '0'|'1'|'2';
export type StoneData = [ColorData, string];
export type StonesData = StoneData[][];

export class State {

    color: ButtonsFields = {
        inputType: 'button',
        input: {
            title: '碁石の色：',
            active: 0,
            init: [
                {value: '0', text: '透明'},
                {value: '1', text: '黒'},
                {value: '2', text: '白'},
            ],
        },
        dom: null,
    }

    character: ButtonsFields = {
        inputType: 'button',
        input: {
            title: '文字：',
            active: 0,
            init: [
                {value: '', text: '（無し）'},
                {value: 'A', text: 'A'},
                {value: 'B', text: 'B'},
                {value: 'C', text: 'C'},
                {value: 'D', text: 'D'},
                {value: 'E', text: 'E'},
                {value: '△', text: '△'},
                {value: '1', text: '1'},
                {value: '2', text: '2'},
                {value: '3', text: '3'},
                {value: '4', text: '4'},
                {value: '5', text: '5'},
            ],
        },
        dom: null,
    }

    vertical: ButtonsFields  = {
        inputType: 'button',
        input: {
            title: '縦座標',
            active: 0,
            init: [
                {value: 'null', text: '（無し）'},
                {value: 'nums', text: '1,2,3,...'},
                {value: 'aiu', text: 'あ,い,う,...'},
                {value: 'iroha', text: 'イ,ロ,ハ,...'},
            ],
        },
        dom: null,
    }

    horizontal: ButtonsFields = {
        inputType: 'button',
        input: {
            title: '横座標',
            active: 0,
            init: [
                {value: 'null', text: '（無し）'},
                {value: 'nums', text: '1,2,3,...'},
                {value: 'aiu', text: 'あ,い,う,...'},
                {value: 'iroha', text: 'イ,ロ,ハ,...'},
            ],
        },
        dom: null,
    }

    width: RangesFields = {
        inputType: 'range',
        input: {
            title: '横幅：',
            value: 19,
            min: 5,
            max: 19,
        },
        dom: null,
    }

    height: RangesFields = {
        inputType: 'range',
        input: {
            title: '高さ：',
            value: 19,
            min: 5,
            max: 19,
        },
        dom: null,
    }

    textarea: TextareaFields = {
        inputType: 'textarea',
        input: {
            placeholder: 'ここに文章を書けます。',
        },
        dom: null,
    }

    stones: StonesData = [];
}
