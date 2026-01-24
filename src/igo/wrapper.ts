import { Header } from "./render/header";
import { Body } from "./render/body";
import { Footer } from "./render/footer";
import { Update } from "./update";

declare global {
    interface HTMLElementEventMap {
        "change-state": CustomEvent;
        "click-board": CustomEvent;
        "blur-textarea": CustomEvent;
    }
}

export interface State {
    color: string;
    character: string;
    width: number;
    height: number;
    vertical: string;
    horizontal: string;
    size: string;
    data: [string, string][][];
    textarea: string;
}

export class Wrapper {
    dom: HTMLElement = document.createElement('div');
    
    #state: State = {
        color: '0',
        character: '',
        width: 19,
        height: 19,
        vertical: 'null',
        horizontal: 'null',
        size: 'small',
        data: Array.from({length: 19}, () =>
            Array.from({length: 19}, ()=>(['0', '']))),
        textarea: '',
    }
    
    #header: Header;
    #body: Body;
    #footer: Footer;

    constructor() {
        this.#header = new Header(this.#state);
        this.#body = new Body(this.#state);
        this.#footer = new Footer(this.#state);

        this.dom.appendChild(this.#header.dom);
        this.dom.appendChild(this.#body.dom);
        this.dom.appendChild(this.#footer.dom);

        this.dom.addEventListener('change-state', (ev: CustomEvent) => {
            const detail = ev.detail as {type: string, value: string};
            switch(detail.type) {
                case 'color':
                    this.#state = Update.color(this.#state, detail.value);
                    break;
                case 'character':
                    this.#state = Update.character(this.#state, detail.value);
                    break;
                case 'width':
                    this.#state = Update.width(this.#state, detail.value);
                    this.#render();
                    break;
                case 'height':
                    this.#state = Update.height(this.#state, detail.value);
                    this.#render();
                    break;
                case 'vertical':
                    this.#state = Update.vertical(this.#state, detail.value);
                    this.#render();
                    break;
                case 'horizontal':
                    this.#state = Update.horizontal(this.#state, detail.value);
                    this.#render();
                    break;
            }
        }, false);
        
        this.dom.addEventListener('click-board', (ev: CustomEvent) => {
            this.#state = Update.data(this.#state, ev.detail);
            this.#render();
        }, false);
        
        this.dom.addEventListener('blur-textarea', (ev: CustomEvent) => {
            const detail = ev.detail as string;
            this.#state = Update.textarea(this.#state, detail);
            //this.#render();
        }, false);
    }
    
    changeSize(size: string):void {
        if(['none','small','large'].includes(size)) {
            this.#state.size = size;
            this.#render();
        }
    }

    bulkUpdate(input:[unknown, unknown]):void {
        const [rowData, rowTextarea] = input;
        // parse して、validate して、state に反映
        this.#render();
    }

    get data(): [[string, string][][], string] {
        return [this.#state.data, this.#state.textarea];
    }
    
    #render() {
        this.#header.render(this.#state);
        this.#body.render(this.#state);
        this.#footer.render(this.#state);
    }
}
