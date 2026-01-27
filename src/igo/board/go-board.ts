import { config } from "./config";
import { createGrid } from "./create-grid";
import { StoneTupple } from "./stone";
import { Stones } from "./stones";
import { ViewBox } from "./view-box";
import { DisplayMode } from "../board-controller";

type CoordinateType = 'none' | 'num' | 'aiu' | 'iroha';

export class GoBoard {
    dom = document.createElementNS(config.ns, 'svg');
    board = document.createElementNS(config.ns, 'svg');
    coord = document.createElementNS(config.ns, 'g');

    displayMode: DisplayMode = 'list';
    tupple:StoneTupple = [0, ''];
    stones: Stones;
    viewBox: ViewBox;
    tupples: StoneTupple[][];

    constructor() {
        this.stones = new Stones();
        this.tupples = this.stones.stones.map(r=>r.map(stn=>stn.tupple));
        this.viewBox = new ViewBox();
        this.dom.setAttribute('viewBox', this.viewBox.parent);
        this.board.setAttribute('viewBox', this.viewBox.child);
        this.board.setAttribute('x', '0');
        this.board.setAttribute('y', '0');
        this.board.appendChild(createGrid());
        this.board.appendChild(this.stones.dom);
        this.dom.appendChild(this.board);

        this.board.addEventListener('click', (ev: PointerEvent) => {
            this.toggleStone(ev);
        }, false);
    }

    public toggleStone(ev: PointerEvent): void {
        if(this.displayMode !== 'detail' ) return;

        // svg 内部の座標 [x, y] に変換
        const pt = this.board.createSVGPoint();
        pt.x = ev.clientX;
        pt.y = ev.clientY;
        const {x, y} = pt.matrixTransform(this.board.getScreenCTM()?.inverse());
        const nearestIdx = (num:number):number => {
            return config.positions.reduce((nearest, pos, idx)=>{
                const everBest = Math.abs(config.positions[nearest] - num);
                const now = Math.abs(pos - num);
                return (everBest < now ? nearest : idx);
            }, 0);
        }
        const [col, row] = [nearestIdx(x), nearestIdx(y)];

        // stones を更新, 同じなら [0, '']
        const old = this.stones.stones[row][col];
        if(old.tupple[0]===this.tupple[0] && old.tupple[1]===this.tupple[1]) {
            this.stones.stones[row][col].render([0, '']);
        } else {
            this.stones.stones[row][col].render(this.tupple);
        }
    }

    set color(input:unknown) {
        const n = Number(input);
        if(n===0  || n===1 || n===2) {
            this.tupple[0] = n;
        }
    }

    set character(input: unknown) {
        if(typeof input === 'string') {
            this.tupple[1] = (input.length > 0) ? input[0] : '';
        }
    }

    set rangeRows(input: unknown) {
        const num = Number(input ?? 19);
        if(1 <= num && num <= 19) {
            this.viewBox.rows = num;
            this.dom.setAttribute('viewBox', this.viewBox.parent);
            this.board.setAttribute('viewBox', this.viewBox.child);
        }
    }

    set rangeCols(input: unknown) {
        const num = Number(input ?? 19);
        console.log(input);
        if(1 <= num && num <= 19) {
            this.viewBox.cols = num;
            this.dom.setAttribute('viewBox', this.viewBox.parent);
            this.board.setAttribute('viewBox', this.viewBox.child);
        }
    }

    set xAxis(type: unknown) {
        switch(type) {
            case 'none':
            case 'num':
            case 'aiu':
            case 'iroha':
                this.viewBox.xAxis = type;
                this.dom.setAttribute('viewBox', this.viewBox.parent);
                this.board.setAttribute('viewBox', this.viewBox.child);
                break;
        }
    }

    set yAxis(type: unknown) {
        switch(type) {
            case 'none':
            case 'num':
            case 'aiu':
            case 'iroha':
                this.viewBox.yAxis = type;
                this.dom.setAttribute('viewBox', this.viewBox.parent);
                this.board.setAttribute('viewBox', this.viewBox.child);
                break;
        }
    }

    public setDisplayMode(mode: DisplayMode):void {
        this.displayMode = mode;
    }

}
