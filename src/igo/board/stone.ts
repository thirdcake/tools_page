import { config } from "./config";
import { State, ColorData, StoneData } from "../state";

type ColorPattern = 'empty'|'onlyChar'|'black'|'white';

export class Stone {
    #data: StoneData = ['0', ''];
    #state: State;

    #dom: SVGGElement;
    #circle: SVGCircleElement;
    #text: SVGTextElement;
    
    #patternMap = Object.freeze({
        empty: {
            circle_fill: 'transparent',
            circle_stroke: 'transparent',
            text_fill: 'transparent',
        },
        onlyChar:{
            circle_fill: '#fff',
            circle_stroke: '#fff',
            text_fill: config.color,
        },
        black:{
            circle_fill: config.color,
            circle_stroke: config.color,
            text_fill: '#fff',
        },
        white:{
            circle_fill: '#fff',
            circle_stroke: config.color,
            text_fill: config.color,
        },
    } as const );

    constructor(
        row:number,
        col:number,
        color:unknown,
        character:unknown,
        state: State,
    ) {
        this.#state = state;
        this.#dom = document.createElementNS(config.ns, 'g') as SVGGElement;
        this.#circle = this.#createCircle(row, col);
        this.#dom.appendChild(this.#circle);
        this.#text = this.#createText(row, col);
        this.#dom.appendChild(this.#text);

        this.#data = [
            (color==='1'||color==='2') ? color: '0',
            (`${character}`.length > 0) ? `${character}`[0] : '',
        ];
        this.#render();
    }
    get dom():SVGGElement { return this.#dom }

    onChange(color: ColorData, character: string):void {
        const same_color = color === this.#data[0];
        const same_char = character === this.#data[1];
        const is_same = same_color && same_char;

        this.#data[0] = is_same ? '0' : color;
        this.#data[1] = is_same ? '' : character;

        this.#render();
    }

    #createCircle(row:number, col:number): SVGCircleElement {
        const circle = document.createElementNS(config.ns, 'circle') as SVGCircleElement;
        circle.setAttribute('cx', `${col}`);
        circle.setAttribute('cy', `${row}`);
        circle.setAttribute('r', `${config.radius}`);
        circle.setAttribute('fill', 'transparent');
        circle.setAttribute('stroke', 'transparent');
        circle.setAttribute('stroke-width', `${config.thick}`);
        return circle;
    }

    #createText(row:number, col:number): SVGTextElement {
        const text = document.createElementNS(config.ns, 'text') as SVGTextElement;
        const text_size = config.text_size;
        const font_style = `font:normal ${text_size}px sans-serif`
        text.setAttribute('style', font_style);
        text.setAttribute('x', `${col}`);
        const base_line = config.radius * 0.6;
        const y = base_line + row;
        text.setAttribute('y', `${y}`);
        text.setAttribute('fill', 'transparent');
        text.setAttribute('text-anchor', 'middle');
        text.textContent = '';
        return text;
    }

    #render():void {
        const color = this.#state.color.input.init[this.#state.color.input.active].value as ColorData;
        const character = this.#state.character.input.init[this.#state.character.input.active].value;

        let colorPattern: ColorPattern = 'empty';
        if(color === '0' && character === '') {
            colorPattern = 'empty';
        }else if(color === '0') {
            colorPattern = 'onlyChar';
        }else if(color === '1') {
            colorPattern = 'black';
        }else if(color === '2') {
            colorPattern = 'white';
        }

        const {
            circle_fill,
            circle_stroke,
            text_fill
        } = this.#patternMap[colorPattern];

        this.#circle.setAttribute('fill', circle_fill);
        this.#circle.setAttribute('stroke', circle_stroke);
        this.#text.setAttribute('fill', text_fill);
        this.#text.textContent = character;
    }

}
