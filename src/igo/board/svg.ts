import { config } from "./config";
import { createGrid } from "./create-grid";

export class Svg {
    dom: SVGSVGElement;

    constructor() {
        this.dom = document.createElementNS(config.ns, 'svg');
        this.dom.appendChild(createGrid());

    }

    nearestIndex(clientX:number, clientY:number): [number, number] {
        const pt = this.dom.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        const {x, y} = pt.matrixTransform(this.dom.getScreenCTM()?.inverse());
        const nearestIdx = (num:number):number => {
            return config.positions.reduce((nearest, pos, idx)=>{
                const everBest = Math.abs(config.positions[nearest] - num);
                const now = Math.abs(pos - num);
                return (everBest < now ? nearest : idx);
            }, 0);
        }
        return [nearestIdx(x), nearestIdx(y)];
    }

    changeViewBox(type: string, value: string) {}
}
