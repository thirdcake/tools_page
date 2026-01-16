import { config } from "./config";

export class Stone {
    #color: 0|1|2 = 0;
    #character: string;

    g: SVGGElement;
    
    #circle: SVGCircleElement;
    #text: SVGTextElement;

    constructor(
        row:number,
        col:number,
        color:number,
        character:string = ''
    ) {
        this.g = document.createElementNS(config.ns, 'g') as SVGGElement;
        this.#circle = this.#createCircle(row, col);
        this.g.appendChild(this.#circle);
        this.#text = this.#createText(row, col);
        this.g.appendChild(this.#text);
        this.color = color;
        this.#character = character;
        this.#render();
    }

    set color(color:string|number) {
        const color_string = `${color}`
        switch (color_string) {
            case '1':
                this.#color = 1;
                break;
            case '2':
                this.#color = 2;
                break;
            default:
                this.#color = 0;
        }
    }

    onChange(color:string, character:string):void {
        const same_color = color === `${this.#color}`;
        const same_char = character === this.#character;
        if(same_color && same_char) {
            this.#color = 0;
            this.#character = '';
        } else {
            this.color = color;
            this.#character = character;
        }
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
        const color = this.#color;
        const character = this.#character;
        const line_color = config.color;

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
