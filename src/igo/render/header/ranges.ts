type RangeData = {
    type: string,
    title: string,
    value: number,
    min: number,
    max: number,
}

export function createRange(type: string, title: string):HTMLElement {
    const data: RangeData = {
        type: type,
        title: title,
        value: 19,
        min: 5,
        max: 19,
    }
    const div = document.createElement('div');
    const titleSpan = document.createElement('span');
    titleSpan.textContent = title;
    const input = document.createElement('input');
    input.type = 'range';
    input.value = `${data.value}`;
    input.min = `${data.min}`;
    input.max = `${data.max}`;
    const valueSpan = document.createElement('span');
    valueSpan.textContent = input.value;

    // dom に appendChild
    div.appendChild(titleSpan);
    div.appendChild(input);
    div.appendChild(valueSpan);

    // 変化時の挙動
    input.addEventListener('change', () => {
        valueSpan.textContent = input.value;
        
        const event = new CustomEvent('change-state', {
            bubbles: true,
            detail: {
                type: type,
                value: input.value,
            }
        });
        input.dispatchEvent(event);
    });



    return div;
}
