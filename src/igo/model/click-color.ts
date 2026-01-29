import { State } from "../state";
type Input = {
    index: number;
    value: string;
}

export function clickColor(state: State, input: Input): State {
    const oldVal = state.goWrapper[input.index].color;
    const newVal = Number(input.value);
    if(newVal!==0 && newVal!==1 && newVal!==2) return state;
    if(oldVal === newVal) return state;

    const newWrapper = {
        ...state.goWrapper[input.index],
        color: newVal as 0|1|2,
    }
    const goWrapper = [...state.goWrapper];
    goWrapper[input.index] = newWrapper;
    return {
        ...state,
        goWrapper,
    }
}
