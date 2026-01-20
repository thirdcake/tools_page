import { BoardController as BCon } from "./board-controller";
import { displayShowHide } from "./displayShowHide";
import { save, load } from "./saveLoad";

// <board-svg>要素を定義
customElements.define('board-controller', BCon);

// 実行
document.addEventListener('DOMContentLoaded', ()=>{
    displayShowHide();
    document.querySelector('button#save')?.addEventListener('click', save, false);
    document.querySelector('input#load')?.addEventListener('change', load, false);
}, false);

