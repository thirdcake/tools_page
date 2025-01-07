import {Tree} from './tree.js';
import {SVGRenderer, ErrorRenderer} from './renderer.js';
import {ClickEvent, SubmitEvent} from './events.js';

window.addEventListener('DOMContentLoaded', () => {
    const doms = ['svg', 'insert', 'inputnum', 'errorspace']
    .reduce((acc, id)=> {
        acc[id] = document.getElementById(id);
        return acc;
    }, {});
    const tree = new Tree();
    const svgRenderer = new SVGRenderer(doms.svg);
    const errorRenderer = new ErrorRenderer(doms.errorspace);
    const clickEvent = new ClickEvent(tree, svgRenderer, errorRenderer);
    doms.svg.addEventListener('click', clickEvent, false);
    const submitEvent = new SubmitEvent(tree, svgRenderer, errorRenderer, doms.inputnum);
    doms.insert.addEventListener('submit', submitEvent, false);
}, false);
