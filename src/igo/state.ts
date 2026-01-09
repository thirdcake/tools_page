export class State {
    #color: 0|1|2;
    #character: string;

    constructor() {
        this.#color = 0;
        this.#character = '';
    }
    
    get color():0|1|2 {
        return this.#color;
    }

    set color(n:string) {
        switch(n) {
            case '1':
                this.#color = 1;
                break;
            case '2':
                this.#color = 2;
                break;
            default:
                this.#color = 0;
        }
    }

    get character() {
        return this.#character;
    }

    set character(c:string) {
        if(c.length > 1) {
            this.#character = c[0];
        }else{
            this.#character = c;
        }
    }
}