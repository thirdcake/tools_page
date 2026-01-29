import { State } from "../state";
import { config } from "../view/consts";

type Input = {
    index: number;
    value: string;
}

function createViewBox(
    rows:number,
    cols:number,
    hasXAxis:boolean,
    hasYAxis:boolean
):string {
    let min_x = hasYAxis ? 0 - config.interval : 0;
    let min_y = config.interval * (config.size - rows);
    let width = config.interval * cols;
    let height = config.interval * rows + (hasXAxis ? config.interval : 0);
    return [min_x, min_y, width, height].join(' ');
}

export function clickXAxis(state: State, input: Input): State {
    const oldVal = state.goWrapper[input.index].xAxis;
    const newVal = input.value;
    if(oldVal === newVal) return state;
    const newWrapper = {
        ...state.goWrapper[input.index],
        xAixs: newVal,
        viewBox: createViewBox(
            state.goWrapper[input.index].rows,
            state.goWrapper[input.index].cols,
            newVal !== 'none',
            state.goWrapper[input.index].yAxis !== 'none',
        ),
    }
    const goWrapper = [...state.goWrapper];
    goWrapper[input.index] = newWrapper;
    return {
        ...state,
        goWrapper,
    }
}

export function clickYAxis(state: State, input: Input): State {
    const oldVal = state.goWrapper[input.index].yAxis;
    const newVal = input.value;
    if(oldVal === newVal) return state;
    const newWrapper = {
        ...state.goWrapper[input.index],
        yAixs: newVal,
        viewBox: createViewBox(
            state.goWrapper[input.index].rows,
            state.goWrapper[input.index].cols,
            state.goWrapper[input.index].xAxis !== 'none',
            newVal !== 'none',
        ),
    }
    const goWrapper = [...state.goWrapper];
    goWrapper[input.index] = newWrapper;
    return {
        ...state,
        goWrapper,
    }
}

export function changeRows(state: State, input: Input): State {
    const oldVal = state.goWrapper[input.index].rows;
    const newVal = Number(input.value);
    if(oldVal === newVal) return state;
    if(!Number.isInteger(newVal)) return state;
    if(newVal < 1 || 19 < newVal) return state;
    const newWrapper = {
        ...state.goWrapper[input.index],
        rows: newVal,
        viewBox: createViewBox(
            newVal,
            state.goWrapper[input.index].cols,
            state.goWrapper[input.index].xAxis !== 'none',
            state.goWrapper[input.index].yAxis !== 'none',
        ),
    }
    const goWrapper = [...state.goWrapper];
    goWrapper[input.index] = newWrapper;
    return {
        ...state,
        goWrapper,
    }
}

export function changeCols(state: State, input: Input): State {
    const oldVal = state.goWrapper[input.index].cols;
    const newVal = Number(input.value);
    if(oldVal === newVal) return state;
    if(!Number.isInteger(newVal)) return state;
    if(newVal < 1 || 19 < newVal) return state;
    const newWrapper = {
        ...state.goWrapper[input.index],
        cols: newVal,
        viewBox: createViewBox(
            state.goWrapper[input.index].rows,
            newVal,
            state.goWrapper[input.index].xAxis !== 'none',
            state.goWrapper[input.index].yAxis !== 'none',
        ),
    }
    const goWrapper = [...state.goWrapper];
    goWrapper[input.index] = newWrapper;
    return {
        ...state,
        goWrapper,
    }
}
