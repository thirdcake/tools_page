type CoordinatesType = 'null'|'nums'|'aiu'|'iroha';
type StateType = null|'color'|'character'|'range-x'|'range-y'|
    'holizontal'|'vertical';

export class State {
    #color: 0|1|2;
    #character: string;
    #rangeX: number;
    #rangeY: number;
    #holizontal: CoordinatesType;
    #vertical: CoordinatesType;
    #is_change: boolean;
    #type: StateType;

    constructor() {
        this.#color = 0;
        this.#character = '';
        this.#rangeX = 19;  // 1-index;
        this.#rangeY = 19;
        this.#vertical = 'null';
        this.#holizontal = 'null';
        this.#is_change = true;
        this.#type = null;
    }
    
    onClick(ev: PointerEvent):void {
        const target = ev.target;
        if(!(target instanceof HTMLElement)) return;
        const button = target.closest('button');
        if(!(button instanceof HTMLButtonElement)) return;
        const type = button.dataset.gostateType;
        const value = button.dataset.gostateValue;
        if(typeof value === 'undefined') return;
        
        switch(type) {
            case 'color':
                this.#type = 'color';
                const old_color = this.color;
                this.color = value;
                this.#is_change = (old_color !== this.color);
                break;
            case 'character':
                this.#type = 'character';
                const old_char = this.character;
                this.character = value;
                this.#is_change = (old_char !== this.character);
                break;
            case 'holizontal':
                this.#type = 'holizontal';
                const old_holizontal = this.holizontal;
                this.holizontal = value;
                this.#is_change = (old_holizontal !== this.holizontal);
                break;
            case 'vertical':
                this.#type = 'vertical';
                const old_vertical = this.vertical;
                this.vertical = value;
                this.#is_change = (old_vertical !== this.vertical);
                break;
        }
    }
    
    onChange(ev: Event):void {
        const target = ev.target;
        if(!(target instanceof HTMLInputElement)) return;
        const value = target.value;
        if(typeof value !== 'string') return;
        let old_range;
        switch(target.dataset.gostateDir) {
            case 'range-x':
                this.#type = 'range-x';
                old_range = this.rangeX;
                this.rangeX = value;
                this.#is_change = (old_range !== this.rangeX);
                break;
            case 'range-y':
                this.#type = 'range-y';
                old_range = this.rangeY;
                this.rangeY = value;
                this.#is_change = (old_range !== this.rangeY);
                break;
        }
    }
    
    get color():0|1|2 {
        return this.#color;
    }

    set color(n:string) {
        switch(n) {
            case '0':
                this.#color = 0;
                break;
            case '1':
                this.#color = 1;
                break;
            case '2':
                this.#color = 2;
                break;
        }
    }

    get character():string {
        return this.#character;
    }

    set character(c:string) {
        if(c.length > 1) {
            this.#character = c[0];
        }else{
            this.#character = c;
        }
    }
    
    get rangeX():number {
        return this.#rangeX;
    }
    
    set rangeX(s:string) {
        const num = Number(s);
        if(!Number.isInteger(num)) return;
        if(1 <= num && num <=19) {
            this.#rangeX = num;
        }
    }
    
    get rangeY():number {
        return this.#rangeY;
    }
    
    set rangeY(s:string) {
        const num = Number(s);
        if(!Number.isInteger(num)) return;
        if(1 <= num && num <=19) {
            this.#rangeY = num;
        }
    }
        
    get holizontal():CoordinatesType {
        return this.#holizontal;
    }
    
    set holizontal(s: string) {
        switch(s) {
            case 'null':
                this.#holizontal = 'null';
                break;
            case 'nums':
                this.#holizontal = 'nums';
                break;
            case 'aiu':
                this.#holizontal = 'aiu';
                break;
            case 'iroha':
                this.#holizontal = 'iroha';
                break;
        }
    }
    
    get vertical(): CoordinatesType {
        return this.#vertical;
    }
    
    set vertical(s: string) {
        switch(s) {
            case 'null':
                this.#vertical = 'null';
                break;
            case 'nums':
                this.#vertical = 'nums';
                break;
            case 'aiu':
                this.#vertical = 'aiu';
                break;
            case 'iroha':
                this.#vertical = 'iroha';
                break;
        }
    }
    
    get is_change():boolean {
        return this.#is_change;
    }
    
    get type():StateType {
        return this.#type;
    }
}
