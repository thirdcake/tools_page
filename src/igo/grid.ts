import { BoardConfig } from "./config";

export class Grid {
    #ns = 'http://www.w3.org/2000/svg';

    #config: BoardConfig;
    g: SVGGElement;

    constructor(config:BoardConfig, positions: number[]) {
        this.#config = config;
        this.g = document.createElementNS(this.#ns, 'g') as SVGGElement;
        this.g = this.#drawLines(this.g, positions);
        this.g = this.#drawDots(this.g, positions);
    }

    #drawLines(group:SVGGElement, positions:number[]): SVGGElement {
        const start = Math.floor(this.#config.interval / 2) - Math.floor(this.#config.thick / 2);
        const end = this.#config.interval * this.#config.size - start;
        return positions.reduce((gro:SVGGElement, pos:number, i:number) => {
            const isFirstOrLast = (i === 0 || i === positions.length - 1);
            const sw = isFirstOrLast ? this.#config.thick : this.#config.thin;
            gro.appendChild(this.#createLine(start, end, pos, pos, sw));
            gro.appendChild(this.#createLine(pos, pos, start, end, sw));
            return gro;
        }, group);
    }

    #drawDots(group:SVGGElement, positions:number[]): SVGGElement {
        const isDotPos = (_:any, i:number) => (i===3 || i===9 || i===15);
        const filterPositions = positions.filter(isDotPos);
        filterPositions.forEach(pos_r => {
            filterPositions.forEach(pos_c => {
                group.appendChild(this.#createDot(pos_r, pos_c));
            });
        });
        return group;
    }

    #createLine(
        x1: number,
        x2: number,
        y1: number,
        y2: number,
        sw: number,
    ):SVGLineElement {
        const line = document.createElementNS(this.#ns, 'line') as SVGLineElement;
        line.setAttribute('x1', `${x1}`);
        line.setAttribute('x2', `${x2}`);
        line.setAttribute('y1', `${y1}`);
        line.setAttribute('y2', `${y2}`);
        line.setAttribute('stroke', this.#config.color);
        line.setAttribute('stroke-width', `${sw}`);
        return line;
    }

    #createDot(
        cx: number,
        cy: number,
    ):SVGCircleElement {
        const dot = document.createElementNS(this.#ns, 'circle') as SVGCircleElement;
        dot.setAttribute('cx', `${cx}`);
        dot.setAttribute('cy', `${cy}`);
        const r = Math.floor(this.#config.thick * 1.5);
        dot.setAttribute('r', `${r}`);
        dot.setAttribute('fill', this.#config.color);
        return dot;
    }

}
