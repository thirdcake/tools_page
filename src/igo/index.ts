import { BoardSVG } from "./board-svg";

customElements.define('board-svg', BoardSVG);

document.addEventListener('DOMContentLoaded', main, false);

function main() {
    onChangeRange();
}

function onChangeRange() {
    const range_u = document.querySelector('input[name="go-state-range-u"]');
    const range_r = document.querySelector('input[name="go-state-range-r"]');
    if(!range_u || !range_r) return;

    range_u.addEventListener('change', (ev:Event)=>{
        const target = ev.target;
        if(target instanceof HTMLInputElement) {
            const value = target.value;
            document.querySelectorAll('board-svg').forEach(svg => {
                svg.setAttribute('y_up', value);
            });
        }
    }, false);
    range_r.addEventListener('change', (ev:Event)=>{
        const target = ev.target;
        if(target instanceof HTMLInputElement) {
            const value = target.value;
            document.querySelectorAll('board-svg').forEach(svg => {
                svg.setAttribute('x_right', value);
            });
        }
    }, false);

}

document.addEventListener('click', (ev: PointerEvent) => {
    const target = ev.target;
    if(!(target instanceof HTMLElement)) return;
    const ul = target.closest('ul[data-gostate-type="ul"]');
    if(ul === null) return;
    const type = target.dataset.gostateType;
    const value = target.dataset.gostateValue;
    const btns = ul.querySelectorAll(`button[data-gostate-type="${type}"]`);
    btns.forEach(button => {
        if(button === target) {
            button.classList.add('active');
        }else{
            button.classList.remove('active');
        }
    });
    switch(type) {
        case 'color':
            document.querySelectorAll('board-svg').forEach(svg => {
                svg.setAttribute('color', `${value}`);
            });
            break;
        case 'char':
            document.querySelectorAll('board-svg').forEach(svg => {
                svg.setAttribute('char', `${value}`);
            });
            break;
        case 'vertical':
            document.querySelectorAll('board-svg').forEach(svg => {
                svg.setAttribute('vertical', `${value}`);
            });
            break;
        case 'holizontal':
            document.querySelectorAll('board-svg').forEach(svg => {
                svg.setAttribute('holizontal', `${value}`);
            });
            break;
    }
}, false);
