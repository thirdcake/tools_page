import { State } from "../state";
type Input = {
    index: number;
    row: number;
    col: number;
}

export function clickStone(state: State, input: Input): State {
    const [oldColor, oldChar]
        = state.goWrapper[input.index].data[input.row][input.col];
    const newColor = state.goWrapper[input.index].color;
    const newChar = state.goWrapper[input.index].character;
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
