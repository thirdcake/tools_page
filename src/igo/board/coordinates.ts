import { config } from "./config";

export class Coordinates {
    dom = document.createElementNS(config.ns, 'g');
    xdom = document.createElementNS(config.ns, 'g');
    ydom = document.createElementNS(config.ns, 'g');

    xpositions:[number, number][] = config.positions
        .map(pos => ([pos, config.interval * (config.size + 1)]));
    ypositions:[number, number][] = config.positions
        .toReversed().map(pos => ([-config.interval, pos]));

    init_data = {
        aiu: 'あいうえおかきくけこさしすせそたちつて'.split(''),
        iroha: 'イロハニホヘトチリヌルヲワカヨタレソツ'.split(''),
        nums: Array.from({length: 19}, (_, i) => `${i+1}`),
    }

    constructor() {
        this.dom.appendChild(this.xdom);
        this.dom.appendChild(this.ydom);
    }

    reset(dom: SVGGElement):void {
        while(dom.firstChild) {
            dom.removeChild(dom.firstChild);
        }
    }

    createCoord(
        parent: SVGGElement,
        positions: [number, number][],
        init_data: string[]
    ):void {
        const text_size = config.text_size;
        const font_style = `font:normal ${text_size}px sans-serif`;
        const base_line = config.radius * 0.6;

        positions.forEach(([r_pos, c_pos], i) => {
            const text = document.createElementNS(config.ns, 'text');
            
            text.setAttribute('style', font_style);
            text.setAttribute('x', `${c_pos}`);
            text.setAttribute('y', `${base_line + r_pos}`);
            text.setAttribute('fill', 'transparent');
            text.setAttribute('text-anchor', 'middle');

            text.textContent = init_data[i];

            parent.appendChild(text);
        })
    }

    set xAxis(axis:string) {
        this.reset(this.xdom);
        switch(axis) {
            case 'nums':
                this.createCoord(this.xdom, this.xpositions, this.init_data.nums);
                break;
            case 'aiu':
                this.createCoord(this.xdom, this.xpositions, this.init_data.aiu);
                break;
            case 'iroha':
                this.createCoord(this.xdom, this.xpositions, this.init_data.iroha);
                break;
        }
    }

    set yAxis(axis:string) {
        this.reset(this.ydom);
        switch(axis) {
            case 'nums':
                this.createCoord(this.ydom, this.ypositions, this.init_data.nums);
                break;
            case 'aiu':
                this.createCoord(this.ydom, this.ypositions, this.init_data.aiu);
                break;
            case 'iroha':
                this.createCoord(this.ydom, this.ypositions, this.init_data.iroha);
                break;
        }
    }

}
