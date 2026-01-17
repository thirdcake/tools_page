import {
    Color,
    Character,
    Coordinates,
    Length,
    } from "./holders";

export class State {
    
    readonly fields = {
        color: new Color(),
        character: new Character(),
        vertical: new Coordinates(),
        horizontal: new Coordinates(),
        width: new Length(),
        height: new Length(),
    } as const;

    // 状態変更の記録用
    #type: keyof typeof this.fields | null = null;
    #oldVal: string | null = null;
    #newVal: string | null = null;

    get type() { return this.#type; }
    get oldVal() { return this.#oldVal; }
    get newVal() { return this.#newVal; }
    get isChange(): boolean { return this.#newVal !== null; }

    reset(): void {
        this.#type = null;
        this.#oldVal = null;
        this.#newVal = null;
    }

    updateEnd(): void {
        this.reset();
    }

    updateStart(type: string, value: string): void {
        this.reset();

        if (this.#isValidKey(type)) {
            const field = this.fields[type];
            const currentVal = field.state;

            if (currentVal !== value) {
                this.#type = type;
                this.#oldVal = currentVal;
                field.state = value;
                this.#newVal = field.state; // セット後の値を代入
            }
        }
    }

    // 型ガードをメソッドとして分離
    #isValidKey(key: string): key is keyof typeof this.fields {
        return key in this.fields;
    }
}
