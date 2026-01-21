import { State } from "../state";

export class TextArea {
    dom: HTMLDivElement;

    constructor(state: State) {
        this.dom = document.createElement('div');
        const textarea = document.createElement('textarea');
        textarea.placeholder = state.textarea.input.placeholder;
        state.textarea.dom = textarea;
        this.dom.appendChild(textarea);

        const textPara = document.createElement('p');
        this.dom.appendChild(textPara);

        textPara.addEventListener('click', () => {
            textPara.style.display = 'none';
            textarea.style.display = 'block';
        });

        textarea.addEventListener('blur', () => {
            textPara.textContent = textarea.value;
            textPara.style.display = 'block';
            textarea.style.display = 'none';
        });
    }
}
