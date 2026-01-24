import { State } from "../wrapper";

export class Footer {
    dom = document.createElement('div');
    textarea = document.createElement('textarea');
    paragraph = document.createElement('p');

    constructor(state: State) {
        this.textarea.placeholder =  '（ここに文章を入力できます。）';
        this.textarea.value = state.textarea;
        this.textarea.style.display = 'none';
        
        this.paragraphText = state.textarea;

        this.dom.appendChild(this.textarea);
        this.dom.appendChild(this.paragraph);

        this.paragraph.addEventListener('click', () => {
            this.paragraph.style.display = 'none';
            this.textarea.style.display = 'block';
            this.textarea.focus();
        });

        this.textarea.addEventListener('blur', () => {
            this.paragraphText = this.textarea.value;
            this.textarea.style.display = 'none';
            this.paragraph.style.display = 'block';
            
            const event = new CustomEvent("blur-textarea", {
                bubbles: true,
                detail: this.textarea.value
            });
            this.dom.dispatchEvent(event);
        });
    }
    
    set paragraphText(text: string) {
        if(text === '') {
            this.paragraph.textContent = '（ここに文章を入力できます。）';
        }else{
            this.paragraph.textContent = text;
        }
    }
    
    render(state: State):void {
        
    }
}
