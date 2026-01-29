import { State } from "../state";

export function clickListZoom(state: State, input: string): State {
    const num = Number(input);
    let listZoom = state.listZoom;
    if(num === -1) {
        if(state.listZoom.includes('list')) return state;
        listZoom = Array.from({length: 6}, (_, i) => (state.perPage < i) ? 'list' : 'none');
    }else if(0 <= num && num < 6) {
        if(state.listZoom.indexOf('detail') === num) return state;
        listZoom = Array.from({length: 6}, (_, i) => (num === i) ? 'detail' : 'none');
    }
    return {
        ...state,
        listZoom,
    }
}
