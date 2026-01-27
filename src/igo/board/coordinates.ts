import { config } from "./config";

export class Coordinates {
    dom = document.createElementNS(config.ns, 'g');
    x = {
        num: document.createElementNS(config.ns, 'g'),
        aiu: document.createElementNS(config.ns, 'g'),
        iroha: document.createElementNS(config.ns, 'g'),
    }
    y = {
        num: document.createElementNS(config.ns, 'g'),
        aiu: document.createElementNS(config.ns, 'g'),
        iroha: document.createElementNS(config.ns, 'g'),
    }

    xpositions:[number, number][] = config.positions
        .map(pos => ([pos, config.interval * (config.size + 0.5)]));
    ypositions:[number, number][] = config.positions
        .toReversed().map(pos => ([-Math.floor(config.interval/2), pos]));

    init_data = {
        aiu: 'あいうえおかきくけこさしすせそたちつて'.split(''),
        iroha: 'イロハニホヘトチリヌルヲワカヨタレソツ'.split(''),
        num: Array.from({length: 19}, (_, i) => `${i+1}`),
    }

    constructor() {
        this.createCoord(this.x.num, this.xpositions, this.init_data.num);
        this.createCoord(this.x.aiu, this.xpositions, this.init_data.aiu);
        this.createCoord(this.x.iroha, this.xpositions, this.init_data.iroha);
        this.createCoord(this.y.num, this.ypositions, this.init_data.num);
        this.createCoord(this.y.aiu, this.ypositions, this.init_data.aiu);
        this.createCoord(this.y.iroha, this.ypositions, this.init_data.iroha);

        this.dom.appendChild(this.x.num);
        this.dom.appendChild(this.x.aiu);
        this.dom.appendChild(this.x.iroha);
        this.dom.appendChild(this.y.num);
        this.dom.appendChild(this.y.aiu);
        this.dom.appendChild(this.y.iroha);
    }

    createCoord(
        parent: SVGGElement,
        positions: [number, number][],
        init_data: string[]
    ):void {
        parent.style.fill = 'transparent';
        const text_size = config.text_size;
        const font_style = `font:normal ${text_size}px sans-serif`;
        const base_line = config.radius * 0.6;

        positions.forEach(([x_pos, y_pos], i) => {
            const text = document.createElementNS(config.ns, 'text');
            
            text.setAttribute('style', font_style);
            text.setAttribute('x', `${x_pos}`);
            text.setAttribute('y', `${base_line + y_pos}`);
            text.setAttribute('text-anchor', 'middle');

            text.textContent = init_data[i];

            parent.appendChild(text);
        })
    }

    set xAxis(axis:string) {
        this.x.num.style.fill = 'transparent';
        this.x.aiu.style.fill = 'transparent';
        this.x.iroha.style.fill = 'transparent';
        switch(axis) {
            case 'num':
                this.x.num.style.fill = config.color;
                break;
            case 'aiu':
                this.x.aiu.style.fill = config.color;
                break;
            case 'iroha':
                this.x.iroha.style.fill = config.color;
                break;
        }
    }

    set yAxis(axis:string) {
        this.y.num.style.fill = 'transparent';
        this.y.aiu.style.fill = 'transparent';
        this.y.iroha.style.fill = 'transparent';
        switch(axis) {
            case 'num':
                this.y.num.style.fill = config.color;
                break;
            case 'aiu':
                this.y.aiu.style.fill = config.color;
                break;
            case 'iroha':
                this.y.iroha.style.fill = config.color;
                break;
        }
    }

}
