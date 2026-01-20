import { BoardController as BCon } from "./board-controller";

type Ipt = HTMLInputElement;

export function save() {
    const bCons =
        [...document.querySelectorAll<BCon>('board-controller')];

    const bConsData = bCons.map(bcon => ({
        data: bcon.dataset.stonesData,
        textarea: bcon.dataset.textArea,
    }));
    const json = JSON.stringify(bConsData);
    
    const blob = new Blob([json], { type: "application/json" });  // Blob 作成
    const url = URL.createObjectURL(blob);  // ダウンロード用のURLを生成
    // 一時的に a タグを作ってクリックしてダウンロード
    const a = document.createElement("a");
    a.href = url;
    const date = new Date();
    const pad = (n:number) => String(n).padStart(2, '0');
    const Y = date.getFullYear();
    const M = pad(date.getMonth()+1);
    const D = pad(date.getDate());
    const h = pad(date.getHours());
    const m = pad(date.getMinutes());
    const s = pad(date.getSeconds());
    const title = `囲碁データ：${Y}-${M}-${D}T${h}:${m}:${s}.json`;
    a.download = title; // ダウンロードするファイル名
    a.click();
    URL.revokeObjectURL(url);  // メモリ解放

}

export async function load(ev: Event) {
    const target = ev.target as Ipt;
    const bCons =
        [...document.querySelectorAll<BCon>('board-controller')];

    const files = target.files;
    if(!files) return;
    const file = files[0];
    try {
        const jsonText = await file.text();  // ファイル内容（文字列）
        const data = JSON.parse(jsonText);
        // ToDo: 各bConに配る
        if(Array.isArray(data)) {
            data.forEach((dat, i) => {
                bCons[i].dataset.stonesData = dat.data;
                bCons[i].dataset.textArea = dat.textarea;
            });
        }
    } catch (err) {
        console.error("JSONのパースに失敗:", err);
    }
}
