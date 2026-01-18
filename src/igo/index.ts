import { BoardController as BCon } from "./board-controller";

// <board-svg>要素を定義
customElements.define('board-controller', BCon);

type Btn = HTMLButtonElement;
type Ipt = HTMLInputElement;

interface Zoom {
    inRange: boolean,
    size: 'none'|'small'|'large',
}
interface State {
    perPageLimit: 4|6,
    zoomIdx: number,
    zooms: Zoom[],
}
interface Dom {
    perPageBtns: Btn[],
    overviewZoomBtns: Btn[],
    bCons: BCon[],
}

// 実行
document.addEventListener('DOMContentLoaded', ()=>{
    displayShowHide();
    saveLoad();
}, false);

/**
 * 表示の4/6切り替え、及びzoomと俯瞰の切り替え
 */
function displayShowHide() {
    // 管理が必要な state
    const zoomBase: Zoom = {inRange:true, size:'small'}
    const state: State = {
        perPageLimit: 6,
        zoomIdx: -1,
        zooms: Array.from({length: 6}, ()=>({...zoomBase})),
    }

    // DOM の取得
    const dom: Dom = {
        perPageBtns: [],
        overviewZoomBtns: [],
        bCons: [],
    };
    dom.perPageBtns =
        [...document.querySelectorAll<Btn>('#display-per-page button')];
    dom.overviewZoomBtns =
        [...document.querySelectorAll<Btn>('#display-overview-zoom button')];
    dom.bCons =
        [...document.querySelectorAll<BCon>('board-controller')];

    // click Event
    dom.perPageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleActiveClass(btn, dom.perPageBtns);

            const input:number = Number(btn.dataset.godisplayPerPage ?? 6);
            state.perPageLimit = (input === 4) ? 4 : 6;

            update(dom, state);
        });
    });
    dom.overviewZoomBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleActiveClass(btn, dom.overviewZoomBtns);

            const input:number = Number(btn.dataset.godisplayIdx ?? -1);
            state.zoomIdx = (-1 < input && input <= state.perPageLimit)
                ? input : -1;

            update(dom, state);
        });
    });

}

function update(dom: Dom, state: State) {
    const isOverview = state.zoomIdx === -1;
    state.zooms.forEach((zoom, i) => {
        zoom.inRange = (i < state.perPageLimit);
        const isZoom = state.zoomIdx === i;
        if(isOverview) {
            zoom.size = 'small';
        }else if(isZoom) {
            zoom.size = 'large';
        }else{
            zoom.size = 'none';
        }
    });
    dom.overviewZoomBtns.forEach((btn, i) => {
        if(i > 0) {
            btn.classList.toggle('hidden', !state.zooms[i-1].inRange);
        }
    });
    dom.bCons.forEach((bcon, i) => {
        const inRange = state.zooms[i].inRange;
        bcon.dataset.display = inRange ? state.zooms[i].size : 'none';
    });
}

/**
 * Helper 関数 - ボタンの中で active をつけたり消したり
 */
function toggleActiveClass (btn: Btn, btns: Btn[]) {
    btns.forEach(b => {
        const shouldActive = (b === btn);
        b.classList.toggle('active', shouldActive)
    });
}

/**
 * ToDo: 保存機能を実装
 */
function saveLoad() {
    const bCons =
        [...document.querySelectorAll<BCon>('board-controller')];

    const saveBtn: Btn = document.querySelector('button#save') as Btn;
    saveBtn.addEventListener('click', () => {
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
    });

    const loadInput: Ipt = document.querySelector('input#load') as Ipt;
    loadInput.addEventListener('change', async (ev:Event)=>{
        const target = ev.target as Ipt;
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
    });
}
