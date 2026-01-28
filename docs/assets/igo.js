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
    radius: 20,
    positions: Array.from({ length: 19 }, (_, i) => Math.floor(48 / 2) + i * 48)
  });
  var stoneColorPattern = Object.freeze({
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

  // src/igo/board/create-grid.ts
  function createGrid() {
    const dom = document.createElementNS(config.ns, "g");
    const start = Math.floor(config.interval / 2);
    const end = config.interval * config.size - start;
    const background = document.createElementNS(config.ns, "rect");
    background.setAttribute("x", "0");
    background.setAttribute("y", "0");
    background.setAttribute("width", `${config.interval * config.size}`);
    background.setAttribute("height", `${config.interval * config.size}`);
    background.setAttribute("fill", "#fff");
    dom.appendChild(background);
    const rect = document.createElementNS(config.ns, "rect");
    rect.setAttribute("x", `${start}`);
    rect.setAttribute("y", `${start}`);
    rect.setAttribute("width", `${config.interval * (config.size - 1)}`);
    rect.setAttribute("height", `${config.interval * (config.size - 1)}`);
    rect.setAttribute("fill", "transparent");
    rect.setAttribute("stroke", config.color);
    rect.setAttribute("stroke-width", `${config.thick}`);
    dom.appendChild(rect);
    const createLine = (x1, x2, y1, y2) => {
      const line = document.createElementNS(config.ns, "line");
      line.setAttribute("x1", `${x1}`);
      line.setAttribute("x2", `${x2}`);
      line.setAttribute("y1", `${y1}`);
      line.setAttribute("y2", `${y2}`);
      line.setAttribute("stroke", config.color);
      line.setAttribute("stroke-width", `${config.thin}`);
      return line;
    };
    const linePoss = config.positions.filter((_, i) => 0 < i && i < config.size - 1);
    linePoss.forEach((r_pos) => {
      linePoss.forEach((c_pos) => {
        dom.appendChild(createLine(r_pos, r_pos, start, end));
        dom.appendChild(createLine(start, end, c_pos, c_pos));
      });
    });
    const createDots = (cx, cy) => {
      const dot = document.createElementNS(config.ns, "circle");
      dot.setAttribute("cx", `${cx}`);
      dot.setAttribute("cy", `${cy}`);
      const r = Math.floor(config.thick * 1.5);
      dot.setAttribute("r", `${r}`);
      dot.setAttribute("fill", config.color);
      return dot;
    };
    const dotPoss = config.positions.filter((_, i) => i === 3 || i === 9 || i === 15);
    dotPoss.forEach((r_pos) => {
      dotPoss.forEach((c_pos) => {
        dom.appendChild(createDots(r_pos, c_pos));
      });
    });
    return dom;
  }

  // src/igo/board/coordinates.ts
  var Coordinates = class {
    dom = document.createElementNS(config.ns, "g");
    x = {
      num: document.createElementNS(config.ns, "g"),
      aiu: document.createElementNS(config.ns, "g"),
      iroha: document.createElementNS(config.ns, "g")
    };
    y = {
      num: document.createElementNS(config.ns, "g"),
      aiu: document.createElementNS(config.ns, "g"),
      iroha: document.createElementNS(config.ns, "g")
    };
    xpositions = config.positions.map((pos) => [pos, config.interval * (config.size + 0.5)]);
    ypositions = config.positions.toReversed().map((pos) => [-Math.floor(config.interval / 2), pos]);
    init_data = {
      aiu: "\u3042\u3044\u3046\u3048\u304A\u304B\u304D\u304F\u3051\u3053\u3055\u3057\u3059\u305B\u305D\u305F\u3061\u3064\u3066".split(""),
      iroha: "\u30A4\u30ED\u30CF\u30CB\u30DB\u30D8\u30C8\u30C1\u30EA\u30CC\u30EB\u30F2\u30EF\u30AB\u30E8\u30BF\u30EC\u30BD\u30C4".split(""),
      num: Array.from({ length: 19 }, (_, i) => `${i + 1}`)
    };
    constructor() {
      this.createCoord(this.x.num, this.xpositions, this.init_data.num);
      this.createCoord(this.x.aiu, this.xpositions, this.init_data.aiu);
      this.createCoord(this.x.iroha, this.xpositions, this.init_data.iroha);
      this.createCoord(this.y.num, this.ypositions, this.init_data.num);
      this.createCoord(this.y.aiu, this.ypositions, this.init_data.aiu);
      this.createCoord(this.y.iroha, this.ypositions, this.init_data.iroha);
      this.dom.appendChild(this.x.num);
      this.dom.appendChild(this.x.aiu);
      this.dom.appendChild(this.x.iroha);
      this.dom.appendChild(this.y.num);
      this.dom.appendChild(this.y.aiu);
      this.dom.appendChild(this.y.iroha);
    }
    createCoord(parent, positions, init_data) {
      parent.style.fill = "transparent";
      const text_size = config.text_size;
      const font_style = `font:normal ${text_size}px sans-serif`;
      const base_line = config.radius * 0.6;
      positions.forEach(([x_pos, y_pos], i) => {
        const text = document.createElementNS(config.ns, "text");
        text.setAttribute("style", font_style);
        text.setAttribute("x", `${x_pos}`);
        text.setAttribute("y", `${base_line + y_pos}`);
        text.setAttribute("text-anchor", "middle");
        text.textContent = init_data[i];
        parent.appendChild(text);
      });
    }
    set xAxis(axis) {
      this.x.num.style.fill = "transparent";
      this.x.aiu.style.fill = "transparent";
      this.x.iroha.style.fill = "transparent";
      switch (axis) {
        case "num":
          this.x.num.style.fill = config.color;
          break;
        case "aiu":
          this.x.aiu.style.fill = config.color;
          break;
        case "iroha":
          this.x.iroha.style.fill = config.color;
          break;
      }
    }
    set yAxis(axis) {
      this.y.num.style.fill = "transparent";
      this.y.aiu.style.fill = "transparent";
      this.y.iroha.style.fill = "transparent";
      switch (axis) {
        case "num":
          this.y.num.style.fill = config.color;
          break;
        case "aiu":
          this.y.aiu.style.fill = config.color;
          break;
        case "iroha":
          this.y.iroha.style.fill = config.color;
          break;
      }
    }
  };

  // src/igo/board/stone.ts
  var Stone = class {
    dom = document.createElementNS(config.ns, "g");
    circle = document.createElementNS(config.ns, "circle");
    text = document.createElementNS(config.ns, "text");
    tupple;
    constructor(x, y) {
      this.tupple = [0, ""];
      this.initCircle(x, y);
      this.dom.appendChild(this.circle);
      this.initText(x, y);
      this.dom.appendChild(this.text);
    }
    render(tupple) {
      this.tupple = [...tupple];
      const [color, character] = tupple;
      let pattern = "empty";
      if (color === 0 && character === "") {
        pattern = "empty";
      } else if (color === 0) {
        pattern = "onlyChar";
      } else if (color === 1) {
        pattern = "black";
      } else if (color === 2) {
        pattern = "white";
      }
      const {
        circle_fill,
        circle_stroke,
        text_fill
      } = stoneColorPattern[pattern];
      this.circle.setAttribute("fill", circle_fill);
      this.circle.setAttribute("stroke", circle_stroke);
      this.text.setAttribute("fill", text_fill);
      this.text.textContent = character;
    }
    initCircle(x, y) {
      this.circle.setAttribute("cx", `${x}`);
      this.circle.setAttribute("cy", `${y}`);
      this.circle.setAttribute("r", `${config.radius}`);
      this.circle.setAttribute("fill", "transparent");
      this.circle.setAttribute("stroke", "transparent");
      this.circle.setAttribute("stroke-width", `${config.thick}`);
    }
    initText(x, y) {
      const text_size = config.text_size;
      const font_style = `font:normal ${text_size}px sans-serif`;
      this.text.setAttribute("style", font_style);
      this.text.setAttribute("x", `${x}`);
      const base_line = config.radius * 0.6;
      const base_y = base_line + y;
      this.text.setAttribute("y", `${base_y}`);
      this.text.setAttribute("fill", "transparent");
      this.text.setAttribute("text-anchor", "middle");
      this.text.textContent = "";
    }
  };

  // src/igo/board/stones.ts
  var Stones = class {
    dom = document.createElementNS(config.ns, "g");
    stones;
    constructor() {
      this.stones = config.positions.map(
        (pos_r) => config.positions.map((pos_c) => new Stone(pos_c, pos_r))
      );
      this.stones.forEach((row) => {
        row.forEach((stn) => {
          this.dom.appendChild(stn.dom);
        });
      });
    }
    update(row, col, tupple) {
      this.stones[row][col].render(tupple);
    }
    bulkUpdate(val) {
      const data = this.parseData(val);
      data.forEach((row_data, r) => {
        row_data.forEach((cell_data, c) => {
          this.stones[r][c].render(cell_data);
        });
      });
    }
    parseData(jsonString) {
      const baseStone = [0, ""];
      const blankData = Array.from(
        { length: 19 },
        () => Array.from({ length: 19 }, () => [...baseStone])
      );
      try {
        const input = JSON.parse(jsonString);
        if (!Array.isArray(input) || input.length !== 19) return blankData;
        const isValid = input.every((row) => {
          if (!Array.isArray(row) || row.length !== 19) return false;
          return row.every((cell) => {
            if (!Array.isArray(cell) || cell.length !== 2) return false;
            if (cell[0] !== 0 && cell[0] !== 1 && cell[0] !== 2) return false;
            if (typeof cell[1] !== "string" || cell[1].length > 1) return false;
            return true;
          });
        });
        return isValid ? input : blankData;
      } catch (e) {
        console.error("parse error: ", e);
        return blankData;
      }
    }
  };

  // src/igo/board/go-board.ts
  var GoBoard = class {
    dom = document.createElementNS(config.ns, "svg");
    coord;
    #displayMode = "list";
    tupple = [0, ""];
    stones;
    #viewBox = {
      xAxis: "none",
      yAxis: "none",
      rows: 19,
      cols: 19
    };
    tupples;
    constructor() {
      this.stones = new Stones();
      this.tupples = this.stones.stones.map((r) => r.map((stn) => stn.tupple));
      this.coord = new Coordinates();
      this.dom.setAttribute("viewBox", this.viewBox);
      this.dom.appendChild(createGrid());
      this.dom.appendChild(this.stones.dom);
      this.dom.appendChild(this.coord.dom);
      this.dom.addEventListener("click", (ev) => {
        this.toggleStone(ev);
      }, false);
    }
    get viewBox() {
      const xAxis = this.#viewBox.xAxis === "none" ? 0 : config.interval;
      const yAxis = this.#viewBox.yAxis === "none" ? 0 : config.interval;
      const vb = [
        -yAxis,
        config.interval * (config.size - this.#viewBox.rows),
        config.interval * this.#viewBox.cols + yAxis,
        config.interval * this.#viewBox.rows + xAxis
      ];
      return vb.join(" ");
    }
    get viewBoxState() {
      return [
        this.#viewBox.xAxis,
        this.#viewBox.yAxis,
        this.#viewBox.rows,
        this.#viewBox.cols
      ];
    }
    toggleStone(ev) {
      if (this.#displayMode !== "detail") return;
      const pt = this.dom.createSVGPoint();
      pt.x = ev.clientX;
      pt.y = ev.clientY;
      const { x, y } = pt.matrixTransform(this.dom.getScreenCTM()?.inverse());
      const nearestIdx = (num) => {
        return config.positions.reduce((nearest, pos, idx) => {
          const everBest = Math.abs(config.positions[nearest] - num);
          const now = Math.abs(pos - num);
          return everBest < now ? nearest : idx;
        }, 0);
      };
      const [col, row] = [nearestIdx(x), nearestIdx(y)];
      const old = this.stones.stones[row][col];
      if (old.tupple[0] === this.tupple[0] && old.tupple[1] === this.tupple[1]) {
        this.stones.stones[row][col].render([0, ""]);
      } else {
        this.stones.stones[row][col].render(this.tupple);
      }
    }
    set color(input) {
      const n = Number(input);
      if (n === 0 || n === 1 || n === 2) {
        this.tupple[0] = n;
      }
    }
    set character(input) {
      if (typeof input === "string") {
        this.tupple[1] = input.length > 0 ? input[0] : "";
      }
    }
    get rangeRows() {
      return this.#viewBox.rows;
    }
    set rangeRows(input) {
      const num = Number(input ?? 19);
      if (1 <= num && num <= 19) {
        this.#viewBox.rows = num;
        this.dom.setAttribute("viewBox", this.viewBox);
      }
    }
    get rangeCols() {
      return this.#viewBox.cols;
    }
    set rangeCols(input) {
      const num = Number(input ?? 19);
      console.log(input);
      if (1 <= num && num <= 19) {
        this.#viewBox.cols = num;
        this.dom.setAttribute("viewBox", this.viewBox);
      }
    }
    get xAxis() {
      return this.#viewBox.xAxis;
    }
    set xAxis(type) {
      switch (type) {
        case "none":
        case "num":
        case "aiu":
        case "iroha":
          this.#viewBox.xAxis = type;
          this.dom.setAttribute("viewBox", this.viewBox);
          this.coord.xAxis = type;
          break;
      }
    }
    get yAxix() {
      return this.#viewBox.yAxis;
    }
    set yAxis(type) {
      switch (type) {
        case "none":
        case "num":
        case "aiu":
        case "iroha":
          this.#viewBox.yAxis = type;
          this.dom.setAttribute("viewBox", this.viewBox);
          this.coord.yAxis = type;
          break;
      }
    }
    set displayMode(mode) {
      this.#displayMode = mode;
      ["none", "list", "detail"].forEach((md) => {
        this.dom.classList.toggle(`display-${mode}`, md === mode);
      });
    }
  };

  // src/igo/controller/buttons.ts
  var Buttons = class {
    dom = document.createElement("ul");
    buttons;
    constructor(input) {
      this.dom.classList.add("go-form-ul");
      const title = document.createElement("li");
      title.textContent = input.title;
      this.dom.appendChild(title);
      this.buttons = input.init.map((ini) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.dataset.type = input.type;
        btn.dataset.value = ini.value;
        btn.textContent = ini.text;
        return btn;
      });
      this.buttons[0].classList.add("active");
      this.buttons.forEach((btn) => {
        const li = document.createElement("li");
        li.appendChild(btn);
        this.dom.appendChild(li);
      });
      this.buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          this.buttons.forEach((b) => {
            b.classList.toggle("active", b === btn);
          });
        }, false);
      });
    }
  };
  var ColorButtons = class extends Buttons {
    constructor() {
      super({
        title: "\u77F3\u306E\u8272\uFF1A",
        type: "color",
        init: [
          { text: "\uFF08\u7121\u8272\uFF09", value: "0" },
          { text: "\u9ED2", value: "1" },
          { text: "\u767D", value: "2" }
        ]
      });
    }
  };
  var CharacterButtons = class extends Buttons {
    constructor() {
      super({
        title: "\u6587\u5B57\uFF1A",
        type: "character",
        init: [
          { text: "\uFF08\u7121\u3057\uFF09", value: "" },
          { text: "A", value: "A" },
          { text: "B", value: "B" },
          { text: "C", value: "C" },
          { text: "D", value: "D" },
          { text: "E", value: "E" },
          { text: "\u25B3", value: "\u25B3" },
          { text: "1", value: "1" },
          { text: "2", value: "2" },
          { text: "3", value: "3" },
          { text: "4", value: "4" },
          { text: "5", value: "5" }
        ]
      });
    }
  };
  var XAxisButtons = class extends Buttons {
    constructor() {
      super({
        title: "\u6A2A\u8EF8\uFF1A",
        type: "x-axis",
        init: [
          { text: "\uFF08\u7121\u3057\uFF09", value: "none" },
          { text: "1,2,3,...", value: "num" },
          { text: "\u3042,\u3044,\u3046,...", value: "aiu" },
          { text: "\u30A4,\u30ED,\u30CF,...", value: "iroha" }
        ]
      });
    }
    set active(input) {
      if (input === "none" || input === "num" || input === "aiu" || input === "iroha") {
        this.buttons.forEach((btn) => {
          btn.classList.toggle("active", input === btn.dataset.value);
        });
      }
    }
  };
  var YAxisButtons = class extends Buttons {
    constructor() {
      super({
        title: "\u7E26\u8EF8\uFF1A",
        type: "y-axis",
        init: [
          { text: "\uFF08\u7121\u3057\uFF09", value: "none" },
          { text: "1,2,3,...", value: "num" },
          { text: "\u3042,\u3044,\u3046,...", value: "aiu" },
          { text: "\u30A4,\u30ED,\u30CF,...", value: "iroha" }
        ]
      });
    }
    set active(input) {
      if (input === "none" || input === "num" || input === "aiu" || input === "iroha") {
        this.buttons.forEach((btn) => {
          btn.classList.toggle("active", input === btn.dataset.value);
        });
      }
    }
  };

  // src/igo/controller/ranges.ts
  var Range = class {
    dom = document.createElement("div");
    input = document.createElement("input");
    span = document.createElement("span");
    constructor(data) {
      this.dom.classList.add("go-form-range");
      const title = document.createElement("span");
      title.textContent = data.title;
      this.input.type = "range";
      this.input.min = "5";
      this.input.max = "19";
      this.input.value = "19";
      this.input.dataset.type = data.type;
      this.span.textContent = "19";
      this.dom.appendChild(title);
      this.dom.appendChild(this.input);
      this.dom.appendChild(this.span);
      this.input.addEventListener("change", () => {
        this.span.textContent = this.input.value;
      }, false);
    }
    set range(input) {
      const num = Number(input);
      if (0 < num && num <= 19) {
        this.span.textContent = `${num}`;
        this.input.value = `${num}`;
      }
    }
  };
  var ColsRange = class extends Range {
    constructor() {
      super({
        title: "\u6A2A\u5E45\uFF1A",
        type: "cols"
      });
    }
  };
  var RowsRange = class extends Range {
    constructor() {
      super({
        title: "\u9AD8\u3055\uFF1A",
        type: "rows"
      });
    }
  };

  // src/igo/controller/header.ts
  var Header = class {
    dom = document.createElement("div");
    children = {
      color: new ColorButtons(),
      character: new CharacterButtons(),
      cols: new ColsRange(),
      rows: new RowsRange(),
      xaxis: new XAxisButtons(),
      yaxis: new YAxisButtons()
    };
    constructor() {
      this.dom.appendChild(this.children.color.dom);
      this.dom.appendChild(this.children.character.dom);
      this.dom.appendChild(this.children.cols.dom);
      this.dom.appendChild(this.children.rows.dom);
      this.dom.appendChild(this.children.xaxis.dom);
      this.dom.appendChild(this.children.yaxis.dom);
    }
    set rows(input) {
      this.children.rows.range = input;
    }
    set cols(input) {
      this.children.cols.range = input;
    }
    set xaxis(input) {
      this.children.xaxis.active = input;
    }
    set yaxis(input) {
      this.children.yaxis.active = input;
    }
    set displayMode(input) {
      switch (input) {
        case "none":
        case "list":
          this.dom.style.display = "none";
          break;
        case "detail":
          this.dom.style.display = "block";
          break;
      }
    }
  };

  // src/igo/controller/textarea.ts
  var Textarea = class {
    dom = document.createElement("div");
    area = document.createElement("textarea");
    para = document.createElement("p");
    #displayMode = "list";
    constructor() {
      this.dom.appendChild(this.area);
      this.dom.appendChild(this.para);
      this.area.style.display = "none";
      this.para.textContent = "\uFF08\u3053\u3053\u306B\u6587\u7AE0\u3092\u5165\u529B\u3067\u304D\u307E\u3059\u3002\uFF09";
      this.para.style.color = "#555";
      this.area.addEventListener("blur", () => {
        this.area.style.display = "none";
        if (this.area.value === "") {
          this.para.textContent = "\uFF08\u3053\u3053\u306B\u6587\u7AE0\u3092\u5165\u529B\u3067\u304D\u307E\u3059\u3002\uFF09";
          this.para.style.color = "#555";
        } else {
          this.para.textContent = this.area.value;
          this.para.style.color = "#111";
        }
        this.para.style.display = "block";
      });
      this.para.addEventListener("click", () => {
        if (this.#displayMode === "detail") {
          this.para.style.display = "none";
          this.area.style.display = "block";
          this.area.focus();
        }
      });
    }
    displayNone() {
      this.area.style.display = "none";
      this.para.style.display = "none";
    }
    displayList() {
      this.area.style.display = "none";
      this.para.style.display = "block";
      if (this.area.value === "") {
        this.para.textContent = " ";
        this.para.style.color = "#555";
      } else {
        this.para.textContent = this.area.value;
        this.para.style.color = "#111";
      }
    }
    displayDetail() {
      this.area.style.display = "none";
      this.para.style.display = "block";
      if (this.area.value === "") {
        this.para.textContent = "\uFF08\u3053\u3053\u306B\u6587\u7AE0\u3092\u5165\u529B\u3067\u304D\u307E\u3059\u3002\uFF09";
        this.para.style.color = "#555";
      } else {
        this.para.textContent = this.area.value;
        this.para.style.color = "#111";
      }
    }
    set displayMode(mode) {
      this.#displayMode = mode;
      switch (mode) {
        case "none":
          this.displayNone();
          break;
        case "list":
          this.displayList();
          break;
        case "detail":
          this.displayDetail();
          break;
      }
    }
  };

  // src/igo/board-controller.ts
  var BoardController = class extends HTMLElement {
    #header = new Header();
    #board = new GoBoard();
    #textarea = new Textarea();
    static observedAttributes = [
      // "data-gostate-data",
      "data-display"
    ];
    constructor() {
      super();
      this.appendChild(this.#header.dom);
      this.appendChild(this.#board.dom);
      this.appendChild(this.#textarea.dom);
      this.#header.dom.addEventListener("click", (ev) => {
        const target = ev.target;
        if (target instanceof HTMLButtonElement) {
          switch (target.dataset.type) {
            case "color":
              this.#board.color = target.dataset.value;
              break;
            case "character":
              this.#board.character = target.dataset.value;
              break;
            case "x-axis":
              this.#board.xAxis = target.dataset.value;
              break;
            case "y-axis":
              this.#board.yAxis = target.dataset.value;
              break;
          }
        }
      });
      this.#header.dom.addEventListener("change", (ev) => {
        const target = ev.target;
        if (target instanceof HTMLInputElement && target.type === "range") {
          switch (target.dataset.type) {
            case "cols":
              this.#board.rangeCols = target.value;
              break;
            case "rows":
              this.#board.rangeRows = target.value;
              break;
          }
        }
      });
      this.addEventListener("blur", (ev) => {
      });
    }
    // document に接続時実行
    connectedCallback() {
    }
    // 属性変更時実行
    attributeChangedCallback(attr, oldVal, newVal) {
      switch (attr) {
        case "data-display":
          if (newVal === "none" || newVal === "list" || newVal === "detail") {
            this.#header.displayMode = newVal;
            this.#board.displayMode = newVal;
            this.#textarea.displayMode = newVal;
          }
          break;
      }
    }
    get state() {
      return [
        ...this.#board.viewBoxState,
        this.#board.tupples,
        this.#textarea.area.value
      ];
    }
    set state(input) {
      if (Array.isArray(input)) {
        const [
          xAxis,
          yAxis,
          rows,
          cols,
          tupples,
          textarea
        ] = input;
        this.#header.xaxis = xAxis;
        this.#header.yaxis = yAxis;
        this.#header.rows = rows;
        this.#header.cols = cols;
        this.#board.tupples = tupples;
        this.#textarea.area.value = textarea;
      }
    }
  };

  // src/igo/displayShowHide.ts
  function displayShowHide() {
    const zoomBase = { inRange: true, size: "list" };
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
    dom.overviewZoomBtns.forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        toggleActiveClass(btn, dom.overviewZoomBtns);
        state.zoomIdx = idx;
        update(dom, state);
      });
    });
  }
  function update(dom, state) {
    const isOverview = state.zoomIdx === 0;
    state.zooms.forEach((zoom, i) => {
      zoom.inRange = i < state.perPageLimit;
      const isZoom = state.zoomIdx === i + 1;
      if (isOverview) {
        zoom.size = "list";
      } else if (isZoom) {
        zoom.size = "detail";
      } else {
        zoom.size = "none";
      }
    });
    dom.overviewZoomBtns.forEach((btn, i) => {
      if (i > 0) {
        btn.style.display = state.zooms[i - 1].inRange ? "block" : "none";
      }
    });
    dom.bCons.forEach((bcon, i) => {
      bcon.dataset.display = state.zooms[i].size;
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
    const bConsData = bCons.map((bcon) => bcon.state);
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
          bCons[i].state = dat;
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
