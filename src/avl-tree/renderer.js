class SvgCreator {
    
    constructor(){
        this.classNamePool = [];
    }

    _createCircle(cx, cy, r, text, fillcollor = '#fff') {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
            circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle'),
            textNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', r);
        circle.setAttribute('fill', fillcollor);
        circle.setAttribute('stroke', '#333');
        textNode.setAttribute('x', cx);
        textNode.setAttribute('y', cy);
        textNode.setAttribute('text-anchor', 'middle');
        textNode.setAttribute('fill', '#333');
        textNode.textContent = text;
        textNode.setAttribute('dy', '0.3em');
        group.appendChild(circle);
        group.appendChild(textNode);
        return group;
    }
    _createLine(xy1, xy2) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', xy1[0]);
        line.setAttribute('y1', xy1[1]);
        line.setAttribute('x2', xy2[0]);
        line.setAttribute('y2', xy2[1]);
        line.setAttribute('stroke', '#333');
        return line;
    }
    _int10toXY( int10 ) {
        const bin = int10.toString(2).split('');
        bin.shift();
        const level = bin.length;
        const x = (int10 - (2 ** level) + 0.5) * 800 / (2 ** level);
        const y = level * 100 + 50;
        return [x, y];
    }
    _getBalance(node) {
        if(node === null) {
            return 0;
        }
        const left = node.left ? node.left.height : 0;
        const right = node.right ? node.right.height : 0;
        return Math.abs(right - left);
    }
    createNode(node, posInt) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        if(node === null) {
            return group;
        }
        const [x, y] = this._int10toXY(posInt);
        group.setAttribute('transform', `translate(${x}, ${y})`);
        group.setAttribute('id', `node${node.key}`);
        group.dataset.pos = posInt;
        const fillcolor = (this._getBalance(node) > 1) ? '#f00' : '#fff';
        const keyCircle = this._createCircle(0, 0, 20, node.key, fillcolor);
        const deleteCircle = this._createCircle(20, -20, 12, 'x');
        deleteCircle.dataset.clickable = true;
        deleteCircle.dataset.action = 'x';
        deleteCircle.style.cursor = 'pointer';
        group.appendChild(keyCircle);
        group.appendChild(deleteCircle);
        if(node.right !== null) {
            const leftCircle = this._createCircle(-20, 20, 12, 'L');
            leftCircle.dataset.clickable = true;
            leftCircle.dataset.action = 'L';
            leftCircle.style.cursor = 'pointer';
            leftCircle.classList.add('lr-method');
            group.appendChild(leftCircle);
        }
        if(node.left !== null) {
            const rightCircle = this._createCircle(20, 20, 12, 'R');
            rightCircle.dataset.clickable = true;
            rightCircle.dataset.action = 'R';
            rightCircle.style.cursor = 'pointer';
            rightCircle.classList.add('lr-method');
            group.appendChild(rightCircle);
        }
        return group;
    }
    createBranch(treeRoot) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const stack = [];
        stack.push([treeRoot, 1]);
        while(stack.length > 0) {
            const [node, int10] = stack.pop();
            if(node.left !== null) {
                const line = this._createLine(
                    this._int10toXY(int10),
                    this._int10toXY(int10 * 2)
                );
                group.appendChild(line);
                stack.push([node.left, int10 * 2]);
            }
            if(node.right !== null) {
                const line = this._createLine(
                    this._int10toXY(int10),
                    this._int10toXY(int10 * 2 + 1)
                );
                group.appendChild(line);
                stack.push([node.right, int10 * 2 + 1]);
            }
        }
        return group;
    }
    setAnimation(nodeGroup, prevNodeGroup) {
        const posInt = nodeGroup.dataset.pos | 0;
        const prevPosInt = prevNodeGroup.dataset.pos | 0;
        if(posInt === prevPosInt) {
            return;
        }
        const fillMode = (posInt < prevPosInt) ? 'reverse' : 'normal';
        const mn = Math.min(posInt, prevPosInt);
        const mx = Math.max(posInt, prevPosInt);
        const animationName = `move-${mn}-${mx}`;
        if( ! this.classNamePool.includes(animationName)) {
            this.classNamePool.push(animationName);
            const [mnX, mnY] = this._int10toXY(mn);
            const [mxX, mxY] = this._int10toXY(mx);
            const styleSheet = document.styleSheets[0];
            const keyframes = `
                @keyframes ${animationName} {
                    from {
                        transform: translate(${mnX}px, ${mnY}px);
                    }
                    to {
                        transform: translate(${mxX}px, ${mxY}px);
                    }
                }
            `;
            styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
        }
        nodeGroup.style.animation = `${animationName} 1s ${fillMode} forwards linear`;
    }
}

class SVGRenderer {
    constructor(svg) {
        this.svg = svg;
        this.creator = new SvgCreator();
    }

    render (treeRoot) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        if (treeRoot === null) {
            this._resetSvg();
            this.svg.appendChild(group);
            return;
        }
        const prevSvg = this.svg.querySelector('svg>g');
        const branch = this.creator.createBranch(treeRoot);
        group.appendChild(branch);
        const stack = [];
        stack.push([treeRoot, 1]);
        while(stack.length > 0) {
            const [node, int10] = stack.pop();
            const prevNodeGroup = prevSvg.querySelector(`g#node${node.key}`);
            const nodeGroup = this.creator.createNode(node, int10);
            if(prevNodeGroup) {
                this.creator.setAnimation(nodeGroup, prevNodeGroup);
            }
            group.appendChild(nodeGroup);
            if(node.left !== null) {
                stack.push([node.left, int10 * 2]);
            }
            if(node.right !== null) {
                stack.push([node.right, int10 * 2 + 1]);
            }
        }
        this.svg.removeChild(prevSvg);
        this.svg.appendChild(group);
    }
}

class ErrorRenderer {
    constructor(errorspace) {
        this.errorspace = errorspace;
    }
    render(message) {
        this.errorspace.textContent = message;
    }
}

export {SVGRenderer, ErrorRenderer};
