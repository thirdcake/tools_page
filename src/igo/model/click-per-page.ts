import { State } from "../state";

export function clickPerPage(state: State, input: string):State {
    const perPage = input === '4' ? 4 : 6;
    if(state.perPage === perPage) return state;
    let listZoom = state.listZoom;
    if(state.listZoom.includes('detail')) {
        if(perPage <= state.listZoom.indexOf('detail')) {
            listZoom = Array.from({length: 6}, (_, i)=> i < perPage ? 'list' : 'none');
        }
    }else{
        listZoom = Array.from({length: 6}, (_, i)=> i < perPage ? 'list' : 'none');
    }
    return {
        ...state,
        perPage,
        listZoom,
    };
}
