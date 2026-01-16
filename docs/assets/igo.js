(() => {
  // src/igo/board/config.ts
  var config = Object.freeze({
    ns: "http://www.w3.org/2000/svg",
    color: "#333",
    thin: 2,
    thick: 4,
    size: 19,
    interval: 48,
    text_size: 36,
    radius: 20
  });

  // src/igo/board/grid.ts
  var Grid = class {
    dom;
    constructor(positions) {
      const dom = document.createElementNS(config.ns, "g");
      if (!(dom instanceof SVGGElement)) {
        throw new Error("Grid \u306E\u4F5C\u6210\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002");
      }
      this.dom = dom;
      this.dom = this.#drawLines(this.dom, positions);
      this.dom = this.#drawDots(this.dom, positions);
    }
    #drawLines(dom, positions) {
      const start = Math.floor(config.interval / 2) - Math.floor(config.thick / 2);
      const end = config.interval * config.size - start;
      return positions.reduce((group, pos, i) => {
        const isFirstOrLast = i === 0 || i === positions.length - 1;
        const sw = isFirstOrLast ? config.thick : config.thin;
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
      const line = document.createElementNS(config.ns, "line");
      line.setAttribute("x1", `${x1}`);
      line.setAttribute("x2", `${x2}`);
      line.setAttribute("y1", `${y1}`);
      line.setAttribute("y2", `${y2}`);
      line.setAttribute("stroke", config.color);
      line.setAttribute("stroke-width", `${sw}`);
      return line;
    }
    #createDot(cx, cy) {
      const dot = document.createElementNS(config.ns, "circle");
      dot.setAttribute("cx", `${cx}`);
      dot.setAttribute("cy", `${cy}`);
      const r = Math.floor(config.thick * 1.5);
      dot.setAttribute("r", `${r}`);
      dot.setAttribute("fill", config.color);
      return dot;
    }
  };

  // src/igo/board/coordinates.ts
  var Coordinates = class {
    dom;
    #aiu = "\u3042\u3044\u3046\u3048\u304A\u304B\u304D\u304F\u3051\u3053\u3055\u3057\u3059\u305B\u305D\u305F\u3061\u3064\u3066".split("");
    #iroha = "\u30A4\u30ED\u30CF\u30CB\u30DB\u30D8\u30C8\u30C1\u30EA\u30CC\u30EB\u30F2\u30EF\u30AB\u30E8\u30BF\u30EC\u30BD\u30C4".split("");
    #nums = Array.from({ length: 19 }, (_, i) => `${i + 1}`);
    #verticalChars;
    #holizontalChars;
    constructor(positions) {
      const dom = document.createElementNS(config.ns, "g");
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
        const x = -Math.floor(config.interval / 2);
        const base_line = config.radius * 0.6;
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
        const base_line = config.radius * 0.6;
        const y = config.size * config.interval + Math.floor(config.interval / 2) + base_line;
        text.setAttribute("x", `${pos}`);
        text.setAttribute("y", `${y}`);
        return text;
      };
      const arr = positions.map(createHChar);
      return arr;
    }
    #createChar() {
      const text = document.createElementNS(config.ns, "text");
      const style = `font:normal ${config.text_size}px sans-serif;`;
      text.setAttribute("style", style);
      text.setAttribute("fill", config.color);
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

  // src/igo/board/stone.ts
  var Stone = class {
    #color = 0;
    #character;
    g;
    #circle;
    #text;
    constructor(row, col, color, character = "") {
      this.g = document.createElementNS(config.ns, "g");
      this.#circle = this.#createCircle(row, col);
      this.g.appendChild(this.#circle);
      this.#text = this.#createText(row, col);
      this.g.appendChild(this.#text);
      this.color = color;
      this.#character = character;
      this.#render();
    }
    set color(color) {
      const color_string = `${color}`;
      switch (color_string) {
        case "1":
          this.#color = 1;
          break;
        case "2":
          this.#color = 2;
          break;
        default:
          this.#color = 0;
      }
    }
    onChange(color, character) {
      const same_color = color === `${this.#color}`;
      const same_char = character === this.#character;
      if (same_color && same_char) {
        this.#color = 0;
        this.#character = "";
      } else {
        this.color = color;
        this.#character = character;
      }
      this.#render();
    }
    #createCircle(row, col) {
      const circle = document.createElementNS(config.ns, "circle");
      circle.setAttribute("cx", `${col}`);
      circle.setAttribute("cy", `${row}`);
      circle.setAttribute("r", `${config.radius}`);
      circle.setAttribute("fill", "transparent");
      circle.setAttribute("stroke", "transparent");
      circle.setAttribute("stroke-width", `${config.thick}`);
      return circle;
    }
    #createText(row, col) {
      const text = document.createElementNS(config.ns, "text");
      const text_size = config.text_size;
      const font_style = `font:normal ${text_size}px sans-serif`;
      text.setAttribute("style", font_style);
      text.setAttribute("x", `${col}`);
      const base_line = config.radius * 0.6;
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
      const line_color = config.color;
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

  // src/igo/board/stones.ts
  var Stones = class {
    #positions;
    stones;
    dom;
    data;
    constructor(positions) {
      this.#positions = positions;
      this.stones = this.#createStones(positions);
      const dom = document.createElementNS(config.ns, "g");
      if (!(dom instanceof SVGGElement)) {
        throw new Error("stones error");
      }
      this.dom = dom;
      this.stones.forEach((row) => {
        row.forEach((stone) => {
          this.dom.appendChild(stone.g);
        });
      });
      this.data = [[[0, "a"]]];
    }
    onClick(x, y, state) {
      if (x < 0) return JSON.stringify(this.data);
      const max_height = config.size * config.interval;
      if (max_height < y) return JSON.stringify(this.data);
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
      const color = state.color.value;
      const character = state.character.value;
      this.stones[row][col].onChange(color, character);
      return JSON.stringify(this.data);
    }
    #createStones(positions) {
      return positions.map(
        (row_pos) => positions.map(
          (col_pos) => new Stone(row_pos, col_pos, 0, "")
        )
      );
    }
  };

  // src/igo/board/board.ts
  var Board = class {
    #parentViewBox = {
      min_x: 0,
      min_y: 0,
      width: config.size * config.interval,
      height: config.size * config.interval
    };
    #childViewBox = {
      min_x: 0,
      min_y: 0,
      width: config.size * config.interval,
      height: config.size * config.interval
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
      this.#coorinates = new Coordinates(this.#positions);
      this.dom.appendChild(this.#coorinates.dom);
      this.#grid = new Grid(this.#positions);
      this.#childDom.appendChild(this.#grid.dom);
      this.#stones = new Stones(this.#positions);
      this.#childDom.appendChild(this.#stones.dom);
    }
    onClick(ev, state) {
      const pt = this.#childDom.createSVGPoint();
      pt.x = ev.clientX;
      pt.y = ev.clientY;
      const { x, y } = pt.matrixTransform(this.#childDom.getScreenCTM()?.inverse());
      return this.#stones.onClick(x, y, state);
    }
    #createPositions() {
      const margin = Math.floor(config.interval / 2);
      const func = (_, i) => margin + config.interval * i;
      const positions = Array.from({ length: config.size }, func);
      return positions;
    }
    #createDom() {
      const dom = document.createElementNS(config.ns, "svg");
      if (!(dom instanceof SVGSVGElement)) {
        throw new Error("SVG \u8981\u7D20\u306E\u4F5C\u6210\u306B\u5931\u6557\u3057\u3066\u3044\u307E\u3059\u3002");
      }
      dom.setAttribute("viewBox", this.#getViewBox(this.#parentViewBox));
      dom.classList.add("board");
      return dom;
    }
    #createChild() {
      const dom = document.createElementNS(config.ns, "svg");
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
  };

  // src/igo/controller/buttons.ts
  var Buttons = class {
    dom;
    #buttons;
    constructor(type, state) {
      this.dom = document.createElement("ul");
      this.dom.classList.add("go-form-ul");
      this.dom.appendChild(this.#createTitle(state.title));
      this.#buttons = this.#createButtons(type, state.data);
      this.#buttons[state.active].classList.add("active");
      this.#buttons.forEach((button) => {
        const li = document.createElement("li");
        li.appendChild(button);
        this.dom.appendChild(li);
      });
    }
    pushButtons(parentButtons) {
      this.#buttons.forEach((button) => {
        parentButtons.push(button);
      });
      return parentButtons;
    }
    #createTitle(title) {
      const li = document.createElement("li");
      li.textContent = title;
      return li;
    }
    #createButtons(type, data) {
      return data.map((dat) => {
        const button = document.createElement("button");
        button.dataset.gostateType = type;
        button.dataset.gostateValue = dat.value;
        button.textContent = dat.text;
        return button;
      });
    }
  };

  // src/igo/controller/ranges.ts
  var Ranges = class {
    dom;
    #ranges;
    constructor(state) {
      this.#ranges = [];
      this.dom = document.createElement("div");
      this.dom.classList.add("go-form-range");
      const label = document.createElement("label");
      const title = document.createElement("span");
      title.textContent = state.title;
      label.appendChild(title);
      const input = document.createElement("input");
      input.type = "range";
      input.dataset.gostateType = "range";
      input.dataset.gostateDir = state.direction;
      input.value = state.value;
      input.min = state.min;
      input.max = state.max;
      label.appendChild(input);
      const span = document.createElement("span");
      span.textContent = state.value;
      label.appendChild(span);
      this.dom.appendChild(label);
      this.#ranges.push({
        input,
        span
      });
    }
    pushRanges(parentRanges) {
      this.#ranges.forEach((range) => {
        parentRanges.push(range);
      });
      return parentRanges;
    }
  };

  // src/igo/controller/controller.ts
  var Controller = class {
    buttons;
    ranges;
    dom;
    constructor(state) {
      this.buttons = [];
      const color_buttons = new Buttons("color", state.color);
      this.buttons = color_buttons.pushButtons(this.buttons);
      const character_buttons = new Buttons("character", state.character);
      this.buttons = character_buttons.pushButtons(this.buttons);
      const hollizontal_buttons = new Buttons("holizontal", state.holizontal);
      this.buttons = hollizontal_buttons.pushButtons(this.buttons);
      const vertical_buttons = new Buttons("vertical", state.vertical);
      this.buttons = vertical_buttons.pushButtons(this.buttons);
      this.ranges = [];
      const width_range = new Ranges(state.width);
      this.ranges = width_range.pushRanges(this.ranges);
      const height_range = new Ranges(state.height);
      this.ranges = height_range.pushRanges(this.ranges);
      this.dom = document.createElement("div");
      this.dom.appendChild(color_buttons.dom);
      this.dom.appendChild(character_buttons.dom);
      this.dom.appendChild(width_range.dom);
      this.dom.appendChild(height_range.dom);
      this.dom.appendChild(hollizontal_buttons.dom);
      this.dom.appendChild(vertical_buttons.dom);
    }
    onClick(state) {
      this.buttons.forEach((button) => {
        const isSameType = button.dataset.gostateType === state.type;
        const isSameValue = button.dataset.gostateValue === state.newVal;
        if (isSameType) {
          if (isSameValue) {
            button.classList.add("active");
          } else {
            button.classList.remove("active");
          }
        }
      });
    }
  };

  // src/igo/state/buttons.ts
  var ButtonState = class {
    _title = "";
    _active = 0;
    _data = [];
    get title() {
      return this._title;
    }
    get active() {
      return this._active;
    }
    get value() {
      if (this._active < this._data.length) {
        return this._data[this._active].value;
      } else {
        return this._data[0].value;
      }
    }
    set value(value) {
      const idx = this._data.findIndex((dat) => dat.value === value);
      this._active = idx === -1 ? 0 : idx;
    }
    get data() {
      return this._data;
    }
  };

  // src/igo/state/color.ts
  var ColorState = class extends ButtonState {
    constructor() {
      super();
      this._title = "\u8272\uFF1A";
      this._active = 0;
      this._data = [
        { value: "0", text: "\u900F\u660E" },
        { value: "1", text: "\u9ED2" },
        { value: "2", text: "\u767D" }
      ];
    }
    get value() {
      if (this._active < this._data.length) {
        return this._data[this._active].value;
      } else {
        return this._data[0].value;
      }
    }
    set value(value) {
      const idx = this._data.findIndex((dat) => dat.value === value);
      this._active = idx === -1 ? 0 : idx;
    }
  };

  // src/igo/state/character.ts
  var CharacterState = class extends ButtonState {
    constructor() {
      super();
      this._title = "\u6587\u5B57\uFF1A";
      this._active = 0;
      this._data = [
        { value: "", text: "\uFF08\u7121\u3057\uFF09" },
        { value: "A", text: "A" },
        { value: "B", text: "B" },
        { value: "C", text: "C" },
        { value: "D", text: "D" },
        { value: "E", text: "E" },
        { value: "\u25B3", text: "\u25B3" },
        { value: "1", text: "1" },
        { value: "2", text: "2" },
        { value: "3", text: "3" },
        { value: "4", text: "4" }
      ];
    }
  };

  // src/igo/state/coordinates.ts
  var CoordinatesState = class extends ButtonState {
    constructor() {
      super();
      this._active = 0, this._data = [
        { value: "null", text: "\uFF08\u7121\u3057\uFF09" },
        { value: "nums", text: "1,2,3..." },
        { value: "aiu", text: "\u3042,\u3044,\u3046..." },
        { value: "iroha", text: "\u30A4,\u30ED,\u30CF..." }
      ];
    }
  };
  var HCoordinatesState = class extends CoordinatesState {
    constructor() {
      super();
      this._title = "\u5EA7\u6A19\uFF08\u7E26\uFF09\uFF1A";
    }
  };
  var VCoordinatesState = class extends CoordinatesState {
    constructor() {
      super();
      this._title = "\u5EA7\u6A19\uFF08\u6A2A\uFF09\uFF1A";
    }
  };

  // src/igo/state/ranges.ts
  var RangesState = class {
    _title = "";
    _value = 19;
    _min = 1;
    _max = 19;
    _direction = "";
    get title() {
      return this._title;
    }
    get direction() {
      return this._direction;
    }
    get value() {
      return `${this._value}`;
    }
    set value(value) {
      const num = Number(value);
      if (this._min <= num && num <= this._max) {
        this._value = num;
      }
    }
    get min() {
      return `${this._min}`;
    }
    get max() {
      return `${this._max}`;
    }
  };
  var WidthState = class extends RangesState {
    constructor() {
      super();
      this._title = "\u6A2A\u5E45";
      this._direction = "x";
    }
  };
  var HeightState = class extends RangesState {
    constructor() {
      super();
      this._title = "\u7E26\u5E45";
      this._direction = "y";
    }
  };

  // src/igo/state/state.ts
  var State = class {
    color = new ColorState();
    character = new CharacterState();
    vertical = new VCoordinatesState();
    holizontal = new HCoordinatesState();
    width = new WidthState();
    height = new HeightState();
    #type = null;
    #oldVal = null;
    #newVal = null;
    reset() {
      this.#type = null;
      this.#oldVal = null;
      this.#newVal = null;
    }
    get isChange() {
      return this.#newVal !== null;
    }
    updateStart() {
      this.reset();
    }
    updateEnd() {
      this.reset();
    }
    get type() {
      return this.#type;
    }
    get oldVal() {
      return this.#oldVal;
    }
    get newVal() {
      return this.#newVal;
    }
    onClick(target) {
      const type = target.dataset.gostateType;
      const value = target.dataset.gostateValue;
      if (typeof value === "undefined") return;
      switch (type) {
        case "color":
        case "character":
        case "vertical":
        case "holizontal":
          this.#type = type;
          this.#oldVal = this[type].value;
          this[type].value = value;
          if (this[type].value !== this.#oldVal) {
            this.#newVal = this[type].value;
          }
          break;
      }
    }
    onChange(target) {
      const type = target.dataset.gostateType;
      const dir = target.dataset.gostateDir;
      const value = target.value;
      if (type === "range") {
        if (dir === "x") {
          this.#type = "width";
          this.#oldVal = this.width.value;
          this.width.value = value;
          if (this.width.value !== this.#oldVal) {
            this.#newVal = this.width.value;
          }
        } else if (dir === "y") {
          this.#type = "height";
          this.#oldVal = this.height.value;
          this.height.value = value;
          if (this.height.value !== this.#oldVal) {
            this.#newVal = this.height.value;
          }
        }
      }
    }
  };

  // src/igo/board-controller.ts
  var BoardController = class extends HTMLElement {
    static observedAttributes = [
      "data-gostate-data"
    ];
    constructor() {
      super();
      const state = new State();
      const board = new Board();
      const controller = new Controller(state);
      this.appendChild(controller.dom);
      this.appendChild(board.dom);
      board.dom.addEventListener("click", (ev) => {
        this.dataset.gostateData = board.onClick(ev, state);
      }, false);
      controller.buttons.forEach((button) => {
        button.addEventListener("click", (ev) => {
          const target = ev.target;
          if (!(target instanceof HTMLButtonElement)) return;
          state.updateStart();
          state.onClick(target);
          if (state.isChange) {
            controller.onClick(state);
          }
          state.updateEnd();
        }, false);
      });
      controller.ranges.forEach((range) => {
        range.input.addEventListener("change", (ev) => {
          const target = ev.target;
          if (!(target instanceof HTMLInputElement)) return;
          state.updateStart();
          state.onChange(target);
          if (state.isChange) {
            range.span.textContent = state.newVal;
          }
          state.updateEnd();
        }, false);
      });
    }
    // document に接続時実行
    connectedCallback() {
    }
    // 属性変更時実行
    attributeChangedCallback(attr, oldVal, newVal) {
      if (attr === "data-gostate-data") {
        console.log(oldVal, newVal);
      }
    }
  };

  // src/igo/index.ts
  customElements.define("board-controller", BoardController);
})();
