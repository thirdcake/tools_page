import { BoardController } from "./board-controller";

type Btn = HTMLButtonElement;

type BConSize = 'none'|'list'|'detail';
interface Zoom {
    inRange: boolean,
    size: BConSize,
}
interface State {
    perPageLimit: 4|6,
    zoomIdx: number,
    zooms: Zoom[],
}
interface Dom {
    perPageBtns: Btn[],
    overviewZoomBtns: Btn[],
    bCons: BoardController[],
}

export function displayShowHide() {

    // 管理が必要な state
    const zoomBase: Zoom = {inRange:true, size:'list'}
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
        [...document.querySelectorAll<BoardController>('board-controller')];

    // click Event
    dom.perPageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleActiveClass(btn, dom.perPageBtns);

            const input:number = Number(btn.dataset.godisplayPerPage ?? 6);
            state.perPageLimit = (input === 4) ? 4 : 6;

            update(dom, state);
        });
    });
    dom.overviewZoomBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            toggleActiveClass(btn, dom.overviewZoomBtns);

            state.zoomIdx = idx;
            update(dom, state);
        });
    });

}

function update(dom: Dom, state: State) {
    const isOverview = state.zoomIdx === 0;
    state.zooms.forEach((zoom, i) => {
        zoom.inRange = (i < state.perPageLimit);
        const isZoom = state.zoomIdx === i + 1;
        if(isOverview) {
            zoom.size = 'list';
        }else if(isZoom) {
            zoom.size = 'detail';
        }else{
            zoom.size = 'none';
        }
    });

    dom.overviewZoomBtns.forEach((btn, i) => {
        if(i > 0) {
            btn.style.display = (state.zooms[i-1].inRange) ? 'block' : 'none';
        }
    });

    dom.bCons.forEach((bcon, i) => {
        bcon.dataset.display = state.zooms[i].size;
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
