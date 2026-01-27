type InitData = {
    text: string;
    value: string;
}

type ButtonData = {
    title: string;
    type: string;
    init: InitData[];
}

function createButtons(input: ButtonData): HTMLUListElement {
    const ul = document.createElement('ul');
    ul.classList.add('go-form-ul');

    const title = document.createElement('li');
    title.textContent = input.title;
    ul.appendChild(title);

    const buttons = input.init.map(ini => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.dataset.type = input.type;
        btn.dataset.value = ini.value;
        btn.textContent = ini.text;
        return btn;
    });

    buttons[0].classList.add('active');

    buttons.forEach(btn => {
        const li = document.createElement('li');
        li.appendChild(btn);
        ul.appendChild(li);
    });

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => {
                b.classList.toggle('active', b===btn);
            });
        }, false);
    });

    return ul;
}

export function createColorButtons(): HTMLUListElement {
    return createButtons({
        title: '石の色：',
        type: 'color',
        init: [
            {text: '（無色）', value: '0'},
            {text: '黒', value: '1'},
            {text: '白', value: '2'},
        ],
    });
}

export function createCharacterButtons(): HTMLUListElement {
    return createButtons({
        title: '文字',
        type: 'character',
        init: [
            {text: '（無し）', value: ''},
            {text: 'A', value: 'A'},
            {text: 'B', value: 'B'},
            {text: 'C', value: 'C'},
            {text: 'D', value: 'D'},
            {text: 'E', value: 'E'},
            {text: '△', value: '△'},
            {text: '1', value: '1'},
            {text: '2', value: '2'},
            {text: '3', value: '3'},
            {text: '4', value: '4'},
            {text: '5', value: '5'},
        ],
    });
}

export function createXAxisButtons(): HTMLUListElement {
    return createButtons({
        title: '横軸',
        type: 'x-axis',
        init: [
            {text: '（無し）', value: 'none'},
            {text: '1,2,3,...', value: 'num'},
            {text: 'あ,い,う,...', value: 'aiu'},
            {text: 'イ,ロ,ハ,...', value: 'iroha'},
        ],
    });
}

export function createYAxisButtons(): HTMLUListElement {
    return createButtons({
        title: '縦軸',
        type: 'y-axis',
        init: [
            {text: '（無し）', value: 'none'},
            {text: '1,2,3,...', value: 'num'},
            {text: 'あ,い,う,...', value: 'aiu'},
            {text: 'イ,ロ,ハ,...', value: 'iroha'},
        ],
    });
}
