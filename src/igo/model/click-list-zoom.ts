import { State } from "../state";

export function clickListZoom(state: State, input: string): State {
    const num = Number(input);

    let idealList: ('detail'|'list'|'none')[];
    if(0 <= num && num < 6) {  // 1 から 6 いずれかの zoom 表示
        idealList = Array.from({length: 6},
            (_,i) => (num === i) ? 'detail' : 'none');
    } else {  // list 表示
        if(num !== -1) {console.error('listZoom.num => ', num);}
        idealList = Array.from({length: 6},
            (_,i) => (i < state.perPage) ? 'list' : 'none');
    }
    const goWrapper = state.goWrapper.map((gW, i) => {
        if(gW.list === idealList[i]) return gW;
        return {
            ...gW,
            list: idealList[i],
        }
    });

    if(state.goWrapper.every((gW,i)=>(gW===goWrapper[i]))) return state;
    return {
        ...state,
        goWrapper,
    }
}
