import { State, GoWrapperState } from "../state";
type Input = {
    index: number;
    text: string;
}

export function changeTextarea(state: State, input: Input):State {
    const newWrapper: GoWrapperState = {
        ...state.goWrapper[input.index],
        textarea: input.text,
    }
    const goWrapper = [...state.goWrapper];
    goWrapper[input.index] = newWrapper;
    return {
        ...state,
        goWrapper,
    }
}
