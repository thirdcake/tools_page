import { GoWrapperState, State } from "../state";

export function clickPerPage(state: State, input: string):State {
    const perPage: 4|6 = input === '4' ? 4 : 6;
    if(state.perPage === perPage) return state;
    const listZoom: number = (state.listZoom < perPage)
        ? state.listZoom : -1;

    const listMap = (gW: GoWrapperState, i: number): GoWrapperState => {
        if(i < perPage) {
            if(gW.list === 'list') return gW;
            return {
                ...gW,
                list: 'list',
            }
        }else{
            if(gW.list === 'none') return gW;
            return {
                ...gW,
                list: 'none',
            }
        }
    }

    const detailMap = (gW: GoWrapperState, i: number): GoWrapperState => {
        if(i===listZoom) {
            if(gW.list === 'detail') return gW;
            return {
                ...gW,
                list: 'detail',
            }
        }else{
            if(gW.list === 'none') return gW;
            return {
                ...gW,
                list: 'none',
            }
        }
    }

    const goWrapper: GoWrapperState[] = (listZoom === -1)
        ? state.goWrapper.map(listMap)
        : state.goWrapper.map(detailMap);

    return {
        ...state,
        perPage,
        listZoom,
        goWrapper,
    }
} 
