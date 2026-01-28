import { config, stoneColorPattern } from "./config";

type ColorPattern = 'empty'|'onlyChar'|'black'|'white';
export type StoneTupple = [0|1|2, string];

export class Stone {
    dom = document.createElementNS(config.ns, 'g');
    circle = document.createElementNS(config.ns, 'circle');
    text = document.createElementNS(config.ns, 'text');

    tupple: StoneTupple;

    constructor(x:number, y:number) {
        this.tupple = [0, ''];
        this.initCircle(x, y);
        this.dom.appendChild(this.circle);
        this.initText(x, y);
        this.dom.appendChild(this.text);
    }

    render(tupple: StoneTupple):void {
        this.tupple = [...tupple];

        const [color, character] = tupple;
        let pattern: ColorPattern = 'empty';
        if(color===0 && character==='') {
            pattern = 'empty';
        }else if(color === 0) {
            pattern = 'onlyChar';
        }else if(color === 1) {
            pattern = 'black';
        }else if(color === 2) {
            pattern = 'white';
        }

        const {
            circle_fill,
            circle_stroke,
            text_fill
        } = stoneColorPattern[pattern];

        this.circle.setAttribute('fill', circle_fill);
        this.circle.setAttribute('stroke', circle_stroke);
        this.text.setAttribute('fill', text_fill);
        this.text.textContent = character;
        
    }

    initCircle(x:number, y:number):void {
        this.circle.setAttribute('cx', `${x}`);
        this.circle.setAttribute('cy', `${y}`);
        this.circle.setAttribute('r', `${config.radius}`);
        this.circle.setAttribute('fill', 'transparent');
        this.circle.setAttribute('stroke', 'transparent');
        this.circle.setAttribute('stroke-width', `${config.thick}`);
    }

    initText(x: number, y: number):void {
        const text_size = config.text_size;
        const font_style = `font:normal ${text_size}px sans-serif`;
        this.text.setAttribute('style', font_style);
        this.text.setAttribute('x', `${x}`);
        const base_line = config.radius * 0.6;
        const base_y = base_line + y;
        this.text.setAttribute('y', `${base_y}`);
        this.text.setAttribute('fill', 'transparent');
        this.text.setAttribute('text-anchor', 'middle');
        this.text.textContent = '';
    }

}

