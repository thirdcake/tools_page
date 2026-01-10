(() => {
  // src/igo/grid.ts
  var Grid = class {
    #ns = "http://www.w3.org/2000/svg";
    #config;
    g;
    constructor(config, positions) {
      this.#config = config;
      this.g = document.createElementNS(this.#ns, "g");
      this.g = this.#drawLines(this.g, positions);
      this.g = this.#drawDots(this.g, positions);
    }
    #drawLines(group, positions) {
      const start = Math.floor(this.#config.interval / 2) - Math.floor(this.#config.thick / 2);
      const end = this.#config.interval * this.#config.size - start;
      return positions.reduce((gro, pos, i) => {
        const isFirstOrLast = i === 0 || i === positions.length - 1;
        const sw = isFirstOrLast ? this.#config.thick : this.#config.thin;
        gro.appendChild(this.#createLine(start, end, pos, pos, sw));
        gro.appendChild(this.#createLine(pos, pos, start, end, sw));
        return gro;
      }, group);
    }
    #drawDots(group, positions) {
      const isDotPos = (_, i) => i === 3 || i === 9 || i === 15;
      const filterPositions = positions.filter(isDotPos);
      filterPositions.forEach((pos_r) => {
        filterPositions.forEach((pos_c) => {
          group.appendChild(this.#createDot(pos_r, pos_c));
        });
      });
      return group;
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
    g;
    #aiu = "\u3042\u3044\u3046\u3048\u304A\u304B\u304D\u304F\u3051\u3053\u3055\u3057\u3059\u305B\u305D\u305F\u3061\u3064\u3066".split("");
    #iroha = "\u30A4\u30ED\u30CF\u30CB\u30DB\u30D8\u30C8\u30C1\u30EA\u30CC\u30EB\u30F2\u30EF\u30AB\u30E8\u30BF\u30EC\u30BD\u30C4".split("");
    #nums = Array.from({ length: 19 }, (_, i) => `${i + 1}`);
    #verticalChars;
    #holizontalChars;
    constructor(config, positions) {
      this.#config = config;
      this.g = document.createElementNS(this.#ns, "g");
      this.#verticalChars = this.#createVerticalChars(positions);
      this.#holizontalChars = this.#createHolizontalChars(positions);
      this.g = this.#setChars(this.g, this.#verticalChars);
      this.g = this.#setChars(this.g, this.#holizontalChars);
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

  // src/igo/state.ts
  var State = class {
    #color;
    #character;
    constructor() {
      this.#color = 0;
      this.#character = "";
    }
    get color() {
      return this.#color;
    }
    set color(n) {
      switch (n) {
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
    g;
    constructor(config, positions) {
      this.#config = config;
      this.#positions = positions;
      this.stones = this.#createStones(positions);
      this.g = document.createElementNS(this.#ns, "g");
      this.stones.forEach((row) => {
        row.forEach((stone) => {
          this.g.appendChild(stone.g);
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
    #width = this.#config.size * this.#config.interval;
    #viewBox = [0, 0, this.#width, this.#width];
    #positions;
    svg;
    #grid;
    #coodinates;
    #state;
    #stones;
    constructor() {
      this.#positions = this.#createPositions();
      this.svg = document.createElementNS(this.#ns, "svg");
      this.svg.setAttribute("viewBox", this.#viewBox.join(" "));
      this.svg.setAttribute("style", "width:100%;height:auto;max-width:600px;");
      this.#grid = new Grid(this.#config, this.#positions);
      this.svg.appendChild(this.#grid.g);
      this.#coodinates = new Coordinates(this.#config, this.#positions);
      this.svg.appendChild(this.#coodinates.g);
      this.#state = new State();
      this.#stones = new Stones(this.#config, this.#positions);
      this.svg.appendChild(this.#stones.g);
      this.svg.addEventListener("click", (ev) => {
        this.#onClickSVG(ev.clientX, ev.clientY);
      });
    }
    #onClickSVG(clix, cliy) {
      const pt = this.svg.createSVGPoint();
      pt.x = clix;
      pt.y = cliy;
      const { x, y } = pt.matrixTransform(this.svg.getScreenCTM()?.inverse());
      this.#stones.onClick(x, y, this.#state);
    }
    onClickColor(oldVal, newVal) {
      this.#state.color = newVal;
    }
    onClickChar(oldVal, newVal) {
      this.#state.character = newVal;
    }
    onChangeXL(oldVal, newVal) {
    }
    onChangeXR(oldVal, newVal) {
      const oldNum = Number(oldVal);
      const newNum = Number(newVal);
      if (isNaN(oldNum) || isNaN(newNum)) return;
      const oldLeft = this.#config.interval * (oldNum - 1);
      const newLeft = this.#config.interval * (newNum - 1);
      this.#viewBox[2] += newLeft - oldLeft;
      this.svg.setAttribute("viewBox", this.#viewBox.join(" "));
    }
    onChangeYU(oldVal, newVal) {
      const oldNum = Number(oldVal);
      const newNum = Number(newVal);
      if (isNaN(oldNum) || isNaN(newNum)) return;
      const oldUp = this.#config.interval * (oldNum - 1);
      const newUp = this.#config.interval * (newNum - 1);
      this.#viewBox[1] += oldUp - newUp;
      this.#viewBox[3] -= oldUp - newUp;
      this.svg.setAttribute("viewBox", this.#viewBox.join(" "));
    }
    onChangeYD(oldVal, newVal) {
    }
    onClickVertical(oldVal, newVal) {
      if (oldVal === "null" && newVal !== "null") {
        this.#viewBox[0] -= this.#config.interval;
        this.#viewBox[2] += this.#config.interval;
      } else if (oldVal !== "null" && newVal === "null") {
        this.#viewBox[0] += this.#config.interval;
        this.#viewBox[2] -= this.#config.interval;
      }
      this.svg.setAttribute("viewBox", this.#viewBox.join(" "));
      this.#coodinates.onChangeCoord("vertical", newVal);
    }
    onClickHolizontal(oldVal, newVal) {
      if (oldVal === "null" && newVal !== "null") {
        this.#viewBox[3] += this.#config.interval;
      } else if (oldVal !== "null" && newVal === "null") {
        this.#viewBox[3] -= this.#config.interval;
      }
      this.svg.setAttribute("viewBox", this.#viewBox.join(" "));
      this.#coodinates.onChangeCoord("holizontal", newVal);
    }
    #createPositions() {
      const margin = Math.floor(this.#config.interval / 2);
      const func = (_, i) => margin + this.#config.interval * i;
      const positions = Array.from({ length: this.#config.size }, func);
      return positions;
    }
  };

  // src/igo/board-svg.ts
  var BoardSVG = class extends HTMLElement {
    board;
    static observedAttributes = [
      "color",
      "char",
      "x_left",
      "x_right",
      "y_up",
      "y_down",
      "vertical",
      "holizontal"
    ];
    constructor() {
      super();
      const inits = [
        ["color", "0"],
        ["char", ""],
        ["x_left", "1"],
        ["x_right", "19"],
        ["y_up", "19"],
        ["y_down", "1"],
        ["vertical", "null"],
        ["holizontal", "null"]
      ];
      inits.forEach((arr) => {
        this.setAttribute(arr[0], arr[1]);
      });
      this.board = new Board();
    }
    // document に接続時実行
    connectedCallback() {
      this.appendChild(this.board.svg);
    }
    // 属性変更時実行
    attributeChangedCallback(attr, oldVal, newVal) {
      switch (attr) {
        case "color":
          this.board.onClickColor(oldVal, newVal);
          break;
        case "char":
          this.board.onClickChar(oldVal, newVal);
          break;
        case "x_left":
          break;
        case "x_right":
          this.board.onChangeXR(oldVal, newVal);
          break;
        case "y_up":
          this.board.onChangeYU(oldVal, newVal);
          break;
        case "y_down":
          break;
        case "vertical":
          this.board.onClickVertical(oldVal, newVal);
          break;
        case "holizontal":
          this.board.onClickHolizontal(oldVal, newVal);
          break;
      }
    }
  };

  // src/igo/index.ts
  customElements.define("board-svg", BoardSVG);
  document.addEventListener("DOMContentLoaded", main, false);
  function main() {
    onChangeRange();
  }
  function onChangeRange() {
    const range_u = document.querySelector('input[name="go-state-range-u"]');
    const range_r = document.querySelector('input[name="go-state-range-r"]');
    if (!range_u || !range_r) return;
    range_u.addEventListener("change", (ev) => {
      const target = ev.target;
      if (target instanceof HTMLInputElement) {
        const value = target.value;
        document.querySelectorAll("board-svg").forEach((svg) => {
          svg.setAttribute("y_up", value);
        });
      }
    }, false);
    range_r.addEventListener("change", (ev) => {
      const target = ev.target;
      if (target instanceof HTMLInputElement) {
        const value = target.value;
        document.querySelectorAll("board-svg").forEach((svg) => {
          svg.setAttribute("x_right", value);
        });
      }
    }, false);
  }
  document.addEventListener("click", (ev) => {
    const target = ev.target;
    if (!(target instanceof HTMLElement)) return;
    const ul = target.closest('ul[data-gostate-type="ul"]');
    if (ul === null) return;
    const type = target.dataset.gostateType;
    const value = target.dataset.gostateValue;
    const btns = ul.querySelectorAll(`button[data-gostate-type="${type}"]`);
    btns.forEach((button) => {
      if (button === target) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
    switch (type) {
      case "color":
        document.querySelectorAll("board-svg").forEach((svg) => {
          svg.setAttribute("color", `${value}`);
        });
        break;
      case "char":
        document.querySelectorAll("board-svg").forEach((svg) => {
          svg.setAttribute("char", `${value}`);
        });
        break;
      case "vertical":
        document.querySelectorAll("board-svg").forEach((svg) => {
          svg.setAttribute("vertical", `${value}`);
        });
        break;
      case "holizontal":
        document.querySelectorAll("board-svg").forEach((svg) => {
          svg.setAttribute("holizontal", `${value}`);
        });
        break;
    }
  }, false);
})();
