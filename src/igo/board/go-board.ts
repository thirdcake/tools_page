import { config } from "./config";
import { StoneTupple } from "./stone";
import { Stones } from "./stones";
import { Svg } from "./svg";

type CoordinateType = 'num' | 'aiu' | 'iroha' | 'none';
type DisplayMode = 'none' | 'list' | 'detail';
type GoBoardState = {
    tupples: StoneTupple[][];
    xAxis: CoordinateType;
    yAxis: CoordinateType;
    viewRange: {
        cols: number;
        rows: number;
    }
}
export class GoBoard extends HTMLElement {
    svg: SVGSVGElement = document.createElementNS(config.ns, 'svg');
    displayMode: DisplayMode = 'list';
    
    stones: Stones;
    childSvg: Svg;
    #state: GoBoardState;

    constructor() {
        super();
        this.stones = new Stones();
        this.#state = {
            tupples: this.stones.stones.map(r=>r.map(stn=>stn.tupple)),
            xAxis: 'none',
            yAxis: 'none',
            viewRange: {
                cols: 19,
                rows: 19,
            }
        }
        this.childSvg = new Svg();
        this.childSvg.dom.appendChild(this.stones.dom);
        this.appendChild(this.svg);

        this.childSvg.dom.addEventListener('click', (ev: PointerEvent) => {
            this.toggleStone(ev);
        }, false);
    }
    
    public toggleStone(ev: PointerEvent): void {
        if(this.displayMode !== 'detail' ) return;
        const [col, row] = this.childSvg.nearestIndex(ev.clientX, ev.clientY);
        const old = this.stones.stones[row][col];
        const tupple:StoneTupple = [1, 'A'];
        this.stones.stones[row][col].render(tupple);
    }
    
    public zoomToRange(rows: number, cols: number): void {
    }
    
    public setCoordinateSystem(axis: 'x'|'y', type: CoordinateType): void {
        if(axis === 'x') {
        }else{
        }
    }
    
    public setDisplayMode(mode: DisplayMode):void {
        this.displayMode = mode;
    }
    
    
}
