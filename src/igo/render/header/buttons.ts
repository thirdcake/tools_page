type BtnData = { value: string, text: string }
type BtnsData = {
    type: string,
    title: string,
    init: BtnData[],
}

export function createColorButtons(): HTMLUListElement {
    const data: BtnsData = {
        type: 'color',
        title: '碁石の色：',
        init: [
            {value: '0', text: '透明'},
            {value: '1', text: '黒'},
            {value: '2', text: '白'},
        ],
    }
    return createButtons(data);
}

export function createCharacterButtons(): HTMLUListElement {
    const data: BtnsData = {
        type: 'character',
        title: '文字：',
        init: [
            {value: '', text: '（無し）'},
            {value: 'A', text: 'A'},
            {value: 'B', text: 'B'},
            {value: 'C', text: 'C'},
            {value: 'D', text: 'D'},
            {value: 'E', text: 'E'},
            {value: '△', text: '△'},
            {value: '1', text: '1'},
            {value: '2', text: '2'},
            {value: '3', text: '3'},
            {value: '4', text: '4'},
            {value: '5', text: '5'},
        ],
    }
    return createButtons(data);
}

export function createVerticalButtons(): HTMLUListElement {
    const data: BtnsData = {
        type: 'vertical',
        title: '縦座標：',
        init: [
            {value: 'null', text: '（無し）'},
            {value: 'nums', text: '1,2,3,...'},
            {value: 'aiu', text: 'あ,い,う,...'},
            {value: 'iroha', text: 'イ,ロ,ハ,...'},
        ],
    }
    return createButtons(data);
}

export function createHorizontalButtons(): HTMLUListElement {
    const data: BtnsData = {
        type: 'horizontal',
        title: '縦座標：',
        init: [
            {value: 'null', text: '（無し）'},
            {value: 'nums', text: '1,2,3,...'},
            {value: 'aiu', text: 'あ,い,う,...'},
            {value: 'iroha', text: 'イ,ロ,ハ,...'},
        ],
    }
    return createButtons(data);
}

function createButtons(data: BtnsData): HTMLUListElement {
    const dom = document.createElement('ul');
    dom.classList.add('go-form-ul');
    const li = document.createElement('li');
    li.textContent = data.title;
    dom.appendChild(li);
    
    const buttons = data.init.map(dat => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.value = dat.value;
        btn.textContent = dat.text;
        return btn;
    });
    buttons[0].classList.add('active');

    // dom に appendChild
    buttons.forEach(btn => {
        const li = document.createElement('li');
        li.appendChild(btn);
        dom.appendChild(li);
    });
    
    // click 時に customEvent
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(button => {
                button.classList.toggle('active', button===btn);
            });
            
            const event = new CustomEvent('change-state', {
                bubbles: true,
                detail: {
                    type: data.type,
                    value: btn.value,
                }
            });
            btn.dispatchEvent(event);
        }, false);
    });
    return dom;
}
