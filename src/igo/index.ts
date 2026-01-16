import { BoardController } from "./board-controller";

// <board-svg>要素を定義
customElements.define('board-controller', BoardController);

// 実行
document.addEventListener('DOMContentLoaded', ()=>{
    const perPageButtons: HTMLButtonElement[] = [];
    document.querySelectorAll('#display-per-page button').forEach(
        button => {
            if(button instanceof HTMLButtonElement) {
                perPageButtons.push(button);
            }
        }
    );
    
    const toggleButtons: HTMLButtonElement[] = [];
    document.querySelectorAll('#toggle-display button').forEach(
        button => {
            if(button instanceof HTMLButtonElement) {
                toggleButtons.push(button);
            }
        }
    );
    
    const save = document.querySelector('#save');
    const load = document.querySelector('#load');
    
    const boardControllers: BoardController[] = [];
    document.querySelectorAll('board-controller').forEach(
        boardCon => {
            if(boardCon instanceof BoardController) {
                boardControllers.push(boardCon);
            }
        }
    );
    
    displayPerPage(
        perPageButtons,
        toggleButtons,
        boardControllers
    );
    
    toggleDisplayBoard(
        toggleButtons,
        boardControllers
    );
    
}, false);

function toggleActiveClass(
    button: HTMLButtonElement,
    buttons: HTMLButtonElement[]
):void {
    buttons.forEach(btn => {
        if(button === btn) {
            btn.classList.add('active');
        }else{
            btn.classList.remove('active');
        }
    });
}

function displayPerPage(
    perPageButtons:HTMLButtonElement[],
    toggleButtons:HTMLButtonElement[],
    boardControllers: BoardController[]
):void {
    perPageButtons.forEach(button => {
        button.addEventListener('click', ()=>{
            toggleActiveClass(button, perPageButtons);
            const length = Number(button.dataset.godisplayPerPage);
            toggleButtons.forEach((tButton, idx) => {
                if(idx <= length) {
                    tButton.style.display = 'block';
                }else{
                    tButton.style.display = 'none';
                }
            });
            boardControllers.forEach((bCon, idx) => {
                if(idx <= length) {
                    bCon.dataset.display = 'true';
                }else{
                    bCon.dataset.display = 'false';
                }
            });
        }, false);
    });
}

function toggleDisplayBoard(
    toggleButtons:HTMLButtonElement[],
    boardControllers: BoardController[]
):void {
    toggleButtons.forEach(button => {
        button.addEventListener('click', ()=>{
            toggleActiveClass(button, toggleButtons);
            const num = Number(button.dataset.godisplayIdx);
            if(num < 0) {
                displayOverview(boardControllers);
            }else{
                displayZoomboard(num, boardControllers);
            }
        }, false);
    });
}

function displayOverview(boardControllers: BoardController[]): void {
    const num = 6; // 4
    boardControllers.forEach((bCon, idx) => {
        if(idx < num) {
            bCon.dataset.display = 'true';
            bCon.dataset.size = 'small';
        }else{
            bCon.dataset.display = 'false';
        }
    });
}
function displayZoomboard(
    num: number,
    boardControllers: BoardController[]
):void {
    boardControllers.forEach((bCon, idx) => {
        if(num === idx) {
            bCon.dataset.display = 'true';
            bCon.dataset.size = 'large';
        }else{
            bCon.dataset.display = 'false';
        }
    });
}

function save():void {
}

function load():void {
}
