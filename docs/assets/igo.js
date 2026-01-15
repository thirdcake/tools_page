(() => {
  // src/igo/grid.ts
  var Grid = class {
    #ns = "http://www.w3.org/2000/svg";
    #config;
    dom;
    constructor(config, positions) {
      this.#config = config;
      const dom = document.createElementNS(this.#ns, "g");
      if (!(dom instanceof SVGGElement)) {
        throw new Error("Grid \u306E\u4F5C\u6210\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002");
      }
      this.dom = dom;
      this.dom = this.#drawLines(this.dom, positions);
      this.dom = this.#drawDots(this.dom, positions);
    }
    #drawLines(dom, positions) {
      const start = Math.floor(this.#config.interval / 2) - Math.floor(this.#config.thick / 2);
      const end = this.#config.interval * this.#config.size - start;
      return positions.reduce((group, pos, i) => {
        const isFirstOrLast = i === 0 || i === positions.length - 1;
        const sw = isFirstOrLast ? this.#config.thick : this.#config.thin;
        group.appendChild(this.#createLine(start, end, pos, pos, sw));
        group.appendChild(this.#createLine(pos, pos, start, end, sw));
        return group;
      }, dom);
    }
    #drawDots(dom, positions) {
      const isDotPos = (_, i) => i === 3 || i === 9 || i === 15;
      const filterPositions = positions.filter(isDotPos);
      filterPositions.forEach((pos_r) => {
        filterPositions.forEach((pos_c) => {
          dom.appendChild(this.#createDot(pos_r, pos_c));
        });
      });
      return dom;
    }
    #createLine(x1, x2, y1, y2, sw) {
      const line = document.createElementNS(this.#ns, "line");
      line.setAttribute("x1", `${x1}`);
      line.setAttribute("x2", `${x2}`);
      line.setAttribute("y1", `${y1}`);
      line.setAttribute("y2", `${y2}`);
      line.setAttribute("stroke", this.#config.color);
      line.setAttribute("stroke-width", `${sw}`);
      return line;
    }
    #createDot(cx, cy) {
      const dot = document.createElementNS(this.#ns, "circle");
      dot.setAttribute("cx", `${cx}`);
      dot.setAttribute("cy", `${cy}`);
      const r = Math.floor(this.#config.thick * 1.5);
      dot.setAttribute("r", `${r}`);
      dot.setAttribute("fill", this.#config.color);
      return dot;
    }
  };

  // src/igo/coordinates.ts
  var Coordinates = class {
    #ns = "http://www.w3.org/2000/svg";
    #config;
    dom;
    #aiu = "\u3042\u3044\u3046\u3048\u304A\u304B\u304D\u304F\u3051\u3053\u3055\u3057\u3059\u305B\u305D\u305F\u3061\u3064\u3066".split("");
    #iroha = "\u30A4\u30ED\u30CF\u30CB\u30DB\u30D8\u30C8\u30C1\u30EA\u30CC\u30EB\u30F2\u30EF\u30AB\u30E8\u30BF\u30EC\u30BD\u30C4".split("");
    #nums = Array.from({ length: 19 }, (_, i) => `${i + 1}`);
    #verticalChars;
    #holizontalChars;
    constructor(config, positions) {
      this.#config = config;
      const dom = document.createElementNS(this.#ns, "g");
      if (!(dom instanceof SVGGElement)) {
        throw new Error("coordinates error");
      }
      this.dom = dom;
      this.#verticalChars = this.#createVerticalChars(positions);
      this.#holizontalChars = this.#createHolizontalChars(positions);
      this.dom = this.#setChars(this.dom, this.#verticalChars);
      this.dom = this.#setChars(this.dom, this.#holizontalChars);
    }
    onChangeCoord(type, value) {
      const arr = this.#changeChars(value);
      if (arr === null) return;
      if (type === "vertical") {
        arr.forEach((c, i) => {
          this.#verticalChars[i].textContent = c;
        });
      } else {
        arr.forEach((c, i) => {
          this.#holizontalChars[i].textContent = c;
        });
      }
    }
    #createVerticalChars(positions) {
      const createVChar = (pos) => {
        const text = this.#createChar();
        const x = -Math.floor(this.#config.interval / 2);
        const base_line = this.#config.radius * 0.6;
        const y = pos + base_line;
        text.setAttribute("x", `${x}`);
        text.setAttribute("y", `${y}`);
        return text;
      };
      const arr = positions.toReversed().map(createVChar);
      return arr;
    }
    #createHolizontalChars(positions) {
      const createHChar = (pos) => {
        const text = this.#createChar();
        const base_line = this.#config.radius * 0.6;
        const y = this.#config.size * this.#config.interval + Math.floor(this.#config.interval / 2) + base_line;
        text.setAttribute("x", `${pos}`);
        text.setAttribute("y", `${y}`);
        return text;
      };
      const arr = positions.map(createHChar);
      return arr;
    }
    #createChar() {
      const text = document.createElementNS(this.#ns, "text");
      const style = `font:normal ${this.#config.text_size}px sans-serif;`;
      text.setAttribute("style", style);
      text.setAttribute("fill", this.#config.color);
      text.setAttribute("text-anchor", "middle");
      return text;
    }
    #setChars(group, chars) {
      return chars.reduce((group2, char) => {
        group2.appendChild(char);
        return group2;
      }, group);
    }
    #changeChars(value) {
      switch (value) {
        case "aiu":
          return this.#aiu;
        case "iroha":
          return this.#iroha;
        case "nums":
          return this.#nums;
        default:
          return null;
      }
    }
  };

  // src/igo/stone.ts
  var Stone = class {
    #ns = "http://www.w3.org/2000/svg";
    #config;
    #color;
    #character;
    g;
    #circle;
    #text;
    constructor(config, row, col, color = 0, character = "") {
      this.#config = config;
      this.g = document.createElementNS(this.#ns, "g");
      this.#circle = this.#createCircle(row, col);
      this.g.appendChild(this.#circle);
      this.#text = this.#createText(row, col);
      this.g.appendChild(this.#text);
      this.#color = color;
      this.#character = character;
      this.#render();
    }
    onChange(color, character) {
      const same_color = color === this.#color;
      const same_char = character === this.#character;
      if (same_color && same_char) {
        this.#color = 0;
        this.#character = "";
      } else {
        this.#color = color;
        this.#character = character;
      }
      this.#render();
    }
    #createCircle(row, col) {
      const circle = document.createElementNS(this.#ns, "circle");
      circle.setAttribute("cx", `${col}`);
      circle.setAttribute("cy", `${row}`);
      circle.setAttribute("r", `${this.#config.radius}`);
      circle.setAttribute("fill", "transparent");
      circle.setAttribute("stroke", "transparent");
      circle.setAttribute("stroke-width", `${this.#config.thick}`);
      return circle;
    }
    #createText(row, col) {
      const text = document.createElementNS(this.#ns, "text");
      const text_size = this.#config.text_size;
      const font_style = `font:normal ${text_size}px sans-serif`;
      text.setAttribute("style", font_style);
      text.setAttribute("x", `${col}`);
      const base_line = this.#config.radius * 0.6;
      const y = base_line + row;
      text.setAttribute("y", `${y}`);
      text.setAttribute("fill", "transparent");
      text.setAttribute("text-anchor", "middle");
      text.textContent = "";
      return text;
    }
    #render() {
      const color = this.#color;
      const character = this.#character;
      const line_color = this.#config.color;
      let circle_fill = "transparent", circle_stroke = "transparent", text_fill = "transparent";
      if (color === 0 && character === "") {
        circle_fill = "transparent";
        circle_stroke = "transparent";
        text_fill = "transparent";
      } else if (color === 0) {
        circle_fill = "#fff";
        circle_stroke = "#fff";
        text_fill = line_color;
      } else if (color === 1) {
        circle_fill = line_color;
        circle_stroke = line_color;
        text_fill = "#fff";
      } else if (color === 2) {
        circle_fill = "#fff";
        circle_stroke = line_color;
        text_fill = line_color;
      }
      this.#circle.setAttribute("fill", circle_fill);
      this.#circle.setAttribute("stroke", circle_stroke);
      this.#text.setAttribute("fill", text_fill);
      this.#text.textContent = character;
    }
  };

  // src/igo/stones.ts
  var Stones = class {
    #ns = "http://www.w3.org/2000/svg";
    #config;
    #positions;
    stones;
    dom;
    constructor(config, positions) {
      this.#config = config;
      this.#positions = positions;
      this.stones = this.#createStones(positions);
      const dom = document.createElementNS(this.#ns, "g");
      if (!(dom instanceof SVGGElement)) {
        throw new Error("stones error");
      }
      this.dom = dom;
      this.stones.forEach((row) => {
        row.forEach((stone) => {
          this.dom.appendChild(stone.g);
        });
      });
    }
    onClick(x, y, state) {
      if (x < 0) return;
      const max_height = this.#config.size * this.#config.interval;
      if (max_height < y) return;
      const positions = this.#positions;
      const init_x = { idx: 0, dist: Math.abs(positions[0] - x), now: x };
      const init_y = { idx: 0, dist: Math.abs(positions[0] - y), now: y };
      const minDist = (obj, pos, i) => {
        if (Math.abs(pos - obj.now) < obj.dist) {
          obj.idx = i;
          obj.dist = Math.abs(pos - obj.now);
        }
        return obj;
      };
      const col = positions.reduce(minDist, init_x).idx;
      const row = positions.reduce(minDist, init_y).idx;
      const color = state.color;
      const character = state.character;
      this.stones[row][col].onChange(color, character);
    }
    #createStones(positions) {
      return positions.map(
        (row_pos) => positions.map(
          (col_pos) => new Stone(this.#config, row_pos, col_pos, 0, "")
        )
      );
    }
  };

  // src/igo/board.ts
  var Board = class {
    #ns = "http://www.w3.org/2000/svg";
    #config = {
      color: "#333",
      thin: 2,
      thick: 4,
      size: 19,
      interval: 48,
      text_size: 36,
      radius: 20
    };
    #parentViewBox = {
      min_x: 0,
      min_y: 0,
      width: this.#config.size * this.#config.interval,
      height: this.#config.size * this.#config.interval
    };
    #childViewBox = {
      min_x: 0,
      min_y: 0,
      width: this.#config.size * this.#config.interval,
      height: this.#config.size * this.#config.interval
    };
    #positions;
    dom;
    #childDom;
    #grid;
    #coorinates;
    #stones;
    constructor() {
      this.#positions = this.#createPositions();
      this.dom = this.#createDom();
      this.#childDom = this.#createChild();
      this.dom.appendChild(this.#childDom);
      this.#coorinates = new Coordinates(this.#config, this.#positions);
      this.dom.appendChild(this.#coorinates.dom);
      this.#grid = new Grid(this.#config, this.#positions);
      this.#childDom.appendChild(this.#grid.dom);
      this.#stones = new Stones(this.#config, this.#positions);
      this.#childDom.appendChild(this.#stones.dom);
    }
    onClick(ev, state) {
      const pt = this.#childDom.createSVGPoint();
      pt.x = ev.clientX;
      pt.y = ev.clientY;
      const { x, y } = pt.matrixTransform(this.#childDom.getScreenCTM()?.inverse());
      this.#stones.onClick(x, y, state);
    }
    #createPositions() {
      const margin = Math.floor(this.#config.interval / 2);
      const func = (_, i) => margin + this.#config.interval * i;
      const positions = Array.from({ length: this.#config.size }, func);
      return positions;
    }
    #createDom() {
      const dom = document.createElementNS(this.#ns, "svg");
      if (!(dom instanceof SVGSVGElement)) {
        throw new Error("SVG \u8981\u7D20\u306E\u4F5C\u6210\u306B\u5931\u6557\u3057\u3066\u3044\u307E\u3059\u3002");
      }
      dom.setAttribute("viewBox", this.#getViewBox(this.#parentViewBox));
      dom.classList.add("board");
      return dom;
    }
    #createChild() {
      const dom = document.createElementNS(this.#ns, "svg");
      if (!(dom instanceof SVGSVGElement)) {
        throw new Error("SVG child \u8981\u7D20\u306E\u4F5C\u6210\u306B\u5931\u6557\u3057\u3066\u3044\u307E\u3059\u3002");
      }
      dom.setAttribute("viewBox", this.#getViewBox(this.#childViewBox));
      return dom;
    }
    #getViewBox(viewBox) {
      const {
        min_x,
        min_y,
        width,
        height
      } = viewBox;
      return [min_x, min_y, width, height].join(" ");
    }
    /*
        onClickColor(oldVal:string, newVal:string) {
            this.#state.color = newVal;
        }
    
        onClickChar(oldVal:string, newVal:string) {
            this.#state.character = newVal;
        }
    
        onChangeXL(oldVal:string, newVal:string) {
        }
        onChangeXR(oldVal:string, newVal:string) {
            const oldNum = Number(oldVal);
            const newNum = Number(newVal);
            if(isNaN(oldNum) || isNaN(newNum)) return;
            const oldLeft = this.#config.interval * (oldNum - 1);
            const newLeft = this.#config.interval * (newNum - 1);
            this.#viewBox[2] += newLeft - oldLeft;
            this.svg.setAttribute('viewBox', this.#viewBox.join(' '));
        }
        onChangeYU(oldVal:string, newVal:string) {
            const oldNum = Number(oldVal);
            const newNum = Number(newVal);
            if(isNaN(oldNum) || isNaN(newNum)) return;
            const oldUp = this.#config.interval * (oldNum - 1);
            const newUp = this.#config.interval * (newNum - 1);
            this.#viewBox[1] += oldUp - newUp;
            this.#viewBox[3] -= oldUp - newUp;
            this.svg.setAttribute('viewBox', this.#viewBox.join(' '));
        }
        onChangeYD(oldVal:string, newVal:string) {}
    
        onClickVertical(oldVal:string, newVal:string) {
            if(oldVal==='null' && newVal!=='null') {
                this.#viewBox[0] -= this.#config.interval;
                this.#viewBox[2] += this.#config.interval;
            }else if(oldVal!=='null' && newVal==='null') {
                this.#viewBox[0] += this.#config.interval;
                this.#viewBox[2] -= this.#config.interval;
            }
            this.svg.setAttribute('viewBox', this.#viewBox.join(' '));
            this.#coodinates.onChangeCoord('vertical', newVal);
        }
    
        onClickHolizontal(oldVal:string, newVal:string) {
            if(oldVal==='null' && newVal!=='null') {
                this.#viewBox[3] += this.#config.interval;
            }else if(oldVal!=='null' && newVal==='null') {
                this.#viewBox[3] -= this.#config.interval;
            }
            this.svg.setAttribute('viewBox', this.#viewBox.join(' '));
            this.#coodinates.onChangeCoord('holizontal', newVal);
        }
    
        */
  };

  // src/igo/controller.ts
  var Controller = class {
    dom;
    #data = {
      color: {
        title: "\u8272\uFF1A",
        dat: [
          { value: "0", text: "\u900F\u660E", active: true },
          { value: "1", text: "\u9ED2", active: false },
          { value: "2", text: "\u767D", active: false }
        ]
      },
      character: {
        title: "\u6587\u5B57\uFF1A",
        dat: [
          { value: "", text: "\uFF08\u7121\u3057\uFF09", active: true },
          { value: "A", text: "A", active: false },
          { value: "B", text: "B", active: false },
          { value: "C", text: "C", active: false },
          { value: "D", text: "D", active: false },
          { value: "E", text: "E", active: false },
          { value: "\u25B3", text: "\u25B3", active: false },
          { value: "1", text: "1", active: false },
          { value: "2", text: "2", active: false },
          { value: "3", text: "3", active: false },
          { value: "4", text: "4", active: false }
        ]
      },
      holizontal: {
        title: "\u5EA7\u6A19\uFF08\u7E26\uFF09\uFF1A",
        dat: [
          { value: "null", text: "\uFF08\u7121\u3057\uFF09", active: true },
          { value: "nums", text: "1,2,3...", active: false },
          { value: "aiu", text: "\u3042,\u3044,\u3046...", active: false },
          { value: "iroha", text: "\u30A4,\u30ED,\u30CF...", active: false }
        ]
      },
      vertical: {
        title: "\u5EA7\u6A19\uFF08\u6A2A\uFF09\uFF1A",
        dat: [
          { value: "null", text: "\uFF08\u7121\u3057\uFF09", active: true },
          { value: "nums", text: "1,2,3...", active: false },
          { value: "aiu", text: "\u3042,\u3044,\u3046...", active: false },
          { value: "iroha", text: "\u30A4,\u30ED,\u30CF...", active: false }
        ]
      }
    };
    buttons;
    ranges = {
      x: document.createElement("span"),
      y: document.createElement("span")
    };
    constructor() {
      this.buttons = {
        color: this.#createButtons("color", this.#data.color.dat),
        character: this.#createButtons("character", this.#data.character.dat),
        holizontal: this.#createButtons("holizontal", this.#data.holizontal.dat),
        vertical: this.#createButtons("vertical", this.#data.vertical.dat)
      };
      this.dom = this.#createDom();
    }
    onClick(state) {
      if (state.is_change === false) return;
      const updateActive = (type) => {
        this.buttons[type].forEach((btn) => {
          btn.classList.remove("active");
          const val = Number(btn.dataset.gostateValue);
          if (isNaN(val)) return;
          if (val === state.color) {
            btn.classList.add("active");
          }
        });
      };
      switch (state.type) {
        case "color":
        case "character":
        case "holizontal":
        case "vertical":
          updateActive(state.type);
          break;
      }
    }
    onChange(state) {
      switch (state.type) {
        case "range-x":
          this.ranges.x.textContent = `${state.rangeX}`;
          break;
        case "range-y":
          this.ranges.y.textContent = `${state.rangeY}`;
          break;
      }
    }
    #createDom() {
      const dom = document.createElement("div");
      dom.appendChild(this.#createUl(
        this.#data.color.title,
        this.buttons.color
      ));
      dom.appendChild(this.#createUl(
        this.#data.character.title,
        this.buttons.character
      ));
      dom.appendChild(this.#createRange());
      dom.appendChild(this.#createUl(
        this.#data.holizontal.title,
        this.buttons.holizontal
      ));
      dom.appendChild(this.#createUl(
        this.#data.vertical.title,
        this.buttons.vertical
      ));
      return dom;
    }
    #createButtons(type, origin) {
      return origin.map((o) => {
        const dom = document.createElement("button");
        dom.dataset.gostateType = type;
        dom.dataset.gostateValue = o.value;
        dom.textContent = o.text;
        if (o.active) {
          dom.classList.add("active");
        }
        return dom;
      });
    }
    #createUl(title, buttons) {
      const ul = document.createElement("ul");
      ul.classList.add("go-form-ul");
      const li = document.createElement("li");
      li.textContent = title;
      ul.appendChild(li);
      return buttons.reduce((uldom, button) => {
        const li2 = document.createElement("li");
        li2.appendChild(button);
        uldom.appendChild(li2);
        return uldom;
      }, ul);
    }
    #createRange() {
      const div = document.createElement("div");
      div.classList.add("go-form-range");
      const data = [
        { text: "\u7E26\u5E45", dir: "range-y", min: "1", max: "19", value: "19" },
        { text: "\u6A2A\u5E45", dir: "range-x", min: "1", max: "19", value: "19" }
      ];
      data.forEach((obj) => {
        const label = document.createElement("label");
        const title = document.createElement("span");
        title.textContent = obj.text;
        label.appendChild(title);
        const input = document.createElement("input");
        input.type = "range";
        input.dataset.gostateType = "range";
        input.dataset.gostateDir = obj.dir;
        input.value = obj.value;
        input.min = obj.min;
        input.max = obj.max;
        label.appendChild(input);
        switch (obj.dir) {
          case "range-x":
            this.ranges.x.textContent = obj.value;
            label.appendChild(this.ranges.x);
            break;
          case "range-y":
            this.ranges.y.textContent = obj.value;
            label.appendChild(this.ranges.y);
            break;
        }
        div.appendChild(label);
      });
      return div;
    }
  };

  // src/igo/state.ts
  var State = class {
    #color;
    #character;
    #rangeX;
    #rangeY;
    #holizontal;
    #vertical;
    #is_change;
    #type;
    constructor() {
      this.#color = 0;
      this.#character = "";
      this.#rangeX = 19;
      this.#rangeY = 19;
      this.#vertical = "null";
      this.#holizontal = "null";
      this.#is_change = true;
      this.#type = null;
    }
    onClick(ev) {
      const target = ev.target;
      if (!(target instanceof HTMLElement)) return;
      const button = target.closest("button");
      if (!(button instanceof HTMLButtonElement)) return;
      const type = button.dataset.gostateType;
      const value = button.dataset.gostateValue;
      if (typeof value === "undefined") return;
      switch (type) {
        case "color":
          this.#type = "color";
          const old_color = this.color;
          this.color = value;
          this.#is_change = old_color !== this.color;
          break;
        case "character":
          this.#type = "character";
          const old_char = this.character;
          this.character = value;
          this.#is_change = old_char !== this.character;
          break;
        case "holizontal":
          this.#type = "holizontal";
          const old_holizontal = this.holizontal;
          this.holizontal = value;
          this.#is_change = old_holizontal !== this.holizontal;
          break;
        case "vertical":
          this.#type = "vertical";
          const old_vertical = this.vertical;
          this.vertical = value;
          this.#is_change = old_vertical !== this.vertical;
          break;
      }
    }
    onChange(ev) {
      const target = ev.target;
      if (!(target instanceof HTMLInputElement)) return;
      const value = target.value;
      if (typeof value !== "string") return;
      let old_range;
      switch (target.dataset.gostateDir) {
        case "range-x":
          this.#type = "range-x";
          old_range = this.rangeX;
          this.rangeX = value;
          this.#is_change = old_range !== this.rangeX;
          break;
        case "range-y":
          this.#type = "range-y";
          old_range = this.rangeY;
          this.rangeY = value;
          this.#is_change = old_range !== this.rangeY;
          break;
      }
    }
    get color() {
      return this.#color;
    }
    set color(n) {
      switch (n) {
        case "0":
          this.#color = 0;
          break;
        case "1":
          this.#color = 1;
          break;
        case "2":
          this.#color = 2;
          break;
      }
    }
    get character() {
      return this.#character;
    }
    set character(c) {
      if (c.length > 1) {
        this.#character = c[0];
      } else {
        this.#character = c;
      }
    }
    get rangeX() {
      return this.#rangeX;
    }
    set rangeX(s) {
      const num = Number(s);
      if (!Number.isInteger(num)) return;
      if (1 <= num && num <= 19) {
        this.#rangeX = num;
      }
    }
    get rangeY() {
      return this.#rangeY;
    }
    set rangeY(s) {
      const num = Number(s);
      if (!Number.isInteger(num)) return;
      if (1 <= num && num <= 19) {
        this.#rangeY = num;
      }
    }
    get holizontal() {
      return this.#holizontal;
    }
    set holizontal(s) {
      switch (s) {
        case "null":
          this.#holizontal = "null";
          break;
        case "nums":
          this.#holizontal = "nums";
          break;
        case "aiu":
          this.#holizontal = "aiu";
          break;
        case "iroha":
          this.#holizontal = "iroha";
          break;
      }
    }
    get vertical() {
      return this.#vertical;
    }
    set vertical(s) {
      switch (s) {
        case "null":
          this.#vertical = "null";
          break;
        case "nums":
          this.#vertical = "nums";
          break;
        case "aiu":
          this.#vertical = "aiu";
          break;
        case "iroha":
          this.#vertical = "iroha";
          break;
      }
    }
    get is_change() {
      return this.#is_change;
    }
    get type() {
      return this.#type;
    }
  };

  // src/igo/board-controller.ts
  var BoardController = class extends HTMLElement {
    boardController;
    static observedAttributes = [
      //"data-gostate-data",
    ];
    constructor() {
      super();
      this.boardController = {
        board: new Board(),
        controller: new Controller(),
        state: new State()
      };
      this.appendChild(this.boardController.controller.dom);
      this.appendChild(this.boardController.board.dom);
    }
    // document に接続時実行
    connectedCallback() {
      const board = this.boardController.board;
      const controller = this.boardController.controller;
      const state = this.boardController.state;
      board.dom.addEventListener("click", (ev) => {
        board.onClick(ev, state);
      }, false);
      controller.dom.addEventListener("click", (ev) => {
        const target = ev.target;
        if (!(target instanceof HTMLElement)) return;
        if (!target.closest("button")) return;
        state.onClick(ev);
        controller.onClick(state);
      }, false);
      controller.dom.addEventListener("change", (ev) => {
        console.log(state);
        state.onChange(ev);
        console.log(state);
        controller.onChange(state);
      }, false);
    }
    // 属性変更時実行
    attributeChangedCallback(attr, oldVal, newVal) {
      if (attr === "data-gostate-data") {
      }
    }
  };

  // src/igo/index.ts
  customElements.define("board-controller", BoardController);
})();
