import { config } from "./config";
import { Svg } from "./svg";
import { ViewBox } from "./helper";

export class Board extends HTMLElement {
    parentSvg = document.createElementNS(config.ns, 'svg');
    viewBox: ViewBox;
    childSvg: Svg;

    static observedAttributes = [
        "gs-width",
        "gs-height",
        "gs-vertical",
        "gs-horizontal",
        "gs-data",
    ];

    constructor() {
        super();

        this.viewBox = new ViewBox();
        this.parentSvg.setAttribute('viewBox', this.viewBox.viewBox);

        this.childSvg = new Svg();
        this.parentSvg.appendChild(this.childSvg.dom);

        this.appendChild(this.parentSvg);
    }

    // document に接続時実行
    connectedCallback() {
    }

    // 属性変更時実行
    attributeChangedCallback(attr:string, oldVal:string, newVal:string) {
        switch(attr) {
            case 'gs-width':
                this.viewBox.width = newVal;
                this.parentSvg.setAttribute('viewBox', this.viewBox.viewBox);
                this.childSvg.changeViewBox('width', newVal);
                break;
            case 'gs-height':
                this.viewBox.height = newVal;
                this.parentSvg.setAttribute('viewBox', this.viewBox.viewBox);
                this.childSvg.changeViewBox('height', newVal);
                break;
            case 'gs-vertical':
                this.viewBox.vertical = newVal;
                this.parentSvg.setAttribute('viewBox', this.viewBox.viewBox);
                this.childSvg.changeViewBox('vertical', newVal);
                break;
            case 'gs-horizontal':
                this.viewBox.horizontal = newVal;
                this.parentSvg.setAttribute('viewBox', this.viewBox.viewBox);
                this.childSvg.changeViewBox('horizontal', newVal);
                break;
            case 'gs-data':
                this.childSvg.changeData(newVal);
                break;
        }
    }
     
}
