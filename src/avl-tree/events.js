class ParentEvent {
    constructor(tree, svgRenderer, errorRenderer) {
        this.tree = tree;
        this.svgRenderer = svgRenderer;
        this.errorRenderer = errorRenderer;
    }
}

class ClickEvent extends ParentEvent {
    constructor(tree, svgRenderer, errorRenderer) {
        super(tree, svgRenderer, errorRenderer);
    }
    handleEvent(event) {
        const clickGroup = event.target.closest('g');
        if(clickGroup && clickGroup.dataset.clickable === 'true') {
            const nodeGroup = clickGroup.parentNode.closest('g');
            const key = Number(nodeGroup.id.replace('node', ''));
            const action = clickGroup.dataset.action;
            switch(action) {
                case 'x':
                    this.tree.delete(key);
                    break;
                case 'L':
                    this.tree.rotate(key, 'left');
                    break;
                case 'R':
                    this.tree.rotate(key, 'right');
                    break;
            }
            this.svgRenderer.render(this.tree.root);
        }
    }
}

class SubmitEvent extends ParentEvent {
    constructor(tree, svgRenderer, errorRenderer, inputnum) {
        super(tree, svgRenderer, errorRenderer);
        this.inputnum = inputnum;
    }
    handleEvent(event) {
        event.preventDefault();
        const nums = this.inputnum.value.split(' ').map(Number);
        nums.forEach(num => {
            if (isNaN(num)) {
                this.errorRenderer.render('数値以外が含まれています');
                return;
            }
            this.tree.insert(num);
        });
        this.svgRenderer.render(this.tree.root);
    }
}

export {ClickEvent, SubmitEvent}

