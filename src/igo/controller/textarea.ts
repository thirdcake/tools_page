import { DisplayMode } from "../board-controller";

export class Textarea {
    dom = document.createElement('div');
    area = document.createElement('textarea');
    para = document.createElement('p');
    displayMode: DisplayMode = 'list';

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
                this.para.style.color = '#333';
            }
            this.para.style.display = 'block';
        });

        this.para.addEventListener('click', () => {
            if(this.displayMode === 'detail') {
                this.area.style.display = 'block';
                this.para.style.display = 'none';
            }
        });
    }
}