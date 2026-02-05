import { State, GoWrapperState } from "../state";
import { createViewBox } from "./change-view-box";

export function load(state: State, input: string): State {
    // input は、外部ファイルを string にしただけのもの validation が必要
    let data: unknown = null;
    try {
        data = JSON.parse(input);
    } catch (err) {
        console.error("JSONのパースに失敗:", err);
    }

    if(isState(data)) {
        const goWrapper: GoWrapperState[] = data.goWrapper.map((gW, i) => ({
            list: (i < data.perPage) ? 'list' : 'none',
            color: 0,
            character: '',
            rows: gW.rows,
            cols: gW.cols,
            xAxis: gW.xAxis,
            yAxis: gW.yAxis,
            viewBox: createViewBox(
                gW.rows,
                gW.cols,
                gW.xAxis!=='none',
                gW.yAxis!=='none',
            ),
            data: gW.data,
            textarea: gW.textarea,
        }));
        return {
            perPage: data.perPage,
            listZoom: -1,
            goWrapper,
        }
    }
    console.error('data は変更されませんでした。');
    return state;
}

function isState(obj: unknown): obj is State {
    // 1. まず null ではなく、かつ object であることを確認
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    // 2. プロパティにアクセスするために、一時的に record 型として扱う
    const candidate = obj as Record<string, any>;

    if(candidate.perPage !== 4 && candidate.perPage !== 6) return false;
    if(!Array.isArray(candidate.goWrapper)) return false;
    if(candidate.goWrapper.length !== 6) return false;
    return candidate.goWrapper.every(gW => isGoWrapperState(gW));

}

function isGoWrapperState(obj:unknown): obj is GoWrapperState {
    // 1. まず null ではなく、かつ object であることを確認
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    // 2. プロパティにアクセスするために、一時的に record 型として扱う
    const candidate = obj as Record<string, any>;

    if(typeof candidate.rows !== 'number') return false;
    if(candidate.rows < 0 || 19 < candidate.rows) return false;

    if(typeof candidate.cols !== 'number') return false;
    if(candidate.cols < 0 || 19 < candidate.cols) return false;

    if(candidate.xAxis!=='none'
        && candidate.xAxis!=='num'
        && candidate.xAxis!=='aiu'
        && candidate.xAxis!=='iroha'
    ) return false;

    if(candidate.yAxis!=='none'
        && candidate.yAxis!=='num'
        && candidate.yAxis!=='aiu'
        && candidate.yAxis!=='iroha'
    ) return false;

    if(typeof candidate.textarea !== 'string') return false;

    if(!Array.isArray(candidate.data)) return false;

    return candidate.data.every((row: unknown) => 
        Array.isArray(row) && row.every((tuple: unknown)=>
            Array.isArray(tuple) &&
            tuple.length === 2 &&
            (tuple[0]===0||tuple[0]===1||tuple[0]===2) &&
            typeof tuple[1] === 'string' &&
            tuple[1].length < 2
        )
    );
}
