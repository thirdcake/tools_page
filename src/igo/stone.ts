type StateType = {
    color: 0|1|2,
    character: string,
}
export class Stone {
    #ns = 'http://www.w3.org/2000/svg';
    #black_color = '#333';
    #radius = 20;   // 碁石の半径
    #stroke_width = 4;     // 枠の線
    #state:StateType = {
        color: 0,
        character: ''
    }

    group: SVGGElement;
    #circle: SVGCircleElement;
    #text: SVGTextElement;

    constructor(
        row:number,
        col:number,
        color:0|1|2 = 0,
        character:string = ''
    ) {
        this.group = document.createElementNS(this.#ns, 'g') as SVGGElement;
        this.group.setAttribute('transform', `translate(${col}, ${row})`);
        this.#circle = this.#createCircle();
        this.group.appendChild(this.#circle);
        this.#text = this.#createText();
        this.group.appendChild(this.#text);
        this.#state = this.#updateState([color, character]);
        this.#render(this.#state);
    }

    onChange(state:[0|1|2, string]):void {
        this.#state = this.#updateState(state);
        this.#render(this.#state);
    }

    #createCircle(): SVGCircleElement {
        const circle = document.createElementNS(this.#ns, 'circle') as SVGCircleElement;
        circle.setAttribute('cx', '0');
        circle.setAttribute('cy', '0');
        circle.setAttribute('r', `${this.#radius}`);
        circle.setAttribute('fill', 'transparent');
        circle.setAttribute('stroke', 'transparent');
        circle.setAttribute('stroke-width', `${this.#stroke_width}`);
        return circle;
    }

    #createText(): SVGTextElement {
        const text = document.createElementNS(this.#ns, 'text') as SVGTextElement;
        const text_size = this.#radius * 1.8;
        text.setAttribute('style', `font:normal ${text_size}px sans-serif`);
        text.setAttribute('x', '0');
        const base_line = this.#radius * 0.6;
        text.setAttribute('y', `${base_line}`);
        text.setAttribute('fill', 'transparent');
        text.setAttribute('text-anchor', 'middle');
        text.textContent = '';
        return text;
    }

    #updateState(state:[0|1|2, string]):StateType {
        const [color, character] = state;
        if(color === this.#state.color && character === this.#state.character) {
            return {
                color: 0,
                character: '',
            }
        } else {
            return {
                color,
                character,
            }
        }
    }

    #render(state:StateType):void {
        let circle_fill = 'transparent',
            circle_stroke = 'transparent',
            text_fill = 'transparent';
        if(state.color === 0 && state.character === '') {
            circle_fill = 'transparent';
            circle_stroke = 'transparent';
            text_fill = 'transparent';
        }else if(state.color === 0) {
            circle_fill = '#fff';
            circle_stroke = '#fff';
            text_fill = this.#black_color;
        }else if(state.color === 1) {
            circle_fill = this.#black_color;
            circle_stroke = this.#black_color;
            text_fill = '#fff';
        }else if(state.color === 2) {
            circle_fill = '#fff';
            circle_stroke = this.#black_color;
            text_fill = this.#black_color;
        }
        this.#circle.setAttribute('fill', circle_fill);
        this.#circle.setAttribute('stroke', circle_stroke);
        this.#text.setAttribute('fill', text_fill);
        this.#text.textContent = state.character;
    }

}
