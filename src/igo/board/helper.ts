import { config } from "./config";

export class ViewBox {
    #width: number;
    #height: number;
    #vertical: number;
    #horizontal: number;

    constructor() {
        this.#width = config.size * config.interval;
        this.#height =config.size * config.interval;
        this.#vertical = 0;
        this.#horizontal = 0;
    }

    set width(size: string) {
        const numSize = Number(size);
        this.#width = numSize * config.interval;
    }
    set height(size: string) {
        const numSize = Number(size);
        this.#height = numSize * config.interval;
    }
    set vertical(coord: string) {
        this.#vertical = (coord === 'null') ? 0 : config.interval;
    }
    set horizontal(coord: string) {
        this.#horizontal = (coord === 'null') ? 0 : config.interval;
    }

    get viewBox():string {
        return [
            0 - this.#vertical,
            0 - this.#horizontal,
            this.#width + this.#vertical,
            this.#height + this.#horizontal
        ].join(' ');
    }
}
