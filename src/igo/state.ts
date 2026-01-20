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

export interface Fields {
    inputType: 'button' | 'range' | 'textarea',
    input: ButtonsInput | RangesInput | TextareaInput,
    dom: ButtonsDom | RangesDom | HTMLTextAreaElement | null;
}

export class State {
    color: Fields;
    character: Fields;
    vertical: Fields;
    horizontal: Fields;
    width: Fields;
    height: Fields;
    textarea: Fields;

    constructor() {
        this.color = {
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
        },
        this.character = {
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
        this.vertical = {
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
        this.horizontal = {
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
        
        this.width = {
            inputType: 'range',
            input: {
                title: '横幅：',
                value: 19,
                min: 5,
                max: 19,
            },
            dom: null,
        }
        this.height = {
            inputType: 'range',
            input: {
                title: '高さ：',
                value: 19,
                min: 5,
                max: 19,
            },
            dom: null,
        }
        this.textarea = {
            inputType: 'textarea',
            input: {
                placeholder: 'ここに文章を書けます。',
            },
            dom: null,
        }
    }
}
