"use strict";
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

  // src/igo/constants.ts
  var COORDINATES_DATA = Object.freeze(
    ["null", "nums", "aiu", "iroha"]
  );

  // src/igo/state/holders.ts
  var isCoordinatesState = (str) => COORDINATES_DATA.includes(str);
  var StateHolder = class {
  };
  var Color = class extends StateHolder {
    _state = 0;
    get state() {
      return `${this._state}`;
    }
    set state(input) {
      const str = `${input}`;
      if (str === "1" || str === "2") {
        this._state = Number(str);
      } else {
        this._state = 0;
      }
    }
  };
  var Character = class extends StateHolder {
    _state = "";
    get state() {
      return this._state;
    }
    set state(input) {
      const str = `${input}`;
      this._state = str.length > 0 ? str[0] : "";
    }
  };
  var Coordinates2 = class extends StateHolder {
    _state = "null";
    get state() {
      return this._state;
    }
    set state(input) {
      const str = `${input}`;
      this._state = isCoordinatesState(str) ? str : COORDINATES_DATA[0];
    }
  };
  var Length = class extends StateHolder {
    _state = 19;
    MAX = 19;
    MIN = 1;
    get state() {
      return `${this._state}`;
    }
    set state(input) {
      const num = Number(input);
      if (num >= this.MIN && num <= this.MAX) {
        this._state = num;
      }
    }
  };

  // src/igo/board/stone.ts
  var Stone = class {
    #color = new Color();
    #character = new Character();
    #g;
    #circle;
    #text;
    #patternMap = Object.freeze({
      empty: {
        circle_fill: "transparent",
        circle_stroke: "transparent",
        text_fill: "transparent"
      },
      onlyChar: {
        circle_fill: "#fff",
        circle_stroke: "#fff",
        text_fill: config.color
      },
      black: {
        circle_fill: config.color,
        circle_stroke: config.color,
        text_fill: "#fff"
      },
      white: {
        circle_fill: "#fff",
        circle_stroke: config.color,
        text_fill: config.color
      }
    });
    constructor(row, col, color, character) {
      this.#g = document.createElementNS(config.ns, "g");
      this.#circle = this.#createCircle(row, col);
      this.#g.appendChild(this.#circle);
      this.#text = this.#createText(row, col);
      this.#g.appendChild(this.#text);
      this.#color.state = color;
      this.#character.state = character;
      this.#render();
    }
    get g() {
      return this.#g;
    }
    onChange(color, character) {
      const same_color = color === `${this.#color.state}`;
      const same_char = character === this.#character.state;
      const is_same = same_color && same_char;
      this.#color.state = is_same ? 0 : color;
      this.#character.state = is_same ? "" : character;
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
      const color = this.#color.state;
      const character = this.#character.state;
      let colorPattern = "empty";
      if (color === "0" && character === "") {
        colorPattern = "empty";
      } else if (color === "0") {
        colorPattern = "onlyChar";
      } else if (color === "1") {
        colorPattern = "black";
      } else if (color === "2") {
        colorPattern = "white";
      }
      const {
        circle_fill,
        circle_stroke,
        text_fill
      } = this.#patternMap[colorPattern];
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
      this.data = this.#createBlankData();
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
    #createBlankData() {
      return Array.from(
        { length: config.size },
        () => Array.from({ length: config.size }, () => [0, ""])
      );
    }
  };

  // src/igo/board/svg.ts
  var Svg = class {
    dom;
    #viewBox = {
      min_x: 0,
      min_y: 0,
      width: config.size * config.interval,
      height: config.size * config.interval
    };
    constructor(...classNames) {
      this.dom = document.createElementNS(config.ns, "svg");
      this.#updateViewBox();
      this.dom.classList.add(...classNames);
    }
    getClickedXY(clientX, clientY) {
      const pt = this.dom.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const { x, y } = pt.matrixTransform(this.dom.getScreenCTM()?.inverse());
      return [x, y];
    }
    set min_x(num) {
      this.#viewBox.min_x = num;
      this.#updateViewBox();
    }
    set min_y(num) {
      this.#viewBox.min_y = num;
      this.#updateViewBox();
    }
    set width(num) {
      this.#viewBox.width = num;
      this.#updateViewBox();
    }
    set height(num) {
      this.#viewBox.height = num;
      this.#updateViewBox();
    }
    #updateViewBox() {
      const {
        min_x,
        min_y,
        width,
        height
      } = this.#viewBox;
      const viewBox = [min_x, min_y, width, height].join(" ");
      this.dom.setAttribute("viewBox", viewBox);
    }
  };

  // src/igo/board/board.ts
  var Board = class {
    #positions;
    #parent;
    #child;
    #grid;
    #coorinates;
    #stones;
    constructor() {
      this.#positions = this.#createPositions();
      this.#parent = new Svg("board");
      this.#child = new Svg();
      this.#parent.dom.appendChild(this.#child.dom);
      this.#coorinates = new Coordinates(this.#positions);
      this.#parent.dom.appendChild(this.#coorinates.dom);
      this.#grid = new Grid(this.#positions);
      this.#child.dom.appendChild(this.#grid.dom);
      this.#stones = new Stones(this.#positions);
      this.#child.dom.appendChild(this.#stones.dom);
    }
    get dom() {
      return this.#parent.dom;
    }
    onClickBoard(ev, state) {
      const [x, y] = this.#child.getClickedXY(ev.clientX, ev.clientY);
      return this.#stones.onClick(x, y, state);
    }
    onChangeViewBox(state) {
      if (!state.isChange) return;
      if (state.type === "width" || state.type === "height") {
        this.#onChangeBoardSize(state, state.type);
      } else if (state.type === "vertical" || state.type === "horizontal") {
        this.#onChangeCoordinates(state, state.type);
      }
    }
    #onChangeBoardSize(state, type) {
      const idx = Number(state.newVal);
      if (idx <= 0 || config.size < idx) return;
      const length = idx * config.interval;
      const oppositMap = {
        width: "vertical",
        height: "horizontal"
      };
      const oppositType = oppositMap[type];
      const hasCoord = state.fields[oppositType].state !== "null";
      this.#child[type] = length;
      this.#parent[type] = hasCoord ? length + config.interval : length;
    }
    #onChangeCoordinates(state, type) {
      const newVal = state.newVal;
      const hasCoord = newVal !== "null";
      let min = hasCoord ? -config.interval : 0;
      let length = hasCoord ? config.interval : 0;
      const oppositMap = {
        vertical: {
          opMin: "min_x",
          opLength: "width"
        },
        horizontal: {
          opMin: "min_y",
          opLength: "height"
        }
      };
      const { opMin, opLength } = oppositMap[type];
      this.#parent[opMin] = min;
      this.#parent[opLength] = length + this.#child[opLength];
    }
    #createPositions() {
      const margin = Math.floor(config.interval / 2);
      const func = (_, i) => margin + config.interval * i;
      const positions = Array.from({ length: config.size }, func);
      return positions;
    }
  };

  // src/igo/controller/buttons.ts
  var Buttons = class {
    dom;
    #buttons;
    constructor(type, data) {
      this.dom = document.createElement("ul");
      this.dom.classList.add("go-form-ul");
      this.dom.appendChild(this.#createTitle(data.title));
      this.#buttons = this.#createButtons(type, data);
      this.#buttons[data.active].classList.add("active");
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
      return data.data.map((dat) => {
        const button = document.createElement("button");
        button.dataset.gostateType = type;
        button.dataset.gostateValue = `${dat.value}`;
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

  // src/igo/controller/init_data.ts
  var init_data = Object.freeze({
    color: {
      title: "",
      active: 0,
      data: [
        { value: 0, text: "\u900F\u660E" },
        { value: 1, text: "\u9ED2" },
        { value: 2, text: "\u767D" }
      ]
    },
    character: {
      title: "",
      active: 0,
      data: [
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
      ]
    },
    length: {
      title: "",
      active: 0,
      data: []
    },
    coordinates: {
      title: "",
      active: 0,
      data: []
    }
  });

  // src/igo/controller/controller.ts
  var Controller = class {
    buttons;
    ranges;
    dom;
    constructor() {
      this.buttons = [];
      const color_buttons = new Buttons("color", init_data.color);
      this.buttons = color_buttons.pushButtons(this.buttons);
      const character_buttons = new Buttons("character", init_data.color);
      this.buttons = character_buttons.pushButtons(this.buttons);
      const hollizontal_buttons = new Buttons("holizontal", init_data.color);
      this.buttons = hollizontal_buttons.pushButtons(this.buttons);
      const vertical_buttons = new Buttons("vertical", init_data.color);
      this.buttons = vertical_buttons.pushButtons(this.buttons);
      this.ranges = [];
      const width_range = new Ranges(init_data.color);
      this.ranges = width_range.pushRanges(this.ranges);
      const height_range = new Ranges(init_data.color);
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

  // src/igo/state/state.ts
  var State = class {
    fields = {
      color: new Color(),
      character: new Character(),
      vertical: new Coordinates2(),
      horizontal: new Coordinates2(),
      width: new Length(),
      height: new Length()
    };
    // 状態変更の記録用
    #type = null;
    #oldVal = null;
    #newVal = null;
    get type() {
      return this.#type;
    }
    get oldVal() {
      return this.#oldVal;
    }
    get newVal() {
      return this.#newVal;
    }
    get isChange() {
      return this.#newVal !== null;
    }
    reset() {
      this.#type = null;
      this.#oldVal = null;
      this.#newVal = null;
    }
    updateEnd() {
      this.reset();
    }
    updateStart(type, value) {
      this.reset();
      if (this.#isValidKey(type)) {
        const field = this.fields[type];
        const currentVal = field.state;
        if (currentVal !== value) {
          this.#type = type;
          this.#oldVal = currentVal;
          field.state = value;
          this.#newVal = field.state;
        }
      }
    }
    // 型ガードをメソッドとして分離
    #isValidKey(key) {
      return key in this.fields;
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
        if (oldVal === newVal) return;
      }
    }
  };

  // src/igo/index.ts
  customElements.define("board-controller", BoardController);
  document.addEventListener("DOMContentLoaded", () => {
    displayShowHide();
    saveLoad();
  }, false);
  function displayShowHide() {
    const zoomBase = { inRange: true, size: "small" };
    const state = {
      perPageLimit: 6,
      zoomIdx: -1,
      zooms: Array.from({ length: 6 }, () => ({ ...zoomBase }))
    };
    const dom = {
      perPageBtns: [],
      overviewZoomBtns: [],
      bCons: []
    };
    dom.perPageBtns = [...document.querySelectorAll("#display-per-page button")];
    dom.overviewZoomBtns = [...document.querySelectorAll("#display-overview-zoom button")];
    dom.bCons = [...document.querySelectorAll("board-controller")];
    dom.perPageBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        toggleActiveClass(btn, dom.perPageBtns);
        const input = Number(btn.dataset.godisplayPerPage ?? 6);
        state.perPageLimit = input === 4 ? 4 : 6;
        update(dom, state);
      });
    });
    dom.overviewZoomBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        toggleActiveClass(btn, dom.overviewZoomBtns);
        const input = Number(btn.dataset.godisplayIdx ?? -1);
        state.zoomIdx = -1 < input && input <= state.perPageLimit ? input : -1;
        update(dom, state);
      });
    });
  }
  function update(dom, state) {
    const isOverview = state.zoomIdx === -1;
    state.zooms.forEach((zoom, i) => {
      zoom.inRange = i < state.perPageLimit;
      const isZoom = state.zoomIdx === i;
      if (isOverview) {
        zoom.size = "small";
      } else if (isZoom) {
        zoom.size = "large";
      } else {
        zoom.size = "none";
      }
    });
    dom.overviewZoomBtns.forEach((btn, i) => {
      if (i > 0) {
        btn.classList.toggle("hidden", !state.zooms[i - 1].inRange);
      }
    });
    dom.bCons.forEach((bcon, i) => {
      const inRange = state.zooms[i].inRange;
      bcon.dataset.display = inRange ? state.zooms[i].size : "none";
    });
  }
  function toggleActiveClass(btn, btns) {
    btns.forEach((b) => {
      const shouldActive = b === btn;
      b.classList.toggle("active", shouldActive);
    });
  }
  function saveLoad() {
    const saveBtn = document.querySelector("button#save");
    const loadInput = document.querySelector("input#load");
    loadInput.addEventListener("change", (ev) => {
      console.log(ev);
    });
  }
})();
