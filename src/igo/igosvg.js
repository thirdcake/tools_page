export class IgoSvg {
    ns = 'http://www.w3.org/2000/svg';
    /** @type {SVGElement} */
    dom;
    #config = {
        thin: 2,
        thick: 4,
        square_width: 48,
        radius: 20,
        row_count: 19,
        col_count: 19,
    }
    #grid;
    data;
    #group;
    constructor(id, row_count=19, col_count=19) {
        this.#config.row_count = row_count;
        this.#config.col_count = col_count;
        const count2d = this.#config.row_count * this.#config.col_count;
        const margin = Math.floor(this.#config.square_width / 2);
        const pitch = (_, i) => margin + this.#config.square_width * i;
        const row_positions = Array.from({length: row_count}, pitch);
        const col_positions = Array.from({length: col_count}, pitch);
        this.#grid = this.#createGrid(row_positions, col_positions);
        this.dom = this.#createDom(id, row_positions, col_positions);
        this.#group = document.createElementNS(this.ns, 'g');
        this.dom.appendChild(this.group);
        this.data = Array.from({length: count2d}, () => [0, 0]);
    }

    #createGrid(row_positions, col_positions) {
        const grid = [];
        row_positions.forEach(x => {
            col_positions.forEach(y => {
                grid.push([x, y]);
            })
        });
        return grid;
    }

    #createDom(id, row_positions, col_positions) {
        const svg = document.createElementNS(this.ns, 'svg');
        const w = this.square_width * this.#config.row_count,
            h = this.#config.square_width * this.#config.col_count;
        svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
        svg.dataset.value = id;
        // line を作る
        const createLine = (x1, x2, y1, y2, s_w) => {
            const line = document.createElementNS(this.ns, 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('x2', x2);
            line.setAttribute('y1', y1);
            line.setAttribute('y2', y2);
            line.setAttribute('stroke', '#333');
            line.setAttribute('stroke-width', s_w);
            return line;
        }
        const margin = Math.floor(this.#config.square_width / 2);
        const row_start = margin - Math.floor(this.#config.thick / 2),
            end = w - start;
        row_positions.forEach((x, i) => {
        });
        col_positions.forEach((y, i) => {
            const line = 
        });
        // dot を作る
        const dotPs = [positions[3], positions[9], positions[15]];
        dotPs.forEach(cx => {
            dotPs.forEach(cy => {
                const dot = document.createElementNS(this.ns, 'circle');
                dot.setAttribute('cx', cx);
                dot.setAttribute('cy', cy);
                dot.setAttribute('r', Math.floor(this.thick * 1.5));
                dot.setAttribute('fill', '#333');
                svg.appendChild(dot);
            })
        });
        return svg;
    }
    onClick(ev, state) {
        const index = this.nearestIndex(ev.clientX, ev.clientY);
        if(this.data[index][0] === state.color
            && this.data[index][1] === state.char) {
                this.data[index] = [0, 0];
        }else{
            this.data[index] = [state.color, state.char];
        }
        this.render();
    }
    nearestIndex(clientX, clientY) {
        const pt = this.svg.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        const p = pt.matrixTransform(this.svg.getScreenCTM().inverse());
        const index = this.grid
        .map(([x, y]) => (p.x-x)**2 + (p.y-y)**2)
        .reduce(([minDist, idx], dist, i) => {
            return (minDist <= dist) ? [minDist, idx] : [dist, i]
        }, [1<<30, -1])
        .at(1);
        return index;
    }
    clear() {
        while(!!this.group.lastChild) {
            this.group.removeChild(this.group.lastChild);
        }
    }
    render() {
        this.clear();
        this.data.forEach(([color, char], i) => {
            if(color===0 && char===0) return;
            const [cx, cy] = this.grid[i];
            const stone = this.createStone(cx, cy, color, char);
            this.group.appendChild(stone);
        });
    }

    createStone(cx, cy, color, char) {
        const stone = document.createElementNS(this.ns, 'g');
        const circle = document.createElementNS(this.ns, 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', this.radius);
        const fill = (color===1) ? '#333' : '#fff';
        const stroke = (color===0) ? '#fff' : '#333';
        circle.setAttribute('fill', fill); 
        circle.setAttribute('stroke', stroke);
        circle.setAttribute('stroke-width', 4);
        stone.appendChild(circle);
        if(char!==0) {
            const text = document.createElementNS(this.ns, 'text');
            text.setAttribute('style', `font: normal ${this.radius*1.8}px sans-serif`);
            text.setAttribute('x', cx);
            text.setAttribute('y', cy+(this.radius*.6));
            const text_fill = (color===1) ? '#fff' : '#333';
            text.setAttribute('fill', text_fill);
            text.setAttribute('text-anchor', 'middle');
            text.textContent = char;
            stone.appendChild(text);
        }
        return stone;
    }
    setData(data) {
        if(Array.isArray(data)===false) {
            console.error('データがおかしいです');
            return;
        }
        if(data.length !== 19*19) {
            console.error('data の要素数エラー');
            return;
        }
        data.forEach((dat, i) => {
            if(Array.isArray(dat)===false) return;
            if(dat.length !== 2) return;
            if([0,1,2].includes(dat[0])===false) return;
            if(['string', 'number'].includes(typeof dat[1])===false) return;
            this.data[i] = dat;
        });
    }
}