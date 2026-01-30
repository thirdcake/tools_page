export function createSaveLoad(): HTMLElement {
    const dom = document.createElement('div');
    // save button
    const save = document.createElement('button');
    save.id = 'save';
    save.type = 'button';
    save.textContent = '保存する';
    
    save.addEventListener('click', () => {
        const event = new Event('go-save', {bubbles: true});
        dom.dispatchEvent(event);
    }, false);
    
    dom.appendChild(save);
    
    // load button
    const loadText = document.createTextNode('読み込み：');
    dom.appendChild(loadText);

    const load = document.createElement('input');
    load.id = 'load';
    load.type = 'file';
    load.accept = 'application/json';
    
    load.addEventListener('change', (ev: Event)=>{
        
    }, false);

    dom.appendChild(load);

    return dom;
}
