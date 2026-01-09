import { BoardSVG } from "./board-svg";

customElements.define('board-svg', BoardSVG);

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
            break;
        case 'char':
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
