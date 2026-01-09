import { BoardConfig } from "./config";

export class Stone {
    #ns = 'http://www.w3.org/2000/svg';
    #config: BoardConfig;

    #color: 0|1|2;
    #character: string;

    g: SVGGElement;
    
    #circle: SVGCircleElement;
    #text: SVGTextElement;

    constructor(
        config:BoardConfig,
        row:number,
        col:number,
        color:0|1|2 = 0,
        character:string = ''
    ) {
        this.#config = config;
        this.g = document.createElementNS(this.#ns, 'g') as SVGGElement;
        this.#circle = this.#createCircle(row, col);
        this.g.appendChild(this.#circle);
        this.#text = this.#createText(row, col);
        this.g.appendChild(this.#text);
        this.#color = color;
        this.#character = character;
        this.#render();
    }

    onChange(color:0|1|2, character:string):void {
        const same_color = color === this.#color;
        const same_char = character === this.#character;
        if(same_color && same_char) {
            this.#color = 0;
            this.#character = '';
        } else {
            this.#color = color;
            this.#character = character;
        }
        this.#render();
    }

    #createCircle(row:number, col:number): SVGCircleElement {
        const circle = document.createElementNS(this.#ns, 'circle') as SVGCircleElement;
        circle.setAttribute('cx', `${col}`);
        circle.setAttribute('cy', `${row}`);
        circle.setAttribute('r', `${this.#config.radius}`);
        circle.setAttribute('fill', 'transparent');
        circle.setAttribute('stroke', 'transparent');
        circle.setAttribute('stroke-width', `${this.#config.thick}`);
        return circle;
    }

    #createText(row:number, col:number): SVGTextElement {
        const text = document.createElementNS(this.#ns, 'text') as SVGTextElement;
        const text_size = this.#config.text_size;
        const font_style = `font:normal ${text_size}px sans-serif`
        text.setAttribute('style', font_style);
        text.setAttribute('x', `${col}`);
        const base_line = this.#config.radius * 0.6;
        const y = base_line + row;
        text.setAttribute('y', `${y}`);
        text.setAttribute('fill', 'transparent');
        text.setAttribute('text-anchor', 'middle');
        text.textContent = '';
        return text;
    }

    #render():void {
        const color = this.#color;
        const character = this.#character;
        const line_color = this.#config.color;

        let circle_fill = 'transparent',
            circle_stroke = 'transparent',
            text_fill = 'transparent';
        if(color === 0 && character === '') {
            circle_fill = 'transparent';
            circle_stroke = 'transparent';
            text_fill = 'transparent';
        }else if(color === 0) {
            circle_fill = '#fff';
            circle_stroke = '#fff';
            text_fill = line_color;
        }else if(color === 1) {
            circle_fill = line_color;
            circle_stroke = line_color;
            text_fill = '#fff';
        }else if(color === 2) {
            circle_fill = '#fff';
            circle_stroke = line_color;
            text_fill = line_color;
        }

        this.#circle.setAttribute('fill', circle_fill);
        this.#circle.setAttribute('stroke', circle_stroke);
        this.#text.setAttribute('fill', text_fill);
        this.#text.textContent = character;
    }

}
