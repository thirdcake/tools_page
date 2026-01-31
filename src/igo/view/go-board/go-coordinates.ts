import { config } from "../../consts";
import { GoWrapperState } from "../../state";

export class GoCoordinates {
    dom = document.createElementNS(config.ns, 'g');
    state: {
        x: string,
        y: string,
    }

    x: {
        num: SVGGElement,
        aiu: SVGGElement,
        iroha: SVGGElement,
    }
    y: {
        num: SVGGElement,
        aiu: SVGGElement,
        iroha: SVGGElement,
    }
    char = {
        num: Array.from({length: 19}, (_, i) => `${i+1}` ),
        aiu: 'あいうえおかきくけこさしすせそたちつて'.split(''),
        iroha: 'イロハニホヘトチリヌルヲワカヨタレソツ'.split(''),
    }

    constructor(state: GoWrapperState) {
        this.state = {
            x: state.xAxis,
            y: state.yAxis,
        }
        const createXAxis = (g:SVGGElement, char:string, i:number) => {
            const x = config.interval * i + Math.floor(config.interval/2);
            const y = config.interval * config.size
                + Math.floor(config.interval/2) + config.radius * 0.6;
            const text = document.createElementNS(config.ns, 'text');
            text.setAttribute('style', config.font_style);
            text.setAttribute('x', `${x}`);
            text.setAttribute('y', `${y}`);
            text.setAttribute('text-anchor', 'middle');
            text.textContent = char;
            g.appendChild(text);
            return g;
        }
        this.x = {
            num: this.char.num.reduce(createXAxis, document.createElementNS(config.ns, 'g')),
            aiu: this.char.aiu.reduce(createXAxis, document.createElementNS(config.ns, 'g')),
            iroha: this.char.iroha.reduce(createXAxis, document.createElementNS(config.ns, 'g')),
        }
        const createYAxis = (g:SVGGElement, char:string, i:number) => {
            const x = 0 - Math.floor(config.interval/2);
            const y = config.interval * (config.size - 1 - i)
                + Math.floor(config.interval/2) + config.radius * 0.6;
            const text = document.createElementNS(config.ns, 'text');
            text.setAttribute('style', config.font_style);
            text.setAttribute('x', `${x}`);
            text.setAttribute('y', `${y}`);
            text.setAttribute('text-anchor', 'middle');
            text.textContent = char;
            g.appendChild(text);
            return g;
        }
        this.y = {
            num: this.char.num.reduce(createYAxis, document.createElementNS(config.ns, 'g')),
            aiu: this.char.aiu.reduce(createYAxis, document.createElementNS(config.ns, 'g')),
            iroha: this.char.iroha.reduce(createYAxis, document.createElementNS(config.ns, 'g')),
        }
        this.dom.appendChild(this.x.num);
        this.dom.appendChild(this.x.aiu);
        this.dom.appendChild(this.x.iroha);
        this.dom.appendChild(this.y.num);
        this.dom.appendChild(this.y.aiu);
        this.dom.appendChild(this.y.iroha);
    }

    render(state: GoWrapperState):void {
        const colorPattern = {
            num: {
                num: config.color,
                aiu: 'transparent',
                iroha: 'transparent',
            },
            aiu: {
                num: 'transparent',
                aiu: config.color,
                iroha: 'transparent',
            },
            iroha: {
                num: 'transparent',
                aiu: 'transparent',
                iroha: config.color,
            },
            default: {
                num: 'transparent',
                aiu: 'transparent',
                iroha: 'transparent',
            },
        }
        if(this.state.x !== state.xAxis) {
            this.state.x = state.xAxis;
            let cP;
            switch(state.xAxis) {
                case 'num':
                    cP = colorPattern.num;
                    break;
                case 'aiu':
                    cP = colorPattern.aiu;
                    break;
                case 'iroha':
                    cP = colorPattern.iroha;
                    break;
                default:
                    cP = colorPattern.default;
                    break;
            }
            this.x.num.style.fill = cP.num;
            this.x.aiu.style.fill = cP.aiu;
            this.x.iroha.style.fill = cP.iroha;
        }
        if( this.state.y !== state.yAxis) {
            this.state.y = state.yAxis;
            let cP;
            switch(state.xAxis) {
                case 'num':
                    cP = colorPattern.num;
                    break;
                case 'aiu':
                    cP = colorPattern.aiu;
                    break;
                case 'iroha':
                    cP = colorPattern.iroha;
                    break;
                default:
                    cP = colorPattern.default;
                    break;
            }
            this.y.num.style.display = cP.num;
            this.y.aiu.style.display = cP.aiu;
            this.y.iroha.style.display = cP.iroha;
        }
    }
}
