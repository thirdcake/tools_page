import { config } from "./consts";

export type GoWrapperState = {
    list: 'none' | 'list' | 'detail';
    color: 0 | 1 | 2;
    character: string;
    rows: number;
    cols: number;
    xAxis: string;
    yAxis: string;
    viewBox: string;
    data: [number, string][][];
    textarea: string;
}

export type State = {
    perPage: 4 | 6;
    goWrapper: GoWrapperState[];
}

export const initState: State = {
    perPage: 6,
    goWrapper: Array.from({length: 6}, ()=>({
        list: 'list',
        color: 0,
        character: '',
        rows: 19,
        cols: 19,
        xAxis: 'none',
        yAxis: 'none',
        viewBox: [
            0,
            0,
            config.interval * config.size,
            config.interval * config.size,
        ].join(' '),
        data: Array.from({length: 19}, () =>
            Array.from({length: 19}, ()=>([0, '']))),
        textarea: '',
    })),
}
