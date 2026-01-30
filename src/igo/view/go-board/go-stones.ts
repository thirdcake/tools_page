import { config } from "../../consts";
import { GoWrapperState } from "../../state";

class Stone {
    dom = document.createElementNS(config.ns, 'g');
    idx: number;
    data:[number, string] = [0, ''];

    circle = document.createElementNS(config.ns, 'circle');
    char = document.createElementNS(config.ns, 'text');
    
    color = Object.freeze({
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
    });

    constructor(idx: number, row: number, col: number) {
        this.idx = idx;

        // 背景を作る（click 範囲になる）
        const background = document.createElementNS(config.ns, 'rect');
        const x = col * config.interval;
        background.setAttribute('x', `${x}`);
        const y = row * config.interval;
        background.setAttribute('y', `${y}`);
        background.setAttribute('width', `${config.interval}`);
        background.setAttribute('height', `${config.interval}`);
        background.setAttribute('fill', 'transparent');
        background.setAttribute('stroke', 'transparent');

        // 石を作る
        const cx = col * config.interval + Math.floor(config.interval / 2);
        this.circle.setAttribute('cx', `${cx}`);
        const cy = row * config.interval + Math.floor(config.interval / 2);
        this.circle.setAttribute('cy', `${cy}`);
        this.circle.setAttribute('r', `${config.radius}`);
        this.circle.setAttribute('fill', 'transparent');
        this.circle.setAttribute('stroke', 'transparent');
        this.circle.setAttribute('stroke-width', `${config.thick}`);

        // 文字を作る
        const text_size = config.text_size;
        const font_style = `font:normal ${text_size}px sans-serif`;
        this.char.setAttribute('style', font_style);
        this.char.setAttribute('x', `${cx}`);
        const base_line = config.radius * 0.6;
        const base_y = base_line + cy;
        this.char.setAttribute('y', `${base_y}`);
        this.char.setAttribute('fill', 'transparent');
        this.char.setAttribute('text-anchor', 'middle');
        this.char.textContent = '';

        // group にまとめる
        this.dom.appendChild(background);
        this.dom.appendChild(this.circle);
        this.dom.appendChild(this.char);

        // click イベント
        this.dom.addEventListener('click', () => {
            const event = new CustomEvent('', {
                bubbles: true,
                detail: {
                    index: idx,
                    row: row,
                    col: col,
                },
            });
            this.dom.dispatchEvent(event);
        }, false);
    }

    render(stoneData: [number, string]):void {
        if(this.data === stoneData) return;
        this.data = stoneData;

        let pattern: 'empty' | 'onlyChar' | 'black' | 'white';
        switch (this.data[0]) {
            case 1:
                pattern = 'black';
            case 2:
                pattern = 'white';
            default:
                pattern = (this.data[1]==='') ? 'empty' : 'onlyChar';
                break;
        }
        
        this.circle.setAttribute('fill', this.color[pattern].circle_fill);
        this.circle.setAttribute('stroke', this.color[pattern].circle_stroke);
        this.char.setAttribute('fill', this.color[pattern].text_fill);
        this.char.textContent = this.data[1];
    }
}

export class GoStones {
    dom = document.createElementNS(config.ns, 'g');
    idx: number;
    stones: Stone[][];
    data:[number, string][][];

    constructor(idx: number) {
        this.idx = idx;
        this.stones = Array.from({length: 19}, (_, r)=>
            Array.from({length: 19}, (_, c) => new Stone(idx, r, c)));
            
        this.data = Array.from({length: 19}, () => 
            Array.from({length: 19}, ()=> ([0, ''])));
    }

    render(state: GoWrapperState):void {
        if(this.data === state.data) return;
        this.stones.forEach((row, r) => {
            if(this.data[r] === state.data[r]) return;
            row.forEach((stone, c) => {
                if(this.data[r][c] === state.data[r][c]) return;
                stone.render(state.data[r][c]);
            });
        });
        this.data = state.data;
    }
}
