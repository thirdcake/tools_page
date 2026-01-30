import { GoWrapperState } from "../../state";

export class Textarea {
    dom = document.createElement('div');
    idx: number;
    state = {
        list: 'list',
        text: '',
    }

    textarea = document.createElement('textarea');
    para = document.createElement('p');

    constructor(idx: number) {
        this.idx = idx;

        this.textarea.style.display = 'none';
        this.textarea.placeholder = 'ここに文字が入力できます。';
        this.dom.appendChild(this.textarea);
        this.para.style.whiteSpace = 'pre-wrap';
        this.dom.appendChild(this.para);
        
        this.textarea.addEventListener('change', ()=>{
            const event = new CustomEvent('go-event', {
                bubbles: true,
                detail: {
                    type: 'change-textarea',
                    input: {
                        index: idx,
                        text: this.textarea.value,
                    }
                },
            });
            this.dom.dispatchEvent(event);
        }, false);
    }

    render(state: GoWrapperState):void {
        if(this.state.list !== state.list) {
            this.state.list = state.list;
            switch (state.list) {
                case 'detail':
                    this.textarea.style.display = 'block';
                    this.para.style.display = 'none';
                    break;
                case 'list':
                    this.textarea.style.display = 'none';
                    this.para.style.display = 'block';
                    break;
            }
        }
        if(this.state.text !== state.textarea) {
            this.state.text = state.textarea;
            this.para.textContent = this.state.text;
        }
    }
}
