import { State } from "../state";
type Input = {
    index: number;
    value: string;
}

export function clickCharacter(state: State, input: Input): State {
    const oldVal = state.goWrapper[input.index].character;
    let newVal = input.value;
    if(oldVal === newVal) return state;
    if(newVal.length > 1) {
        newVal = newVal[0];
    }

    const newWrapper = {
        ...state.goWrapper[input.index],
        character: newVal,
    }
    const goWrapper = [...state.goWrapper];
    goWrapper[input.index] = newWrapper;
    return {
        ...state,
        goWrapper,
    }
}
