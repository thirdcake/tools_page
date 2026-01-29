export type GoWrapperState = {
    color: 0 | 1 | 2;
    character: string;
    rows: number;
    cols: number;
    xAxis: string;
    yAxis: string;
    data: [number, string][][];
    textarea: string;
}

export type ZoomState = 'none' | 'list' | 'detail';

export type State = {
    perPage: 4 | 6;
    listZoom: ZoomState[];
    goWrapper: GoWrapperState[];
}

export const initState: State = {
    perPage: 6,
    listZoom: Array.from({length: 6}, ()=>'list'),
    goWrapper: Array.from({length: 6}, ()=>({
        color: 0,
        character: '',
        rows: 19,
        cols: 19,
        xAxis: 'none',
        yAxis: 'none',
        data: Array.from({length: 19}, () =>
            Array.from({length: 19}, ()=>([0, '']))),
        textarea: '',
    })),
}
