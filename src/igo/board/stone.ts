import { config, stonePattern } from "./config";

type ColorPattern = 'empty'|'onlyChar'|'black'|'white';
export type Stone = {
    color: string;
    character: string;
}

export type StoneFunc = (state: Stone) => void;
export type StoneTupple = [SVGGElement, StoneFunc];

export function createStone(
    row:number,
    col:number,
    color:string,
    character:string,
): StoneTupple {
    const stone = document.createElementNS(config.ns, 'g') as SVGGElement;
    const circle = createCircle(row, col);
    const text = createText(row, col);
    stone.appendChild(circle);
    stone.appendChild(text);

    const func = (newState: Stone):void => {
        const {color, character} = newState;
        let colorPattern: ColorPattern = 'empty';
        if(color==='0' && character==='') {
            colorPattern = 'empty';
        }else if(color==='') {
            colorPattern = 'onlyChar';
        }else if(color === '1') {
            colorPattern = 'black';
        }else if(color === '2') {
            colorPattern = 'white';
        }
        
        const {
            circle_fill,
            circle_stroke,
            text_fill
        } = stonePattern[colorPattern];

        circle.setAttribute('fill', circle_fill);
        circle.setAttribute('stroke', circle_stroke);
        text.setAttribute('fill', text_fill);
        text.textContent = character;
    }
    func({color, character});
    return [stone, func];
}

/**
 * circle SVG を作成。 - 色が変えられる
 * @param row 縦の中心
 * @param col 横の中心
 * @returns 
 */
function createCircle(row: number, col: number): SVGCircleElement {
    const circle = document.createElementNS(config.ns, 'circle') as SVGCircleElement;
    circle.setAttribute('cx', `${col}`);
    circle.setAttribute('cy', `${row}`);
    circle.setAttribute('r', `${config.radius}`);
    circle.setAttribute('fill', 'transparent');
    circle.setAttribute('stroke', 'transparent');
    circle.setAttribute('stroke-width', `${config.thick}`);
    return circle;
}

/**
 * text SVG を作成。 - 色と文字が変えられる
 * @param row 縦の中心
 * @param col 横の中心
 * @returns 
 */
function createText(row:number, col:number): SVGTextElement {
    const text = document.createElementNS(config.ns, 'text') as SVGTextElement;
    const text_size = config.text_size;
    const font_style = `font:normal ${text_size}px sans-serif`;
    text.setAttribute('style', font_style);
    text.setAttribute('x', `${col}`);
    const base_line = config.radius * 0.6;
    const y = base_line + row;
    text.setAttribute('y', `${y}`);
    text.setAttribute('fill', 'transparent');
    text.setAttribute('text-anchor', 'middle');
    text.textContent = '';
    return text;
}