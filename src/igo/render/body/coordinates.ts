import { config } from "./config";
import { State } from "../../wrapper";

abstract class Coordinates {
    dom = document.createElementNS(config.ns, 'g') as SVGGElement;

    init_data = {
        aiu: 'あいうえおかきくけこさしすせそたちつて'.split(''),
        iroha: 'イロハニホヘトチリヌルヲワカヨタレソツ'.split(''),
        nums: Array.from({length: 19}, (_, i) => `${i+1}`),
    }
    
    groups = {
        aiu: document.createElementNS(config.ns, 'g') as SVGGElement,
        iroha: document.createElementNS(config.ns, 'g') as SVGGElement,
        nums: document.createElementNS(config.ns, 'g') as SVGGElement,
    }
    
    init(type: 'aiu'|'iroha'|'nums') {
        this.groups[type] = this.setChars(
            this.groups[type],
            this.init_data[type],
            this.positions
        );
        this.dom.appendChild(this.groups[type]);
    }
    
    switchCoord(type: string) {
        for (const [gtype, element] of Object.entries(this.groups)) {
            let opacity = '0';
            let pointer = '';
            if(gtype === type) {
                opacity = '1';
                pointer = 'none';
            }
            element.style.opacity = opacity;
        }
    }
    
    abstract get positions():[number, number][];

    setChars(
        group:SVGGElement,
        chars: string[],
        positions: [number, number][]
    ): SVGGElement {
        return chars.reduce((gro, char, idx) => {
            const [x, y] = positions[idx];
            const text = document.createElementNS(
                config.ns,
                'text'
            ) as SVGTextElement;
            text.setAttribute('x', `${x}`);
            text.setAttribute('y', `${y}`);
            const style = `font:normal ${config.text_size}px sans-serif;`;
            text.setAttribute('style', style);
            text.setAttribute('fill', 'currentColor');
            text.setAttribute('text-anchor', 'middle');
            text.textContent = char;
            gro.appendChild(text);
            return gro;
        }, group);
    }
    
    abstract render(state: State):void
}

export class Vertical extends Coordinates {
    vertical: string;

    constructor(state: State) {
        super();
        this.vertical = state.vertical;

        this.init('aiu');
        this.init('iroha');
        this.init('nums');
    }

    get positions(): [number, number][] {
        return config.positions.toReversed().map(row => {
            const x = 0 - Math.floor(config.interval / 2);
            const y = row + config.radius * 0.6;
            return [x, y];
        });
    }
    
    render(state: State):void {
        if(this.vertical === state.vertical) return;
        this.vertical = state.vertical;
        this.switchCoord(this.vertical);
    }
}

export class Horizontal extends Coordinates {
    horizontal: string;

    constructor(state: State) {
        super();
        this.horizontal = state.horizontal;

        this.init('aiu');
        this.init('iroha');
        this.init('nums');
    }
    
    get positions(): [number, number][] {
        return config.positions.map(col => {
            const y = (config.size + 1) * config.interval
                - config.radius * 0.6;
            const x = col;
            return [x, y];
        });
    }
    
    render(state: State):void {
        if(this.horizontal === state.horizontal) return;
        this.horizontal = state.horizontal;
        this.switchCoord(this.horizontal);
    }
}
