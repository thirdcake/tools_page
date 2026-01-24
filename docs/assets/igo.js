"use strict";
(() => {
  // src/igo/render/header/buttons.ts
  function createColorButtons() {
    const data = {
      type: "color",
      title: "\u7881\u77F3\u306E\u8272\uFF1A",
      init: [
        { value: "0", text: "\u900F\u660E" },
        { value: "1", text: "\u9ED2" },
        { value: "2", text: "\u767D" }
      ]
    };
    return createButtons(data);
  }
  function createCharacterButtons() {
    const data = {
      type: "character",
      title: "\u6587\u5B57\uFF1A",
      init: [
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
        { value: "4", text: "4" },
        { value: "5", text: "5" }
      ]
    };
    return createButtons(data);
  }
  function createVerticalButtons() {
    const data = {
      type: "vertical",
      title: "\u7E26\u5EA7\u6A19\uFF1A",
      init: [
        { value: "null", text: "\uFF08\u7121\u3057\uFF09" },
        { value: "nums", text: "1,2,3,..." },
        { value: "aiu", text: "\u3042,\u3044,\u3046,..." },
        { value: "iroha", text: "\u30A4,\u30ED,\u30CF,..." }
      ]
    };
    return createButtons(data);
  }
  function createHorizontalButtons() {
    const data = {
      type: "horizontal",
      title: "\u7E26\u5EA7\u6A19\uFF1A",
      init: [
        { value: "null", text: "\uFF08\u7121\u3057\uFF09" },
        { value: "nums", text: "1,2,3,..." },
        { value: "aiu", text: "\u3042,\u3044,\u3046,..." },
        { value: "iroha", text: "\u30A4,\u30ED,\u30CF,..." }
      ]
    };
    return createButtons(data);
  }
  function createButtons(data) {
    const dom = document.createElement("ul");
    dom.classList.add("go-form-ul");
    const li = document.createElement("li");
    li.textContent = data.title;
    dom.appendChild(li);
    const buttons = data.init.map((dat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.value = dat.value;
      btn.textContent = dat.text;
      return btn;
    });
    buttons[0].classList.add("active");
    buttons.forEach((btn) => {
      const li2 = document.createElement("li");
      li2.appendChild(btn);
      dom.appendChild(li2);
    });
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((button) => {
          button.classList.toggle("active", button === btn);
        });
        const event = new CustomEvent("change-state", {
          bubbles: true,
          detail: {
            type: data.type,
            value: btn.value
          }
        });
        btn.dispatchEvent(event);
      }, false);
    });
    return dom;
  }

  // src/igo/render/header/ranges.ts
  function createRange(type, title) {
    const data = {
      type,
      title,
      value: 19,
      min: 5,
      max: 19
    };
    const div = document.createElement("div");
    const titleSpan = document.createElement("span");
    titleSpan.textContent = title;
    const input = document.createElement("input");
    input.type = "range";
    input.value = `${data.value}`;
    input.min = `${data.min}`;
    input.max = `${data.max}`;
    const valueSpan = document.createElement("span");
    valueSpan.textContent = input.value;
    div.appendChild(titleSpan);
    div.appendChild(input);
    div.appendChild(valueSpan);
    input.addEventListener("change", () => {
      valueSpan.textContent = input.value;
      const event = new CustomEvent("change-state", {
        bubbles: true,
        detail: {
          type,
          value: input.value
        }
      });
      input.dispatchEvent(event);
    });
    return div;
  }

  // src/igo/render/header.ts
  var Header = class {
    dom = document.createElement("div");
    #state;
    constructor(state) {
      this.#state = state;
      this.dom.appendChild(createColorButtons());
      this.dom.appendChild(createCharacterButtons());
      this.dom.appendChild(createRange("width", "\u6A2A\u5E45\uFF1A"));
      this.dom.appendChild(createRange("height", "\u9AD8\u3055\uFF1A"));
      this.dom.appendChild(createVerticalButtons());
      this.dom.appendChild(createHorizontalButtons());
    }
    render(state) {
      if (this.#state === state) return;
      if (state.color !== this.#state.color) {
      }
      if (state.character !== this.#state.character) {
      }
      this.#state = state;
    }
  };

  // src/igo/render/body/config.ts
  var config = Object.freeze({
    ns: "http://www.w3.org/2000/svg",
    color: "#333",
    thin: 2,
    thick: 4,
    size: 19,
    interval: 48,
    text_size: 36,
    radius: 20,
    positions: Array.from({ length: 19 }, (_, i) => Math.floor(48 / 2) + i * 48)
  });

  // src/igo/render/body/grid.ts
  function createGrid() {
    let dom = document.createElementNS(config.ns, "g");
    dom = drawLines(dom);
    dom = drawDots(dom);
    return dom;
  }
  function drawLines(dom) {
    const start = Math.floor(config.interval / 2) - Math.floor(config.thick / 2);
    const end = config.interval * config.size - start;
    return config.positions.reduce((group, pos, i) => {
      const isFirstOrLast = i === 0 || i === config.positions.length - 1;
      const sw = isFirstOrLast ? config.thick : config.thin;
      group.appendChild(createLine(start, end, pos, pos, sw));
      group.appendChild(createLine(pos, pos, start, end, sw));
      return group;
    }, dom);
  }
  function drawDots(dom) {
    const isDotPos = (_, i) => i === 3 || i === 9 || i === 15;
    const filterPositions = config.positions.filter(isDotPos);
    filterPositions.forEach((pos_r) => {
      filterPositions.forEach((pos_c) => {
        dom.appendChild(createDot(pos_r, pos_c));
      });
    });
    return dom;
  }
  function createLine(x1, x2, y1, y2, sw) {
    const line = document.createElementNS(config.ns, "line");
    line.setAttribute("x1", `${x1}`);
    line.setAttribute("x2", `${x2}`);
    line.setAttribute("y1", `${y1}`);
    line.setAttribute("y2", `${y2}`);
    line.setAttribute("stroke", config.color);
    line.setAttribute("stroke-width", `${sw}`);
    return line;
  }
  function createDot(cx, cy) {
    const dot = document.createElementNS(config.ns, "circle");
    dot.setAttribute("cx", `${cx}`);
    dot.setAttribute("cy", `${cy}`);
    const r = Math.floor(config.thick * 1.5);
    dot.setAttribute("r", `${r}`);
    dot.setAttribute("fill", config.color);
    return dot;
  }

  // src/igo/render/body/viewbox.ts
  function innerViewBox(state) {
    const max = config.size * config.interval;
    const minx = 0;
    const width = state.width * config.interval;
    const height = state.height * config.interval;
    const miny = max - height;
    return [minx, miny, width, height].join(" ");
  }
  function outerViewBox(state) {
    const max = config.size * config.interval;
    let width = state.width * config.interval;
    let height = state.height * config.interval;
    let minx = 0;
    let miny = max - height;
    if (state.vertical !== "null") {
      minx -= config.interval;
      width += config.interval;
    }
    if (state.horizontal !== "null") {
      height += config.interval;
    }
    return [minx, miny, width, height].join(" ");
  }

  // src/igo/render/body/stone.ts
  var Stone = class {
    dom = document.createElementNS(config.ns, "g");
    #data = ["0", ""];
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
      this.#circle = this.#createCircle(row, col);
      this.dom.appendChild(this.#circle);
      this.#text = this.#createText(row, col);
      this.dom.appendChild(this.#text);
      this.#data = [color, character];
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
    render(color, character) {
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

  // src/igo/render/body/stones.ts
  var Stones = class {
    dom = document.createElementNS(config.ns, "g");
    data;
    stones;
    constructor(state) {
      this.data = state.data;
      this.stones = config.positions.map(
        (row) => config.positions.map(
          (col) => new Stone(row, col, "0", "")
        )
      );
    }
    /*
    onClick(x:number, y:number, state:State):string {
        
        if(x < 0) return JSON.stringify(this.data);
        const max_height = config.size * config.interval;
        if(max_height < y) return JSON.stringify(this.data);
        const positions = this.#positions;
        const init_x = {idx: 0, dist: Math.abs(positions[0] - x), now: x};
        const init_y = {idx: 0, dist: Math.abs(positions[0] - y), now: y};
        const minDist = (obj:{idx:number, dist:number, now:number}, pos:number, i:number) => {
            if(Math.abs(pos - obj.now) < obj.dist) {
                obj.idx = i;
                obj.dist = Math.abs(pos - obj.now);
            }
            return obj;
        }
        const col = positions.reduce(minDist, init_x).idx;
        const row = positions.reduce(minDist, init_y).idx;
        const color = this.#state.color.input.init[this.#state.color.input.active].value as ColorData;
        const character = this.#state.character.input.init[this.#state.character.input.active].value;
        this.stones[row][col].onChange(color, character);
        return JSON.stringify(this.data);
    }
    */
    render(state) {
      if (this.data === state.data) return;
      this.data.forEach((row, ridx) => {
        if (row !== state.data[ridx]) {
          row.forEach((cell, cidx) => {
            if (cell !== state.data[ridx][cidx]) {
              this.stones[ridx][cidx].render(cell[0], cell[1]);
            }
          });
        }
      });
    }
  };

  // src/igo/render/body/board.ts
  var Board = class {
    dom = document.createElementNS(config.ns, "svg");
    stones;
    constructor(state) {
      this.dom.setAttribute("viewBox", innerViewBox(state));
      this.dom.appendChild(createGrid());
      this.stones = new Stones(state);
      this.dom.addEventListener("click", (ev) => {
        const pt = this.dom.createSVGPoint();
        pt.x = ev.clientX;
        pt.y = ev.clientY;
        const { x, y } = pt.matrixTransform(this.dom.getScreenCTM()?.inverse());
        const event = new CustomEvent("click-board", {
          bubbles: true,
          detail: [x, y]
        });
        this.dom.dispatchEvent(event);
      }, false);
    }
    render(state) {
      this.dom.setAttribute("viewBox", innerViewBox(state));
      this.stones.render(state);
    }
  };

  // src/igo/render/body/coordinates.ts
  var Coordinates = class {
    dom = document.createElementNS(config.ns, "g");
    init_data = {
      aiu: "\u3042\u3044\u3046\u3048\u304A\u304B\u304D\u304F\u3051\u3053\u3055\u3057\u3059\u305B\u305D\u305F\u3061\u3064\u3066".split(""),
      iroha: "\u30A4\u30ED\u30CF\u30CB\u30DB\u30D8\u30C8\u30C1\u30EA\u30CC\u30EB\u30F2\u30EF\u30AB\u30E8\u30BF\u30EC\u30BD\u30C4".split(""),
      nums: Array.from({ length: 19 }, (_, i) => `${i + 1}`)
    };
    groups = {
      aiu: document.createElementNS(config.ns, "g"),
      iroha: document.createElementNS(config.ns, "g"),
      nums: document.createElementNS(config.ns, "g")
    };
    init(type) {
      this.groups[type] = this.setChars(
        this.groups[type],
        this.init_data[type],
        this.positions
      );
      this.dom.appendChild(this.groups[type]);
    }
    switchCoord(type) {
      for (const [gtype, element] of Object.entries(this.groups)) {
        let opacity = "0";
        let pointer = "";
        if (gtype === type) {
          opacity = "1";
          pointer = "none";
        }
        element.style.opacity = opacity;
      }
    }
    setChars(group, chars, positions) {
      return chars.reduce((gro, char, idx) => {
        const [x, y] = positions[idx];
        const text = document.createElementNS(
          config.ns,
          "text"
        );
        text.setAttribute("x", `${x}`);
        text.setAttribute("y", `${y}`);
        const style = `font:normal ${config.text_size}px sans-serif;`;
        text.setAttribute("style", style);
        text.setAttribute("fill", "currentColor");
        text.setAttribute("text-anchor", "middle");
        text.textContent = char;
        gro.appendChild(text);
        return gro;
      }, group);
    }
  };
  var Vertical = class extends Coordinates {
    vertical;
    constructor(state) {
      super();
      this.vertical = state.vertical;
      this.init("aiu");
      this.init("iroha");
      this.init("nums");
    }
    get positions() {
      return config.positions.toReversed().map((row) => {
        const x = 0 - Math.floor(config.interval / 2);
        const y = row + config.radius * 0.6;
        return [x, y];
      });
    }
    render(state) {
      if (this.vertical === state.vertical) return;
      this.vertical = state.vertical;
      this.switchCoord(this.vertical);
    }
  };
  var Horizontal = class extends Coordinates {
    horizontal;
    constructor(state) {
      super();
      this.horizontal = state.horizontal;
      this.init("aiu");
      this.init("iroha");
      this.init("nums");
    }
    get positions() {
      return config.positions.map((col) => {
        const y = (config.size + 1) * config.interval - config.radius * 0.6;
        const x = col;
        return [x, y];
      });
    }
    render(state) {
      if (this.horizontal === state.horizontal) return;
      this.horizontal = state.horizontal;
      this.switchCoord(this.horizontal);
    }
  };

  // src/igo/render/body.ts
  var Body = class {
    dom = document.createElementNS(config.ns, "svg");
    #state;
    board;
    vertical;
    horizontal;
    constructor(state) {
      this.#state = state;
      this.dom.setAttribute("viewBox", outerViewBox(state));
      this.board = new Board(state);
      this.dom.appendChild(this.board.dom);
      this.vertical = new Vertical(state);
      this.dom.appendChild(this.vertical.dom);
      this.horizontal = new Horizontal(state);
      this.dom.appendChild(this.horizontal.dom);
    }
    render(state) {
      if (state === this.#state) return;
      if (this.#state.data !== state.data) {
        this.board.render(state);
      }
      if (this.#state.width !== state.width || this.#state.height !== state.height || this.#state.vertical !== state.vertical || this.#state.horizontal !== state.horizontal) {
        this.dom.setAttribute("viewBox", outerViewBox(state));
        this.vertical.render(state);
        this.horizontal.render(state);
      }
      this.#state = state;
    }
  };

  // src/igo/render/footer.ts
  var Footer = class {
    dom = document.createElement("div");
    textarea = document.createElement("textarea");
    paragraph = document.createElement("p");
    constructor(state) {
      this.textarea.placeholder = "\uFF08\u3053\u3053\u306B\u6587\u7AE0\u3092\u5165\u529B\u3067\u304D\u307E\u3059\u3002\uFF09";
      this.textarea.value = state.textarea;
      this.textarea.style.display = "none";
      this.paragraphText = state.textarea;
      this.dom.appendChild(this.textarea);
      this.dom.appendChild(this.paragraph);
      this.paragraph.addEventListener("click", () => {
        this.paragraph.style.display = "none";
        this.textarea.style.display = "block";
        this.textarea.focus();
      });
      this.textarea.addEventListener("blur", () => {
        this.paragraphText = this.textarea.value;
        this.textarea.style.display = "none";
        this.paragraph.style.display = "block";
        const event = new CustomEvent("blur-textarea", {
          bubbles: true,
          detail: this.textarea.value
        });
        this.dom.dispatchEvent(event);
      });
    }
    set paragraphText(text) {
      if (text === "") {
        this.paragraph.textContent = "\uFF08\u3053\u3053\u306B\u6587\u7AE0\u3092\u5165\u529B\u3067\u304D\u307E\u3059\u3002\uFF09";
      } else {
        this.paragraph.textContent = text;
      }
    }
    render(state) {
    }
  };

  // src/igo/update.ts
  var Update = class {
    static color(state, color) {
      if (typeof color !== "string") return state;
      if (state.color === color) return state;
      if (!["0", "1", "2"].includes(color)) return state;
      return {
        ...state,
        color
      };
    }
    static character(state, value) {
      if (typeof value !== "string") return state;
      if (state.character === value) return state;
      const character = value.length > 0 ? value[0] : "";
      return {
        ...state,
        character
      };
    }
    static width(state, range) {
      if (typeof range !== "number") return state;
      const width = 1 <= range && range <= 19 ? range : 19;
      return {
        ...state,
        width
      };
    }
    static height(state, range) {
      if (typeof range !== "number") return state;
      const height = 1 <= range && range <= 19 ? range : 19;
      return {
        ...state,
        height
      };
    }
    static vertical(state, coord) {
      if (typeof coord !== "string") return state;
      const coordArr = ["nums", "aiu", "iroha"];
      const vertical = coordArr.includes(coord) ? coord : "null";
      return {
        ...state,
        vertical
      };
    }
    static horizontal(state, coord) {
      if (typeof coord !== "string") return state;
      const coordArr = ["nums", "aiu", "iroha"];
      const horizontal = coordArr.includes(coord) ? coord : "null";
      return {
        ...state,
        horizontal
      };
    }
    static data(state, input) {
      if (!Array.isArray(input) || input.length !== 2) return state;
      const [x, y] = input;
      if (typeof x !== "number" || typeof y !== "number") return state;
      if (!Number.isInteger(x) || !Number.isInteger(y)) return state;
      if (x < 1 || 19 < x || y < 1 || 19 < y) return state;
      const [col, row] = [x - 1, y - 1];
      const oldCell = state.data[row][col];
      let newCell = [state.color, state.character];
      if (state.color === oldCell[0] && state.character === oldCell[1]) {
        newCell = ["0", ""];
      }
      const newRow = [...state.data[row]];
      newRow[col] = newCell;
      const newData = [...state.data];
      newData[row] = newRow;
      return {
        ...state,
        data: newData
      };
    }
    static textarea(state, text) {
      if (state.textarea === text) return state;
      return {
        ...state,
        textarea: text
      };
    }
  };

  // src/igo/wrapper.ts
  var Wrapper = class {
    dom = document.createElement("div");
    #state = {
      color: "0",
      character: "",
      width: 19,
      height: 19,
      vertical: "null",
      horizontal: "null",
      size: "small",
      data: Array.from({ length: 19 }, () => Array.from({ length: 19 }, () => ["0", ""])),
      textarea: ""
    };
    #header;
    #body;
    #footer;
    constructor() {
      this.#header = new Header(this.#state);
      this.#body = new Body(this.#state);
      this.#footer = new Footer(this.#state);
      this.dom.appendChild(this.#header.dom);
      this.dom.appendChild(this.#body.dom);
      this.dom.appendChild(this.#footer.dom);
      this.dom.addEventListener("change-state", (ev) => {
        const detail = ev.detail;
        switch (detail.type) {
          case "color":
            this.#state = Update.color(this.#state, detail.value);
            break;
          case "character":
            this.#state = Update.character(this.#state, detail.value);
            break;
          case "width":
            this.#state = Update.width(this.#state, detail.value);
            this.#render();
            break;
          case "height":
            this.#state = Update.height(this.#state, detail.value);
            this.#render();
            break;
          case "vertical":
            this.#state = Update.vertical(this.#state, detail.value);
            this.#render();
            break;
          case "horizontal":
            this.#state = Update.horizontal(this.#state, detail.value);
            this.#render();
            break;
        }
      }, false);
      this.dom.addEventListener("click-board", (ev) => {
        this.#state = Update.data(this.#state, ev.detail);
        this.#render();
      }, false);
      this.dom.addEventListener("blur-textarea", (ev) => {
        const detail = ev.detail;
        this.#state = Update.textarea(this.#state, detail);
      }, false);
    }
    changeSize(size) {
      if (["none", "small", "large"].includes(size)) {
        this.#state.size = size;
        this.#render();
      }
    }
    bulkUpdate(input) {
      const [rowData, rowTextarea] = input;
      this.#render();
    }
    get data() {
      return [this.#state.data, this.#state.textarea];
    }
    #render() {
      this.#header.render(this.#state);
      this.#body.render(this.#state);
      this.#footer.render(this.#state);
    }
  };

  // src/igo/board-controller.ts
  var BoardController = class extends HTMLElement {
    #wrapper;
    static observedAttributes = [
      // "data-gostate-data",
      "data-display"
    ];
    constructor() {
      super();
      this.#wrapper = new Wrapper();
      this.appendChild(this.#wrapper.dom);
    }
    // document に接続時実行
    connectedCallback() {
    }
    // 属性変更時実行
    attributeChangedCallback(attr, oldVal, newVal) {
      switch (attr) {
        //case 'data-gostate-data':
        //    break;
        case "data-display":
          this.#wrapper.changeSize(newVal);
          break;
      }
    }
  };

  // src/igo/displayShowHide.ts
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

  // src/igo/saveLoad.ts
  function save() {
    const bCons = [...document.querySelectorAll("board-controller")];
    const bConsData = bCons.map((bcon) => ({
      data: bcon.dataset.stonesData,
      textarea: bcon.dataset.textArea
    }));
    const json = JSON.stringify(bConsData);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const date = /* @__PURE__ */ new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const Y = date.getFullYear();
    const M = pad(date.getMonth() + 1);
    const D = pad(date.getDate());
    const h = pad(date.getHours());
    const m = pad(date.getMinutes());
    const s = pad(date.getSeconds());
    const title = `\u56F2\u7881\u30C7\u30FC\u30BF\uFF1A${Y}-${M}-${D}T${h}:${m}:${s}.json`;
    a.download = title;
    a.click();
    URL.revokeObjectURL(url);
  }
  async function load(ev) {
    const target = ev.target;
    const bCons = [...document.querySelectorAll("board-controller")];
    const files = target.files;
    if (!files) return;
    const file = files[0];
    try {
      const jsonText = await file.text();
      const data = JSON.parse(jsonText);
      if (Array.isArray(data)) {
        data.forEach((dat, i) => {
          bCons[i].dataset.stonesData = dat.data;
          bCons[i].dataset.textArea = dat.textarea;
        });
      }
    } catch (err) {
      console.error("JSON\u306E\u30D1\u30FC\u30B9\u306B\u5931\u6557:", err);
    }
  }

  // src/igo/index.ts
  customElements.define("board-controller", BoardController);
  document.addEventListener("DOMContentLoaded", () => {
    displayShowHide();
    document.querySelector("button#save")?.addEventListener("click", save, false);
    document.querySelector("input#load")?.addEventListener("change", load, false);
  }, false);
})();
