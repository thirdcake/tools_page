type CoordinatesType = 'null'|'nums'|'aiu'|'iroha';
type StateType = null|'color'|'character'|'range'|'coordinates';

export class State {
    #color: 0|1|2;
    #character: string;
    #rangeLR: number[];
    #rangeTB: number[];
    #holizontal: CoordinatesType;
    #vertical: CoordinatesType;
    #is_change: boolean;
    #type: StateType;

    constructor() {
        this.#color = 0;
        this.#character = '';
        this.#rangeLR = [0, 18];  // 0-index;
        this.#rangeTB = [0, 18];
        this.#vertical = 'null';
        this.#holizontal = 'null';
        this.#is_change = true;
        this.#type = null;
    }
    
    onClick(ev: PointerEvent) {
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
            case 'char':
                this.#type = 'character';
                const old_char = this.character;
                this.character = value;
                this.#is_change = (old_char !== this.character);
                break;
            case 'holizontal':
                this.#type = 'coordinates';
                const old_holizontal = this.holizontal;
                this.holizontal = value;
                this.#is_change = (old_holizontal !== this.holizontal);
                break;
            case 'vertical':
                this.#type = 'coordinates';
                const old_vertical = this.vertical;
                this.vertical = value;
                this.#is_change = (old_vertical !== this.vertical);
                break;
        }
    }
    
    onChange(ev: Event) {
        const target = ev.target;
        if(!(target instanceof HTMLInputElement)) return;
        const value = target.value;
        this.#type = 'range';
        switch(target.dataset.gostateRange) {
            case 'left':
                const old_left = this.left;
                this.left = value;
                this.#is_change = (old_left !== this.left);
                break;
            case 'right':
                const old_right = this.right;
                this.right = value;
                this.#is_change = (old_right !== this.right);
                break;
            case 'top':
                const old_top = this.top;
                this.top = value;
                this.#is_change = (old_top !== this.top);
                break;
            case 'bottom':
                const old_bottom = this.bottom;
                this.bottom = value;
                this.#is_change = (old_bottom !== this.bottom);
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
    
    get left():number {
        return this.#rangeLR[0];
    }
    
    set left(s:string) {
        const num = Number(s);
        if(!Number.isInteger(num)) return;
        if(num >= this.#rangeLR[1]) return;
        this.#rangeLR[0] = num;
    }
    
    get right():number {
        return this.#rangeLR[1];
    }
    
    set right(s:string) {
        const num = Number(s);
        if(!Number.isInteger(num)) return;
        if(num <= this.#rangeLR[0]) return;
        this.#rangeLR[1] = num;
    }
    
    get top():number {
        return this.#rangeTB[0];
    }
    
    set top(s:string) {
        const num = Number(s);
        if(!Number.isInteger(num)) return;
        if(num <= this.#rangeTB[1]) return;
        this.#rangeTB[0] = num;
    }
    
    get bottom():number {
        return this.#rangeTB[1];
    }
    
    set bottom(s:string) {
        const num = Number(s);
        if(!Number.isInteger(num)) return;
        if(num <= this.#rangeTB[0]) return;
        this.#rangeTB[1] = num;
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
