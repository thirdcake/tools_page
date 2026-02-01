import { State } from "../state";
import { clickListZoom } from "./click-list-zoom"; 
type Input = {
    index: number;
    row: number;
    col: number;
}

export function clickStone(state: State, input: Input): State {
    if(state.goWrapper[input.index].list === 'none') return state;
    if(state.goWrapper[input.index].list === 'list') {
        return clickListZoom(state, `${input.index}`);
    }
    const [oldColor, oldChar]
        = state.goWrapper[input.index].data[input.row][input.col];
    const newColor = state.goWrapper[input.index].color;
    const newChar = state.goWrapper[input.index].character;
    if(oldColor === 0 && newColor===0 && oldChar==='' && newChar==='') return state;

    const newTuple:[0|1|2, string] = (
        oldColor === newColor && oldChar === newChar
        ) ? [0, ''] : [newColor, newChar];
    const newRow = [...state.goWrapper[input.index].data[input.row]];
    newRow[input.col] = newTuple;
    const newData = [...state.goWrapper[input.index].data];
    newData[input.row] = newRow;
    const newWrapper = {
        ...state.goWrapper[input.index],
        data: newData,
    }
    const goWrapper = [...state.goWrapper];
    goWrapper[input.index] = newWrapper;
    return {
        ...state,
        goWrapper,
    }
}
