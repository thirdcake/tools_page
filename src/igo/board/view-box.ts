import { config } from "./config";

export class ViewBox {
    xAxis = 'none';
    yAxis = 'none';
    cols = 19;
    rows =  19;

    get child():string {
        const vb = [
            0,
            config.interval * (config.size - this.rows),
            config.interval * this.cols,
            config.interval * this.rows,
        ];
        return vb.join(' ');
    }

    get parent(): string {
        const rowCoord = (this.xAxis === 'none') ? 0 : config.interval;
        const colCoord = (this.yAxis === 'none') ? 0 : config.interval;
        const vb = [
            0 - rowCoord,
            0,
            config.interval * this.cols + rowCoord,
            config.interval * this.rows + colCoord,
        ];
        return vb.join(' ');
    }
}
