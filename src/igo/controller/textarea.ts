import { DisplayMode } from "../board-controller";

export class Textarea {
    dom = document.createElement('div');
    area = document.createElement('textarea');
    para = document.createElement('p');
    #displayMode: DisplayMode = 'list';

    constructor() {
        this.dom.appendChild(this.area);
        this.dom.appendChild(this.para);

        this.area.style.display = 'none';
        this.para.textContent = '（ここに文章を入力できます。）';
        this.para.style.color = '#555';

        this.area.addEventListener('blur', () => {
            this.area.style.display = 'none';
            if(this.area.value === '') {
                this.para.textContent = '（ここに文章を入力できます。）';
                this.para.style.color = '#555';
            }else{
                this.para.textContent = this.area.value;
                this.para.style.color = '#111';
            }
            this.para.style.display = 'block';
        });

        this.para.addEventListener('click', () => {
            if(this.#displayMode === 'detail') {
                this.para.style.display = 'none';
                this.area.style.display = 'block';
                this.area.focus();
            }
        });
    }

    displayNone() {
        this.area.style.display = 'none';
        this.para.style.display = 'none';
    }
    displayList() {
        this.area.style.display = 'none';
        this.para.style.display = 'block';
        if(this.area.value === '') {
            this.para.textContent = ' ';
            this.para.style.color = '#555';
        }else{
            this.para.textContent = this.area.value;
            this.para.style.color = '#111';
        }
    }
    displayDetail() {
        this.area.style.display = 'none';
        this.para.style.display = 'block';
        if(this.area.value === '') {
            this.para.textContent = '（ここに文章を入力できます。）';
            this.para.style.color = '#555';
        }else{
            this.para.textContent = this.area.value;
            this.para.style.color = '#111';
        }
    }

    set displayMode(mode: DisplayMode) {
        this.#displayMode = mode;
        switch(mode) {
            case 'none':
                this.displayNone();
                break;
            case 'list':
                this.displayList();
                break;
            case 'detail':
                this.displayDetail();
                break;
        }
    }
}