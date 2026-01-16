export interface BasicDataInterface {
    value: string,
    text: string,
}

export class ButtonState <T extends BasicDataInterface = BasicDataInterface> {
    protected _title: string = '';
    protected _active: number = 0;
    protected _data: T[] = [];

    get title():string { return this._title }
    get active():number { return this._active }
    get value():string {
        if(this._active < this._data.length) {
            return this._data[this._active].value;
        } else {
            return this._data[0].value;
        }
    }
    set value(value:string) {
        const idx = this._data.findIndex(dat => dat.value === value);
        this._active = idx === -1 ? 0 : idx;
    }
    get data(): T[] {
        return this._data;
    }
}
