import { State } from "../state"

export function save(state: State): void {
    if(!window.confirm('ファイルに保存してよろしいですか？')) return;

    const now = new Date();
    const pad = (num: number):string => String(num).padStart(2, '0');
    const title = '囲碁データ_'
        + `${pad(now.getFullYear())}年${pad(now.getMonth()+1)}月${pad(now.getDate())}日`
        + `_${pad(now.getHours())}時${pad(now.getMinutes())}分${pad(now.getSeconds())}秒`
        + '.json';

    const json = JSON.stringify(state);
    const blob = new Blob([json], {type: 'application/json'});  // Blob 作成
    const url = URL.createObjectURL(blob);  // ダウンロード用の URL
    const anc = document.createElement('a');
    anc.href = url;
    anc.download = title;
    anc.click();
    URL.revokeObjectURL(url);
}
