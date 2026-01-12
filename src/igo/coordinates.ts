import { BoardConfig } from "./config";

export class Coordinates {
    #ns = 'http://www.w3.org/2000/svg';
    #config: BoardConfig;

    dom: SVGGElement;

    #aiu = 'あいうえおかきくけこさしすせそたちつて'.split('');
    #iroha = 'イロハニホヘトチリヌルヲワカヨタレソツ'.split('');
    #nums = Array.from({length: 19}, (_, i) => `${i+1}`);

    #verticalChars: SVGTextElement[];
    #holizontalChars: SVGTextElement[];

    constructor(config: BoardConfig, positions:number[]) {
        this.#config = config;
        const dom = document.createElementNS(this.#ns, 'g');
        if(!(dom instanceof SVGGElement)) {
            throw new Error('coordinates error');
        }
        this.dom = dom;
        this.#verticalChars = this.#createVerticalChars(positions);
        this.#holizontalChars = this.#createHolizontalChars(positions);

        this.dom = this.#setChars(this.dom, this.#verticalChars);
        this.dom = this.#setChars(this.dom, this.#holizontalChars);
    }

    onChangeCoord(type:'vertical'|'holizontal', value: string) {
        const arr = this.#changeChars(value);
        if(arr === null) return;
        if(type==='vertical') {
            arr.forEach((c:string, i:number) => {
                this.#verticalChars[i].textContent = c;
            });
        }else{
            arr.forEach((c:string, i:number) => {
                this.#holizontalChars[i].textContent = c;
            });
        }
    }

    #createVerticalChars(positions:number[]): SVGTextElement[] {
        const createVChar = (pos: number) => {
            const text = this.#createChar();
            const x = - Math.floor(this.#config.interval / 2);
            const base_line = this.#config.radius * 0.6;
            const y = pos + base_line;
            text.setAttribute('x', `${x}`);
            text.setAttribute('y', `${y}`);
            return text;
        } 
        const arr = positions.toReversed().map(createVChar);
        return arr;
    }

    #createHolizontalChars(positions:number[]): SVGTextElement[] {
        const createHChar = (pos: number) => {
            const text = this.#createChar();
            const base_line = this.#config.radius * 0.6;
            const y = this.#config.size * this.#config.interval
                + Math.floor(this.#config.interval / 2)
                + base_line;
            text.setAttribute('x', `${pos}`);
            text.setAttribute('y', `${y}`);
            return text;
        } 
        const arr = positions.map(createHChar);
        return arr;
    }

    #createChar():SVGTextElement {
            const text = document.createElementNS(this.#ns, 'text') as SVGTextElement;
            const style = `font:normal ${this.#config.text_size}px sans-serif;`;
            text.setAttribute('style', style);
            text.setAttribute('fill', this.#config.color);
            text.setAttribute('text-anchor', 'middle');
            return text;
    }

    #setChars(group:SVGGElement, chars: SVGTextElement[]): SVGGElement {
        return chars.reduce((group:SVGGElement, char:SVGTSpanElement) => {
            group.appendChild(char);
            return group;
        }, group)
    }

    #changeChars(value: string):(string[])|null {
        switch(value) {
            case 'aiu':
                return this.#aiu;
            case 'iroha':
                return this.#iroha;
            case 'nums':
                return this.#nums;
            default:
                return null;
        }
    }
}
