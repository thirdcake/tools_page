import { config } from "./config";

export class Grid {
    dom: SVGGElement;

    constructor(positions: number[]) {
        const dom = document.createElementNS(config.ns, 'g');
        if(!(dom instanceof SVGGElement)) {
            throw new Error('Grid の作成に失敗しました。');
        }
        this.dom = dom;
        this.dom = this.#drawLines(this.dom, positions);
        this.dom = this.#drawDots(this.dom, positions);
    }

    #drawLines(dom:SVGGElement, positions:number[]): SVGGElement {
        const start = Math.floor(config.interval / 2)
            - Math.floor(config.thick / 2);
        const end = config.interval * config.size - start;
        return positions.reduce((group:SVGGElement, pos:number, i:number) => {
            const isFirstOrLast = (i === 0 || i === positions.length - 1);
            const sw = isFirstOrLast ? config.thick : config.thin;
            group.appendChild(this.#createLine(start, end, pos, pos, sw));
            group.appendChild(this.#createLine(pos, pos, start, end, sw));
            return group;
        }, dom);
    }

    #drawDots(dom:SVGGElement, positions:number[]): SVGGElement {
        const isDotPos = (_:any, i:number) => (i===3 || i===9 || i===15);
        const filterPositions = positions.filter(isDotPos);
        filterPositions.forEach(pos_r => {
            filterPositions.forEach(pos_c => {
                dom.appendChild(this.#createDot(pos_r, pos_c));
            });
        });
        return dom;
    }

    #createLine(
        x1: number,
        x2: number,
        y1: number,
        y2: number,
        sw: number,
    ):SVGLineElement {
        const line = document.createElementNS(config.ns, 'line') as SVGLineElement;
        line.setAttribute('x1', `${x1}`);
        line.setAttribute('x2', `${x2}`);
        line.setAttribute('y1', `${y1}`);
        line.setAttribute('y2', `${y2}`);
        line.setAttribute('stroke', config.color);
        line.setAttribute('stroke-width', `${sw}`);
        return line;
    }

    #createDot(
        cx: number,
        cy: number,
    ):SVGCircleElement {
        const dot = document.createElementNS(config.ns, 'circle') as SVGCircleElement;
        dot.setAttribute('cx', `${cx}`);
        dot.setAttribute('cy', `${cy}`);
        const r = Math.floor(config.thick * 1.5);
        dot.setAttribute('r', `${r}`);
        dot.setAttribute('fill', config.color);
        return dot;
    }

}
