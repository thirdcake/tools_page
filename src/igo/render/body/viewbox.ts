import { State } from "../../wrapper";
import { config } from "./config";

export function innerViewBox(state: State): string {
    const max = config.size * config.interval;
    const minx = 0;
    const width = state.width * config.interval;
    const height = state.height * config.interval;
    const miny = max - height;
    return [minx, miny, width, height].join(' ');
}

export function outerViewBox(state: State): string {
    const max = config.size * config.interval;
    let width = state.width * config.interval;
    let height = state.height * config .interval;
    let minx = 0;
    let miny = max - height;
    if(state.vertical !== 'null') {
        minx -= config.interval;
        width += config.interval;
    }
    if(state.horizontal !== 'null') {
        height += config.interval;
    }
    return [minx, miny, width, height].join(' ');
}
