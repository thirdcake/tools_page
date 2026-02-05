import { State } from "../../state";

export class SaveLoad {
    dom = document.createElement('div');
    div = document.createElement('div');
    hr = document.createElement('hr');

    save = document.createElement('button');
    loadText = document.createElement('span');
    loadInput = document.createElement('input');

    state: number;

    constructor(state: State) {
        this.div.classList.add('go-save-load');

        this.dom.appendChild(this.div);
        this.dom.appendChild(this.hr);

        this.state = state.listZoom;
        this.save.id = 'save';
        this.save.type = 'button';
        this.save.textContent = '保存する';
        this.div.appendChild(this.save);

        this.save.addEventListener('click', () => {
            const event = new CustomEvent('go-save', { bubbles: true });
            this.div.dispatchEvent(event);
        }, false);

        this.loadText.textContent = '読み込み：';
        this.div.appendChild(this.loadText);

        this.loadInput.id = 'load';
        this.loadInput.type = 'file';
        this.loadInput.accept = 'application/json';
        this.div.appendChild(this.loadInput);

        this.loadInput.addEventListener('change', async (ev: Event) => {
            const target = ev.target as HTMLInputElement;
            const files = target.files;
            if(!files) return;

            const file = files[0];
            let jsonString: string;
            try {
                jsonString = await file.text();  // ファイル内容（文字列）
            } catch (err) {
                jsonString = 'file 取得に失敗'
                console.error(jsonString, err);
            }
            const event = new CustomEvent('go-load', {
                bubbles: true,
                detail: {
                    input: jsonString,
                }
            });
            this.div.dispatchEvent(event);
        }, false);
    }

    render(state: State):void {
        if(this.state === state.listZoom) return;
        this.state = state.listZoom;
        if(this.state === -1) {
            this.dom.style.display = 'block';
        }else{
            this.dom.style.display = 'none';
        }
    }
}
