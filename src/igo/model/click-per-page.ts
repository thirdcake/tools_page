import { State } from "../state";

export function clickPerPage(state: State, input: string):State {
    const perPage = input === '4' ? 4 : 6;
    if(state.perPage === perPage) return state;
    const oldList = state.goWrapper.map(gW => gW.list);
    let idealList:('detail'|'list'|'none')[] = Array.from(
        {length: 6},
        (_, i) => (i < perPage) ? 'list' : 'none');

    if(oldList.includes('detail')) {
        if(oldList.indexOf('detail') < perPage) {
            idealList = oldList;
        }
    }

    const goWrapper = state.goWrapper.map((gW, i) => {
        if(gW.list === idealList[i]) return gW;
        return {
            ...gW,
            list: idealList[i],
        }
    });
    if(state.goWrapper.every((gW,i)=>(gW===goWrapper[i]))) {
        return {
            ...state,
            perPage,
        }
    }
    return {
        ...state,
        perPage,
        goWrapper,
    }
} 
