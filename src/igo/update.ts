import { State } from "./wrapper";

export class Update {
    static color(state: State, color: unknown):State {
        if(typeof color !== 'string') return state;
        if(state.color === color) return state;
        if(!(['0', '1', '2'].includes(color))) return state;
        return {
            ...state,
            color,
        }
    }
    
    static character(state: State, value: unknown): State {
        if(typeof value !== 'string') return state;
        if(state.character === value) return state;
        const character = (value.length > 0) ? value[0] : '';
        return {
            ...state,
            character,
        }
    }
    
    static width(state: State, range: unknown): State {
        if(typeof range !== 'number') return state;
        const width = (1 <= range && range <= 19) ? range : 19;
        return {
            ...state,
            width,
        }
    }

    static height(state: State, range: unknown): State {
        if(typeof range !== 'number') return state;
        const height = (1 <= range && range <= 19) ? range : 19;
        return {
            ...state,
            height,
        }
    }

    static vertical(state: State, coord: unknown): State {
        if(typeof coord !== 'string') return state;
        const coordArr = ['nums', 'aiu', 'iroha'];
        const vertical = (coordArr.includes(coord)) ? coord : 'null';
        return {
            ...state,
            vertical,
        }
    }
    
    static horizontal(state: State, coord: unknown): State {
        if(typeof coord !== 'string') return state;
        const coordArr = ['nums', 'aiu', 'iroha'];
        const horizontal = (coordArr.includes(coord)) ? coord : 'null';
        return {
            ...state,
            horizontal,
        }
    }

    static data(state: State, input: unknown): State {
        if(!Array.isArray(input) || input.length !== 2) return state;
        const [x, y] = input;
        if(typeof x !== 'number' || typeof y !== 'number') return state;
        if(!Number.isInteger(x) || !Number.isInteger(y)) return state;
        if(x < 1 || 19 < x || y < 1 || 19 < y) return state;

        const [col, row] = [x - 1, y - 1];
        const oldCell = state.data[row][col];
        let newCell:[string, string] = [state.color, state.character];
        if(state.color === oldCell[0] && state.character === oldCell[1]) {
            newCell = ['0', ''];
        }

        const newRow = [...state.data[row]];
        newRow[col] = newCell;
        
        const newData = [...state.data];
        newData[row] = newRow;

        return {
            ...state,
            data: newData,
        }
    }
    
    static textarea(state: State, text: string):State {
        if(state.textarea === text) return state;
        return {
            ...state,
            textarea: text,
        }
    }
}
