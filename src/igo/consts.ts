export const config = Object.freeze({
    ns: 'http://www.w3.org/2000/svg',
    color: '#333',
    thin: 2,
    thick: 4,
    size: 19,
    interval: 48,
    text_size: 36,
    font_style: 'font:normal 36px sans-serif',
    radius: 20,
    positions: Array.from({length: 19}, (_,i) => Math.floor(48/2) + i*48),
});
