type RangeData = {
    title: string;
    type: string;
}

function createRange(data: RangeData): HTMLDivElement {
    const div = document.createElement('div');
    div.classList.add('go-form-range');

    const title = document.createElement('span');
    title.textContent = data.title;
    const input = document.createElement('input');
    input.type = 'range';
    input.min = '5';
    input.max = '19';
    input.value = '19';
    input.dataset.type = data.type;
    const span = document.createElement('span');
    span.textContent = '19';

    div.appendChild(title);
    div.appendChild(input);
    div.appendChild(span);

    input.addEventListener('change', () => {
        span.textContent = input.value;
    }, false);
    return div;
}

export function createXAxisRange() {
    return createRange({
        title: '横幅',
        type: 'width',
    });
}

export function createYAxisRange() {
    return createRange({
        title: '高さ',
        type: 'height',
    });
}
