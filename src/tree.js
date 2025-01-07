class Node {
    /**
     * @param {number} key
     * @param {Node?} right 右側のノード
     * @param {Node?} left 左側のノード
     * @param {number} height ノードの高さ
     */
    constructor(key) {
        this.key = key;
        this.right = null;
        this.left = null;
        this.height = 1;
    }
}

class Tree {
    constructor () {
        this.root = null;
    }
    
    /**
     * @param {Node} node
     * @return {number}
     */
    _getHeight (node) {
        return (node === null)? 0 : node.height;
    }

    /**
     * @param {number} key
     */
    insert (key) {
        if(this.root === null) {
            this.root = new Node(key);
            return;
        }
        const stack = [];
        let currentNode = this.root;
        stack.push(currentNode);
        while(currentNode !== null) {
            if (currentNode.key < key) {
                if(currentNode.right === null) {
                    currentNode.right = new Node(key);
                    break;
                }
                currentNode = currentNode.right;
            } else if (key < currentNode.key){
                if(currentNode.left === null) {
                    currentNode.left = new Node(key);
                    break;
                }
                currentNode = currentNode.left;
            } else {  // すでにkeyがある
                return;
            }
            stack.push(currentNode);
        }
        stack.reverse().forEach(node => {
            node.height = Math.max(this._getHeight(node.right), this._getHeight(node.left)) + 1;
        });
    }

    /**
     * @param {number} key
     */
    delete (key) {
        if(this.root === null) {
            return;
        }
        const stack = [];
        let currentNode = this.root;
        let parentNode = null;
        stack.push(currentNode);
        while (currentNode !== null) {
            if(currentNode.key < key) {
                parentNode = currentNode;
                currentNode = currentNode.right;
            } else if (key < currentNode.key) {
                parentNode = currentNode;
                currentNode = currentNode.left;
            } else {
                break;
            }
            stack.push(currentNode);
        }
        if(currentNode === null) {
            return;
        }
        if(currentNode.right === null && currentNode.left === null) {
            if(parentNode === null) {
                this.root = null;
            } else {
                console.log(parentNode);
                if (parentNode.key < key) {
                    parentNode.right = null;
                } else {
                    parentNode.left = null;
                }
            }
        } else if (currentNode.right === null || currentNode.left === null) {
            const child = currentNode.right ? currentNode.right : currentNode.left;
            if (parentNode === null) {
                this.root = child;
            } else {
                if(parentNode.key < key) {
                    parentNode.right = child;
                } else {
                    parentNode.left = child;
                }
            }
        } else {
            let upperBound = currentNode.right;
            let direction = 'right';
            parentNode = currentNode;
            stack.push(upperBound);
            while (upperBound.left !== null) {
                parentNode = upperBound;
                upperBound = upperBound.left;
                direction = 'left';
                stack.push(upperBound);
            }
            currentNode.key = upperBound.key;
            if (upperBound.right === null) {
                parentNode[direction] = null;
            } else {
                parentNode[direction] = upperBound.right;
            }
        }
        stack.reverse().forEach(node => {
            node.height = Math.max(this._getHeight(node.right), this._getHeight(node.left)) + 1;
        });
    }

    /**
     * @param {number} key
     * @param {'left' | 'right'} lR
     * @returns {Node}
     */
    rotate (key, lR) {
        const rL = (lR === 'left') ? 'right' : 'left';
        const stack = [];
        let currentNode = this.root;
        let parentNode = null;
        stack.push(currentNode);
        while (currentNode !== null) {
            if(currentNode.key < key) {
                parentNode = currentNode;
                currentNode = currentNode.right;
            } else if (key < currentNode.key) {
                parentNode = currentNode;
                currentNode = currentNode.left;
            } else {
                break;
            }
            stack.push(currentNode);
        }
        const next = currentNode[rL];
        [next[lR], currentNode[rL]] = [currentNode, next[lR]];
        if (parentNode === null) {
            this.root = next;
        } else if (parentNode.left === currentNode) {
            parentNode.left = next;
        } else {
            parentNode.right = next;
        }
        stack.push(next);
        stack.push(currentNode);
        stack.reverse().forEach(node => {
            node.height = Math.max(this._getHeight(node.right), this._getHeight(node.left)) + 1;
        });
    }
}

export {Tree};
