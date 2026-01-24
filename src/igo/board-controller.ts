import { Wrapper } from "./wrapper";

export class BoardController extends HTMLElement {
    #wrapper: Wrapper;

    static observedAttributes = [
        // "data-gostate-data",
        "data-display",
    ];

    constructor() {
        super();
        this.#wrapper = new Wrapper();
        this.appendChild(this.#wrapper.dom);
    }

    // document に接続時実行
    connectedCallback() {
    }

    // 属性変更時実行
    attributeChangedCallback(attr:string, oldVal:string, newVal:string) {
        switch(attr) {
            //case 'data-gostate-data':
            //    break;
            case 'data-display':
                this.#wrapper.changeSize(newVal);
                break;
        }
    }
     
}
