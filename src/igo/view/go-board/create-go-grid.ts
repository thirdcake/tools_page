import { config } from "../../consts";

export function createGoGrid():SVGGElement {
    const dom = document.createElementNS(config.ns, 'g');

    const start = Math.floor(config.interval / 2);
    const end = config.interval * config.size - start;

    // rect
    const rect = document.createElementNS(config.ns, 'rect');
    rect.setAttribute('x', `${start}`);
    rect.setAttribute('y', `${start}`);
    rect.setAttribute('width', `${config.interval * (config.size - 1)}`);
    rect.setAttribute('height', `${config.interval * (config.size - 1)}`);
    rect.setAttribute('fill', 'transparent');
    rect.setAttribute('stroke', config.color);
    rect.setAttribute('stroke-width', `${config.thick}`);
    dom.appendChild(rect);

    // lines
    const createLine = (
        x1: number,
        x2: number,
        y1: number,
        y2: number,
    ):SVGLineElement => {
        const line = document.createElementNS(config.ns, 'line');
        line.setAttribute('x1', `${x1}`);
        line.setAttribute('x2', `${x2}`);
        line.setAttribute('y1', `${y1}`);
        line.setAttribute('y2', `${y2}`);
        line.setAttribute('stroke', config.color);
        line.setAttribute('stroke-width', `${config.thin}`);
        return line;
    }
    const linePoss = config.positions
        .filter((_, i) => (0 < i && i < config.size - 1));
    linePoss.forEach(r_pos => {
        dom.appendChild(createLine(r_pos, r_pos, start, end));
    });
    linePoss.forEach(c_pos => {
        dom.appendChild(createLine(start, end, c_pos, c_pos));
    });

    // dots
    const createDots = (cx: number, cy: number) => {
        const dot = document.createElementNS(config.ns, 'circle');
        dot.setAttribute('cx', `${cx}`);
        dot.setAttribute('cy', `${cy}`);
        const r = Math.floor(config.thick * 1.5);
        dot.setAttribute('r', `${r}`);
        dot.setAttribute('fill', config.color);
        return dot;
    }
    const dotPoss = config.positions.filter((_, i) => (i===3||i===9||i===15));
    dotPoss.forEach(r_pos => {
        dotPoss.forEach(c_pos => {
            dom.appendChild(createDots(r_pos, c_pos));
        });
    });

    return dom;
}
