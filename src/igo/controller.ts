export class Controller {
    
    dom: HTMLDivElement;
    
    constructor() {
        this.dom = this.#createDom();
    }
    
    #createDom():HTMLDivElement {
        const dom = document.createElement('span');
        return dom;
    }
    
    onClick(ev: PointerEvent) {}
    
    onChange(ev: Event) {}
}
