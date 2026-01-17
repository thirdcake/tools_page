import { config } from "./config";
import { Color, Character } from "../state/holders";

type ColorPattern = 'empty'|'onlyChar'|'black'|'white';
interface ColorStyle {
    circle_fill: string;
    circle_stroke: string;
    text_fill: string;
}

export class Stone {
    #color = new Color();
    #character = new Character();

    #g: SVGGElement;
    #circle: SVGCircleElement;
    #text: SVGTextElement;
    
    #patternMap: Record<ColorPattern, ColorStyle> = Object.freeze({
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
        color:any,
        character:any,
    ) {
        this.#g = document.createElementNS(config.ns, 'g') as SVGGElement;
        this.#circle = this.#createCircle(row, col);
        this.#g.appendChild(this.#circle);
        this.#text = this.#createText(row, col);
        this.#g.appendChild(this.#text);
        this.#color.state = color;
        this.#character.state = character;
        this.#render();
    }
    get g():SVGGElement { return this.#g }

    onChange(color:string, character:string):void {
        const same_color = color === `${this.#color.state}`;
        const same_char = character === this.#character.state;
        const is_same = same_color && same_char;

        this.#color.state = is_same ? 0 : color;
        this.#character.state = is_same ? '' : character;

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
        const color = this.#color.state;
        const character = this.#character.state;

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
