import { config } from "./config";

export function createGrid(): SVGGElement {
    const dom = document.createElementNS(config.ns, 'g');
    return dom;
}
