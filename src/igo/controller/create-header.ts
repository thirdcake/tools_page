import {
    createColorButtons,
    createCharacterButtons,
    createXAxisButtons,
    createYAxisButtons,
} from "./create-buttons";
import {
    createXAxisRange,
    createYAxisRange,
} from "./create-ranges";

export function createHeader(): HTMLElement {
    const dom = document.createElement('div');

    dom.appendChild(createColorButtons());
    dom.appendChild(createCharacterButtons());
    dom.appendChild(createXAxisRange());
    dom.appendChild(createYAxisRange());
    dom.appendChild(createXAxisButtons());
    dom.appendChild(createYAxisButtons());

    return dom;
}
