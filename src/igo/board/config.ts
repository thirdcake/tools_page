export const config = Object.freeze({
    ns: 'http://www.w3.org/2000/svg',
    color: '#333',
    thin: 2,
    thick: 4,
    size: 19,
    interval: 48,
    text_size: 36,
    radius: 20,
    positions: Array.from({length: 19}, (_,i) => Math.floor(48/2) + i*48),
});

export const stonePattern = Object.freeze({
    empty: {
        circle_fill: 'transparent',
        circle_stroke: 'transparent',
        text_fill: 'transparent',
    },
    onlyChar:{
        circle_fill: '#fff',
        circle_stroke: '#fff',
        text_fill: config.color,
    },
    black:{
        circle_fill: config.color,
        circle_stroke: config.color,
        text_fill: '#fff',
    },
    white:{
        circle_fill: '#fff',
        circle_stroke: config.color,
        text_fill: config.color,
    },
});