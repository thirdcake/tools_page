(() => {
  // src/igo/model/click-per-page.ts
  function clickPerPage(state, input) {
    const perPage = input === "4" ? 4 : 6;
    if (state.perPage === perPage) return state;
    const oldList = state.goWrapper.map((gW) => gW.list);
    let idealList = Array.from(
      { length: 6 },
      (_, i) => i < perPage ? "list" : "none"
    );
    if (oldList.includes("detail")) {
      if (oldList.indexOf("detail") < perPage) {
        idealList = oldList;
      }
    }
    const goWrapper = state.goWrapper.map((gW, i) => {
      if (gW.list === idealList[i]) return gW;
      return {
        ...gW,
        list: idealList[i]
      };
    });
    if (state.goWrapper.every((gW, i) => gW === goWrapper[i])) {
      return {
        ...state,
        perPage
      };
    }
    return {
      ...state,
      perPage,
      goWrapper
    };
  }

  // src/igo/model/click-list-zoom.ts
  function clickListZoom(state, input) {
    const num = Number(input);
    let idealList;
    if (0 <= num && num < 6) {
      idealList = Array.from(
        { length: 6 },
        (_, i) => num === i ? "detail" : "none"
      );
    } else {
      if (num !== -1) {
        console.error("listZoom.num => ", num);
      }
      idealList = Array.from(
        { length: 6 },
        (_, i) => i < state.perPage ? "list" : "none"
      );
    }
    const goWrapper = state.goWrapper.map((gW, i) => {
      if (gW.list === idealList[i]) return gW;
      return {
        ...gW,
        list: idealList[i]
      };
    });
    if (state.goWrapper.every((gW, i) => gW === goWrapper[i])) return state;
    return {
      ...state,
      goWrapper
    };
  }

  // src/igo/model/click-color.ts
  function clickColor(state, input) {
    const oldVal = state.goWrapper[input.index].color;
    const newVal = Number(input.value);
    if (newVal !== 0 && newVal !== 1 && newVal !== 2) return state;
    if (oldVal === newVal) return state;
    const newWrapper = {
      ...state.goWrapper[input.index],
      color: newVal
    };
    const goWrapper = [...state.goWrapper];
    goWrapper[input.index] = newWrapper;
    return {
      ...state,
      goWrapper
    };
  }

  // src/igo/model/click-character.ts
  function clickCharacter(state, input) {
    const oldVal = state.goWrapper[input.index].character;
    let newVal = input.value;
    if (oldVal === newVal) return state;
    if (newVal.length > 1) {
      newVal = newVal[0];
    }
    const newWrapper = {
      ...state.goWrapper[input.index],
      character: newVal
    };
    const goWrapper = [...state.goWrapper];
    goWrapper[input.index] = newWrapper;
    return {
      ...state,
      goWrapper
    };
  }

  // src/igo/consts.ts
  var config = Object.freeze({
    ns: "http://www.w3.org/2000/svg",
    color: "#333",
    thin: 2,
    thick: 4,
    size: 19,
    interval: 48,
    text_size: 36,
    font_style: "font:normal 36px sans-serif",
    radius: 20,
    positions: Array.from({ length: 19 }, (_, i) => Math.floor(48 / 2) + i * 48)
  });

  // src/igo/model/change-view-box.ts
  function createViewBox(rows, cols, hasXAxis, hasYAxis) {
    let min_x = hasYAxis ? 0 - config.interval : 0;
    let min_y = config.interval * (config.size - rows);
    let width = config.interval * cols;
    let height = config.interval * rows + (hasXAxis ? config.interval : 0);
    return [min_x, min_y, width, height].join(" ");
  }
  function clickXAxis(state, input) {
    const oldVal = state.goWrapper[input.index].xAxis;
    const newVal = input.value;
    if (oldVal === newVal) return state;
    const newWrapper = {
      ...state.goWrapper[input.index],
      xAxis: newVal,
      viewBox: createViewBox(
        state.goWrapper[input.index].rows,
        state.goWrapper[input.index].cols,
        newVal !== "none",
        state.goWrapper[input.index].yAxis !== "none"
      )
    };
    const goWrapper = [...state.goWrapper];
    goWrapper[input.index] = newWrapper;
    return {
      ...state,
      goWrapper
    };
  }
  function clickYAxis(state, input) {
    const oldVal = state.goWrapper[input.index].yAxis;
    const newVal = input.value;
    if (oldVal === newVal) return state;
    const newWrapper = {
      ...state.goWrapper[input.index],
      yAxis: newVal,
      viewBox: createViewBox(
        state.goWrapper[input.index].rows,
        state.goWrapper[input.index].cols,
        state.goWrapper[input.index].xAxis !== "none",
        newVal !== "none"
      )
    };
    const goWrapper = [...state.goWrapper];
    goWrapper[input.index] = newWrapper;
    return {
      ...state,
      goWrapper
    };
  }
  function changeRows(state, input) {
    const oldVal = state.goWrapper[input.index].rows;
    const newVal = Number(input.value);
    if (oldVal === newVal) return state;
    console.log("fire!");
    if (!Number.isInteger(newVal)) return state;
    if (newVal < 1 || 19 < newVal) return state;
    const newWrapper = {
      ...state.goWrapper[input.index],
      rows: newVal,
      viewBox: createViewBox(
        newVal,
        state.goWrapper[input.index].cols,
        state.goWrapper[input.index].xAxis !== "none",
        state.goWrapper[input.index].yAxis !== "none"
      )
    };
    const goWrapper = [...state.goWrapper];
    goWrapper[input.index] = newWrapper;
    return {
      ...state,
      goWrapper
    };
  }
  function changeCols(state, input) {
    const oldVal = state.goWrapper[input.index].cols;
    const newVal = Number(input.value);
    if (oldVal === newVal) return state;
    if (!Number.isInteger(newVal)) return state;
    if (newVal < 1 || 19 < newVal) return state;
    const newWrapper = {
      ...state.goWrapper[input.index],
      cols: newVal,
      viewBox: createViewBox(
        state.goWrapper[input.index].rows,
        newVal,
        state.goWrapper[input.index].xAxis !== "none",
        state.goWrapper[input.index].yAxis !== "none"
      )
    };
    const goWrapper = [...state.goWrapper];
    goWrapper[input.index] = newWrapper;
    return {
      ...state,
      goWrapper
    };
  }

  // src/igo/model/click-stone.ts
  function clickStone(state, input) {
    const [oldColor, oldChar] = state.goWrapper[input.index].data[input.row][input.col];
    const newColor = state.goWrapper[input.index].color;
    const newChar = state.goWrapper[input.index].character;
    const newTuple = oldColor === newColor && oldChar === newChar ? [0, ""] : [newColor, newChar];
    const newRow = [...state.goWrapper[input.index].data[input.row]];
    newRow[input.col] = newTuple;
    const newData = [...state.goWrapper[input.index].data];
    newData[input.row] = newRow;
    const newWrapper = {
      ...state.goWrapper[input.index],
      data: newData
    };
    const goWrapper = [...state.goWrapper];
    goWrapper[input.index] = newWrapper;
    return {
      ...state,
      goWrapper
    };
  }

  // src/igo/model/change-textarea.ts
  function changeTextarea(state, input) {
    const newWrapper = {
      ...state.goWrapper[input.index],
      textarea: input.text
    };
    const goWrapper = [...state.goWrapper];
    goWrapper[input.index] = newWrapper;
    return {
      ...state,
      goWrapper
    };
  }

  // src/igo/model/save.ts
  function save(state) {
  }

  // src/igo/model/load.ts
  function load(state, input) {
    let data = null;
    try {
      data = JSON.parse(input);
    } catch (err) {
      console.error("JSON\u306E\u30D1\u30FC\u30B9\u306B\u5931\u6557:", err);
    }
    if (isState(data)) {
      const goWrapper = data.goWrapper.map((gW, i) => ({
        list: i < data.perPage ? "list" : "none",
        color: 0,
        character: "",
        rows: gW.rows,
        cols: gW.cols,
        xAxis: gW.xAxis,
        yAxis: gW.yAxis,
        viewBox: createViewBox(
          gW.rows,
          gW.cols,
          gW.xAxis !== "none",
          gW.yAxis !== "none"
        ),
        data: gW.data,
        textarea: gW.textarea
      }));
      return {
        perPage: data.perPage,
        listZoom: -1,
        goWrapper
      };
    }
    return state;
  }
  function isState(obj) {
    if (typeof obj !== "object" || obj === null) {
      return false;
    }
    const candidate = obj;
    if (candidate.perPage !== 4 && candidate.perPage !== 6) return false;
    if (!Array.isArray(candidate.goWrapper)) return false;
    if (candidate.goWrapper.length !== 6) return false;
    return candidate.goWrapper.every((gW) => isGoWrapperState(gW));
  }
  function isGoWrapperState(obj) {
    if (typeof obj !== "object" || obj === null) {
      return false;
    }
    const candidate = obj;
    if (typeof candidate.rows !== "number") return false;
    if (candidate.rows < 0 || 19 < candidate.rows) return false;
    if (typeof candidate.cols !== "number") return false;
    if (candidate.cols < 0 || 19 < candidate.cols) return false;
    if (candidate.xAxis !== "none" || candidate.xAxis !== "num" || candidate.xAxis !== "aiu" || candidate.xAxis !== "iroha") return false;
    if (candidate.yAxis !== "none" || candidate.yAxis !== "num" || candidate.yAxis !== "aiu" || candidate.yAxis !== "iroha") return false;
    if (candidate.textarea !== "string") return false;
    if (!Array.isArray(candidate.data)) return false;
    return candidate.data.every(
      (row) => Array.isArray(row) && row.every(
        (tuple) => Array.isArray(tuple) && tuple.length === 2 && (tuple[0] === 0 || tuple[0] === 1 || tuple[0] === 2) && typeof tuple[1] === "string" && tuple[1].length < 2
      )
    );
  }

  // src/igo/model/model.ts
  var Model = class {
    update(state, detail) {
      switch (detail.type) {
        case "click-per-page":
          return clickPerPage(state, detail.input);
        case "click-list-zoom":
          return clickListZoom(state, detail.input);
        case "click-color":
          return clickColor(state, detail.input);
        case "click-character":
          return clickCharacter(state, detail.input);
        case "change-rows":
          return changeRows(state, detail.input);
        case "change-cols":
          return changeCols(state, detail.input);
        case "click-x-axis":
          return clickXAxis(state, detail.input);
        case "click-y-axis":
          return clickYAxis(state, detail.input);
        case "click-stone":
          return clickStone(state, detail.input);
        case "change-textarea":
          return changeTextarea(state, detail.input);
        default:
          return state;
      }
    }
    save(state) {
      save(state);
    }
    load(state, input) {
      return load(state, input);
    }
  };

  // src/igo/state.ts
  var initState = {
    perPage: 6,
    listZoom: -1,
    goWrapper: Array.from({ length: 6 }, () => ({
      list: "list",
      color: 0,
      character: "",
      rows: 19,
      cols: 19,
      xAxis: "none",
      yAxis: "none",
      viewBox: [
        0,
        0,
        config.interval * config.size,
        config.interval * config.size
      ].join(" "),
      data: Array.from({ length: 19 }, () => Array.from({ length: 19 }, () => [0, ""])),
      textarea: ""
    }))
  };

  // src/igo/view/buttons.ts
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
        btn.value = ini.value;
        btn.textContent = ini.text;
        return btn;
      });
      this.buttons.forEach((btn) => {
        const li = document.createElement("li");
        li.appendChild(btn);
        this.dom.appendChild(li);
      });
    }
  };

  // src/igo/view/header/per-page-buttons.ts
  var PerPageButtons = class extends Buttons {
    constructor() {
      super({
        title: "\uFF11\u30DA\u30FC\u30B8\u306B\u8868\u793A\u3059\u308B\u6570\uFF1A",
        type: "click-per-page",
        init: [
          { text: "4\u3064", value: "4" },
          { text: "6\u3064", value: "6" }
        ]
      });
      this.dom.classList.add("no-print");
      this.buttons[1].classList.add("active");
      this.buttons.forEach((button) => {
        const event = new CustomEvent("go-event", {
          bubbles: true,
          detail: {
            type: "click-per-page",
            input: button.value
          }
        });
        button.addEventListener("click", () => {
          this.dom.dispatchEvent(event);
        }, false);
      });
    }
    render(state) {
      this.buttons.forEach((button) => {
        button.classList.toggle("active", `${state.perPage}` === button.value);
      });
    }
  };

  // src/igo/view/header/list-zoom-buttons.ts
  var ListZoomButtons = class extends Buttons {
    constructor() {
      super({
        title: "\u8868\u793A\uFF1A",
        type: "click-list-zoom",
        init: [
          { text: "\u5168\u4F53\u3092\u4FEF\u77B0", value: "-1" },
          { text: "1\u3064\u76EE\u3092\u62E1\u5927", value: "0" },
          { text: "2\u3064\u76EE\u3092\u62E1\u5927", value: "1" },
          { text: "3\u3064\u76EE\u3092\u62E1\u5927", value: "2" },
          { text: "4\u3064\u76EE\u3092\u62E1\u5927", value: "3" },
          { text: "5\u3064\u76EE\u3092\u62E1\u5927", value: "4" },
          { text: "6\u3064\u76EE\u3092\u62E1\u5927", value: "5" }
        ]
      });
      this.dom.appendChild(document.createElement("hr"));
      this.dom.classList.add("no-print");
      this.buttons[0].classList.add("active");
      this.buttons.forEach((button) => {
        const event = new CustomEvent("go-event", {
          bubbles: true,
          detail: {
            type: "click-list-zoom",
            input: button.value
          }
        });
        button.addEventListener("click", () => {
          this.dom.dispatchEvent(event);
        }, false);
      });
    }
    render(state) {
      const listZoom = state.goWrapper.map((gW) => gW.list);
      let activeBtnIndex = listZoom.reduce((num, lZ, idx) => {
        if (lZ === "detail") return idx;
        return num;
      }, -1);
      this.buttons.forEach((button, i) => {
        if (state.perPage < i) {
          button.style.display = "none";
        } else {
          button.style.display = "block";
        }
        button.classList.toggle("active", `${activeBtnIndex}` === button.value);
      });
    }
  };

  // src/igo/view/header/save-load.ts
  var SaveLoad = class {
    dom = document.createElement("div");
    save = document.createElement("button");
    loadText = document.createElement("span");
    loadInput = document.createElement("input");
    state;
    constructor(state) {
      this.state = state.listZoom;
      this.save.id = "save";
      this.save.type = "button";
      this.save.textContent = "\u4FDD\u5B58\u3059\u308B";
      this.dom.appendChild(this.save);
      this.save.addEventListener("click", () => {
        const event = new Event("go-save", { bubbles: true });
        this.dom.dispatchEvent(event);
      }, false);
      this.loadText.textContent = "\u8AAD\u307F\u8FBC\u307F\uFF1A";
      this.dom.appendChild(this.loadText);
      this.loadInput.id = "load";
      this.loadInput.type = "file";
      this.loadInput.accept = "application/json";
      this.dom.appendChild(this.loadInput);
      this.dom.appendChild(document.createElement("hr"));
      this.loadInput.addEventListener("change", async (ev) => {
        const target = ev.target;
        const files = target.files;
        if (!files) return;
        const file = files[0];
        let jsonString;
        try {
          jsonString = await file.text();
        } catch (err) {
          jsonString = "file \u53D6\u5F97\u306B\u5931\u6557";
          console.error(jsonString, err);
        }
        const event = new CustomEvent("go-load", {
          bubbles: true,
          detail: {
            input: jsonString
          }
        });
        this.dom.dispatchEvent(event);
      }, false);
    }
    render(state) {
      if (this.state === state.listZoom) return;
      this.state = state.listZoom;
      if (this.state === -1) {
        this.dom.style.display = "block";
      } else {
        this.dom.style.display = "none";
      }
    }
  };

  // src/igo/view/header/header.ts
  var GlobalHeader = class {
    dom = document.createElement("div");
    perPageButtons;
    listZoomButtons;
    saveLoad;
    constructor(state) {
      this.dom.classList.add("no-print");
      this.perPageButtons = new PerPageButtons();
      this.dom.appendChild(this.perPageButtons.dom);
      this.listZoomButtons = new ListZoomButtons();
      this.dom.appendChild(this.listZoomButtons.dom);
      this.saveLoad = new SaveLoad(state);
      this.dom.appendChild(this.saveLoad.dom);
    }
    render(state) {
      this.perPageButtons.render(state);
      this.listZoomButtons.render(state);
    }
  };

  // src/igo/view/go-controller/color-buttons.ts
  var ColorButtons = class extends Buttons {
    state;
    constructor(idx, state) {
      super({
        title: "\u7881\u77F3\u306E\u8272\uFF1A",
        type: "click-color",
        init: [
          { text: "\uFF08\u7121\u8272\uFF09", value: "0" },
          { text: "\u9ED2", value: "1" },
          { text: "\u767D", value: "2" }
        ]
      });
      this.state = state.color;
      this.buttons[0].classList.add("active");
      this.buttons.forEach((button) => {
        const event = new CustomEvent("go-event", {
          bubbles: true,
          detail: {
            type: "click-color",
            input: {
              index: idx,
              value: button.value
            }
          }
        });
        button.addEventListener("click", () => {
          this.dom.dispatchEvent(event);
        }, false);
      });
    }
    render(state) {
      if (state.color === this.state) return;
      this.state = state.color;
      this.buttons.forEach((button, i) => {
        button.classList.toggle("active", i === this.state);
      });
    }
  };

  // src/igo/view/go-controller/character-buttons.ts
  var CharacterButtons = class extends Buttons {
    state;
    constructor(idx, state) {
      super({
        title: "\u6587\u5B57\uFF1A",
        type: "click-character",
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
      this.state = state.character;
      this.buttons[1].classList.add("active");
      this.buttons.forEach((button) => {
        const event = new CustomEvent("go-event", {
          bubbles: true,
          detail: {
            type: "click-character",
            input: {
              index: idx,
              value: button.value
            }
          }
        });
        button.addEventListener("click", () => {
          this.dom.dispatchEvent(event);
        }, false);
      });
    }
    render(state) {
      if (this.state === state.character) return;
      this.state = state.character;
      this.buttons.forEach((button) => {
        button.classList.toggle("active", this.state === button.value);
      });
    }
  };

  // src/igo/view/go-controller/size-range.ts
  var Range = class {
    dom = document.createElement("div");
    title = document.createElement("span");
    input = document.createElement("input");
    disp = document.createElement("span");
    state = 19;
    type;
    constructor(idx, state, title, type) {
      this.type = type;
      this.state = state[this.type];
      this.title.textContent = title;
      this.dom.appendChild(this.title);
      this.input.type = "range";
      this.input.min = "5";
      this.input.max = "19";
      this.input.value = `${this.state}`;
      this.dom.appendChild(this.input);
      this.disp.textContent = `${this.state}`;
      this.dom.appendChild(this.disp);
      this.input.addEventListener("input", () => {
        const event = new CustomEvent("go-event", {
          bubbles: true,
          detail: {
            type: `change-${type}`,
            input: {
              index: idx,
              value: this.input.value
            }
          }
        });
        this.dom.dispatchEvent(event);
      }, false);
    }
    render(state) {
      if (this.state === state[this.type]) return;
      this.state = state[this.type];
      this.disp.textContent = `${this.state}`;
    }
  };
  var ColsRange = class extends Range {
    constructor(idx, state) {
      super(idx, state, "\u6A2A\u5E45\uFF1A", "cols");
    }
  };
  var RowsRange = class extends Range {
    constructor(idx, state) {
      super(idx, state, "\u9AD8\u3055\uFF1A", "rows");
    }
  };

  // src/igo/view/go-controller/axis-buttons.ts
  var AxisButtons = class extends Buttons {
    type;
    idx;
    state;
    constructor(idx, state, type, data) {
      super(data);
      this.type = type;
      this.idx = idx;
      this.state = state[this.type];
      this.buttons[0].classList.add("active");
      this.buttons.forEach((button) => {
        button.addEventListener("click", () => {
          this.dispatchEvent(data.type, button.value);
        }, false);
      });
    }
    dispatchEvent(detail_type, button_value) {
      const event = new CustomEvent("go-event", {
        bubbles: true,
        detail: {
          type: detail_type,
          input: {
            index: this.idx,
            value: button_value
          }
        }
      });
      this.dom.dispatchEvent(event);
    }
    render(state) {
      if (this.state === state[this.type]) return;
      this.state = state[this.type];
      this.buttons.forEach((button) => {
        button.classList.toggle("active", state[this.type] === button.value);
      });
    }
  };
  var XAxisButtons = class extends AxisButtons {
    constructor(idx, state) {
      super(idx, state, "xAxis", {
        title: "\u6A2A\u8EF8\uFF1A",
        type: "click-x-axis",
        init: [
          { text: "\uFF08\u7121\u3057\uFF09", value: "none" },
          { text: "1,2,3,...", value: "num" },
          { text: "\u3042,\u3044,\u3046,...", value: "aiu" },
          { text: "\u30A4,\u30ED,\u30CF,...", value: "iroha" }
        ]
      });
    }
  };
  var YAxisButtons = class extends AxisButtons {
    constructor(idx, state) {
      super(idx, state, "yAxis", {
        title: "\u7E26\u8EF8\uFF1A",
        type: "click-y-axis",
        init: [
          { text: "\uFF08\u7121\u3057\uFF09", value: "none" },
          { text: "1,2,3,...", value: "num" },
          { text: "\u3042,\u3044,\u3046,...", value: "aiu" },
          { text: "\u30A4,\u30ED,\u30CF,...", value: "iroha" }
        ]
      });
    }
  };

  // src/igo/view/go-controller/go-header.ts
  var GoHeader = class {
    dom = document.createElement("div");
    state = "list";
    color;
    character;
    cols;
    rows;
    xAxis;
    yAxis;
    constructor(idx, state) {
      this.state = state.list;
      this.color = new ColorButtons(idx, state);
      this.character = new CharacterButtons(idx, state);
      this.cols = new ColsRange(idx, state);
      this.rows = new RowsRange(idx, state);
      this.xAxis = new XAxisButtons(idx, state);
      this.yAxis = new YAxisButtons(idx, state);
      this.dom.appendChild(this.color.dom);
      this.dom.appendChild(this.character.dom);
      this.dom.appendChild(this.cols.dom);
      this.dom.appendChild(this.rows.dom);
      this.dom.appendChild(this.xAxis.dom);
      this.dom.appendChild(this.yAxis.dom);
    }
    render(state) {
      if (this.state === state.list) return;
      this.state = state.list;
      switch (state.list) {
        case "detail":
          this.dom.style.display = "block";
          this.color.render(state);
          this.character.render(state);
          this.cols.render(state);
          this.rows.render(state);
          this.xAxis.render(state);
          this.yAxis.render(state);
          break;
        default:
          this.dom.style.display = "none";
          break;
      }
    }
  };

  // src/igo/view/go-board/go-coordinates.ts
  var GoCoordinates = class {
    dom = document.createElementNS(config.ns, "g");
    state;
    x;
    y;
    char = {
      num: Array.from({ length: 19 }, (_, i) => `${i + 1}`),
      aiu: "\u3042\u3044\u3046\u3048\u304A\u304B\u304D\u304F\u3051\u3053\u3055\u3057\u3059\u305B\u305D\u305F\u3061\u3064\u3066".split(""),
      iroha: "\u30A4\u30ED\u30CF\u30CB\u30DB\u30D8\u30C8\u30C1\u30EA\u30CC\u30EB\u30F2\u30EF\u30AB\u30E8\u30BF\u30EC\u30BD\u30C4".split("")
    };
    constructor(state) {
      this.state = {
        x: state.xAxis,
        y: state.yAxis
      };
      const createXAxis = (g, char, i) => {
        const x = config.interval * i + Math.floor(config.interval / 2);
        const y = config.interval * config.size + Math.floor(config.interval / 2) + config.radius * 0.6;
        const text = document.createElementNS(config.ns, "text");
        text.setAttribute("style", config.font_style);
        text.setAttribute("x", `${x}`);
        text.setAttribute("y", `${y}`);
        text.setAttribute("text-anchor", "middle");
        text.textContent = char;
        g.appendChild(text);
        return g;
      };
      this.x = {
        num: this.char.num.reduce(createXAxis, document.createElementNS(config.ns, "g")),
        aiu: this.char.aiu.reduce(createXAxis, document.createElementNS(config.ns, "g")),
        iroha: this.char.iroha.reduce(createXAxis, document.createElementNS(config.ns, "g"))
      };
      const createYAxis = (g, char, i) => {
        const x = 0 - Math.floor(config.interval / 2);
        const y = config.interval * (config.size - 1 - i) + Math.floor(config.interval / 2) + config.radius * 0.6;
        const text = document.createElementNS(config.ns, "text");
        text.setAttribute("style", config.font_style);
        text.setAttribute("x", `${x}`);
        text.setAttribute("y", `${y}`);
        text.setAttribute("text-anchor", "middle");
        text.textContent = char;
        g.appendChild(text);
        return g;
      };
      this.y = {
        num: this.char.num.reduce(createYAxis, document.createElementNS(config.ns, "g")),
        aiu: this.char.aiu.reduce(createYAxis, document.createElementNS(config.ns, "g")),
        iroha: this.char.iroha.reduce(createYAxis, document.createElementNS(config.ns, "g"))
      };
      this.dom.appendChild(this.x.num);
      this.dom.appendChild(this.x.aiu);
      this.dom.appendChild(this.x.iroha);
      this.dom.appendChild(this.y.num);
      this.dom.appendChild(this.y.aiu);
      this.dom.appendChild(this.y.iroha);
    }
    render(state) {
      const colorPattern = {
        num: {
          num: config.color,
          aiu: "transparent",
          iroha: "transparent"
        },
        aiu: {
          num: "transparent",
          aiu: config.color,
          iroha: "transparent"
        },
        iroha: {
          num: "transparent",
          aiu: "transparent",
          iroha: config.color
        },
        default: {
          num: "transparent",
          aiu: "transparent",
          iroha: "transparent"
        }
      };
      if (this.state.x !== state.xAxis) {
        this.state.x = state.xAxis;
        let cP;
        switch (state.xAxis) {
          case "num":
            cP = colorPattern.num;
            break;
          case "aiu":
            cP = colorPattern.aiu;
            break;
          case "iroha":
            cP = colorPattern.iroha;
            break;
          default:
            cP = colorPattern.default;
            break;
        }
        this.x.num.style.fill = cP.num;
        this.x.aiu.style.fill = cP.aiu;
        this.x.iroha.style.fill = cP.iroha;
      }
      if (this.state.y !== state.yAxis) {
        this.state.y = state.yAxis;
        let cP;
        switch (state.xAxis) {
          case "num":
            cP = colorPattern.num;
            break;
          case "aiu":
            cP = colorPattern.aiu;
            break;
          case "iroha":
            cP = colorPattern.iroha;
            break;
          default:
            cP = colorPattern.default;
            break;
        }
        this.y.num.style.display = cP.num;
        this.y.aiu.style.display = cP.aiu;
        this.y.iroha.style.display = cP.iroha;
      }
    }
  };

  // src/igo/view/go-board/create-go-grid.ts
  function createGoGrid() {
    const dom = document.createElementNS(config.ns, "g");
    const start = Math.floor(config.interval / 2);
    const end = config.interval * config.size - start;
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

  // src/igo/view/go-board/go-stones.ts
  var Stone = class {
    dom = document.createElementNS(config.ns, "g");
    idx;
    circle = document.createElementNS(config.ns, "circle");
    char = document.createElementNS(config.ns, "text");
    color = Object.freeze({
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
    constructor(idx, row, col) {
      this.idx = idx;
      const background = document.createElementNS(config.ns, "rect");
      const x = col * config.interval;
      background.setAttribute("x", `${x}`);
      const y = row * config.interval;
      background.setAttribute("y", `${y}`);
      background.setAttribute("width", `${config.interval}`);
      background.setAttribute("height", `${config.interval}`);
      background.setAttribute("fill", "transparent");
      background.setAttribute("stroke", "transparent");
      const cx = col * config.interval + Math.floor(config.interval / 2);
      this.circle.setAttribute("cx", `${cx}`);
      const cy = row * config.interval + Math.floor(config.interval / 2);
      this.circle.setAttribute("cy", `${cy}`);
      this.circle.setAttribute("r", `${config.radius}`);
      this.circle.setAttribute("fill", "transparent");
      this.circle.setAttribute("stroke", "transparent");
      this.circle.setAttribute("stroke-width", `${config.thick}`);
      const text_size = config.text_size;
      const font_style = `font:normal ${text_size}px sans-serif`;
      this.char.setAttribute("style", font_style);
      this.char.setAttribute("x", `${cx}`);
      const base_line = config.radius * 0.6;
      const base_y = base_line + cy;
      this.char.setAttribute("y", `${base_y}`);
      this.char.setAttribute("fill", "transparent");
      this.char.setAttribute("text-anchor", "middle");
      this.char.textContent = "";
      this.dom.appendChild(background);
      this.dom.appendChild(this.circle);
      this.dom.appendChild(this.char);
      this.dom.addEventListener("click", () => {
        const event = new CustomEvent("", {
          bubbles: true,
          detail: {
            index: idx,
            row,
            col
          }
        });
        this.dom.dispatchEvent(event);
      }, false);
    }
    render(stoneData) {
      let pattern;
      switch (stoneData[0]) {
        case 1:
          pattern = "black";
        case 2:
          pattern = "white";
        default:
          pattern = stoneData[1] === "" ? "empty" : "onlyChar";
          break;
      }
      this.circle.setAttribute("fill", this.color[pattern].circle_fill);
      this.circle.setAttribute("stroke", this.color[pattern].circle_stroke);
      this.char.setAttribute("fill", this.color[pattern].text_fill);
      this.char.textContent = stoneData[1];
    }
  };
  var GoStones = class {
    dom = document.createElementNS(config.ns, "g");
    idx;
    stones;
    data;
    constructor(idx, state) {
      this.idx = idx;
      this.stones = Array.from({ length: 19 }, (_, r) => Array.from({ length: 19 }, (_2, c) => new Stone(idx, r, c)));
      this.data = state.data;
    }
    render(state) {
      if (this.data === state.data) return;
      this.stones.forEach((row, r) => {
        if (this.data[r] === state.data[r]) return;
        row.forEach((stone, c) => {
          if (this.data[r][c] === state.data[r][c]) return;
          stone.render(state.data[r][c]);
        });
      });
      this.data = state.data;
    }
  };

  // src/igo/view/go-board/go-board.ts
  var GoBoard = class {
    dom = document.createElementNS(config.ns, "svg");
    stones;
    coordinates;
    constructor(idx, state) {
      this.stones = new GoStones(idx, state);
      this.coordinates = new GoCoordinates(state);
      this.dom.appendChild(createGoGrid());
      this.dom.appendChild(this.stones.dom);
      this.dom.appendChild(this.coordinates.dom);
    }
    render(state) {
      this.stones.render(state);
      this.coordinates.render(state);
    }
  };

  // src/igo/view/go-controller/textarea.ts
  var Textarea = class {
    dom = document.createElement("div");
    idx;
    state;
    textarea = document.createElement("textarea");
    para = document.createElement("p");
    constructor(idx, state) {
      this.idx = idx;
      this.state = {
        list: state.list,
        text: state.textarea
      };
      this.textarea.style.display = "none";
      this.textarea.placeholder = "\u3053\u3053\u306B\u6587\u5B57\u304C\u5165\u529B\u3067\u304D\u307E\u3059\u3002";
      this.dom.appendChild(this.textarea);
      this.para.style.whiteSpace = "pre-wrap";
      this.dom.appendChild(this.para);
      this.textarea.addEventListener("change", () => {
        const event = new CustomEvent("go-event", {
          bubbles: true,
          detail: {
            type: "change-textarea",
            input: {
              index: idx,
              text: this.textarea.value
            }
          }
        });
        this.dom.dispatchEvent(event);
      }, false);
    }
    render(state) {
      if (this.state.list !== state.list) {
        this.state.list = state.list;
        switch (state.list) {
          case "detail":
            this.textarea.style.display = "block";
            this.para.style.display = "none";
            break;
          case "list":
            this.textarea.style.display = "none";
            this.para.style.display = "block";
            break;
        }
      }
      if (this.state.text !== state.textarea) {
        this.state.text = state.textarea;
        this.para.textContent = this.state.text;
      }
    }
  };

  // src/igo/view/go-wrapper.ts
  var GoWrapper = class {
    dom = document.createElement("div");
    idx;
    state;
    goHeader;
    goBoard;
    textarea;
    constructor(idx, state) {
      this.idx = idx;
      this.state = state;
      this.goHeader = new GoHeader(idx, state);
      this.goBoard = new GoBoard(idx, state);
      this.textarea = new Textarea(idx, state);
      this.dom.appendChild(this.goHeader.dom);
      this.dom.appendChild(this.goBoard.dom);
      this.dom.appendChild(this.textarea.dom);
    }
    render(state) {
      if (this.state === state) return;
      this.state = state;
      switch (state.list) {
        case "detail":
          this.dom.style.display = "block";
          this.goHeader.render(state);
          this.goBoard.render(state);
          this.textarea.render(state);
          break;
        case "list":
          this.dom.style.display = "block";
          this.goHeader.render(state);
          this.goBoard.render(state);
          this.textarea.render(state);
          break;
        case "none":
          this.dom.style.display = "none";
          break;
      }
    }
  };

  // src/igo/view/view.ts
  var View = class {
    dom = document.createElement("div");
    globalHeader;
    goWrappers;
    constructor(state) {
      this.globalHeader = new GlobalHeader(state);
      this.dom.appendChild(this.globalHeader.dom);
      this.goWrappers = Array.from({ length: 6 }, (_, i) => new GoWrapper(i, state.goWrapper[i]));
      this.goWrappers.forEach((gW) => {
        this.dom.appendChild(gW.dom);
      });
    }
    render(state) {
      this.globalHeader.render(state);
      this.goWrappers.forEach((gW, i) => gW.render(state.goWrapper[i]));
    }
  };

  // src/igo/index.ts
  var Controller = class extends HTMLElement {
    constructor() {
      super();
      let state = { ...initState };
      const model = new Model();
      const view = new View(state);
      this.appendChild(view.dom);
      view.render(state);
      view.dom.addEventListener("go-event", (ev) => {
        state = model.update(state, ev.detail);
        view.render(state);
      }, false);
      view.dom.addEventListener("go-save", () => {
        model.save(state);
      }, false);
      view.dom.addEventListener("go-load", (ev) => {
        state = model.load(state, ev.detail);
        view.render(state);
      }, false);
    }
  };
  customElements.define("go-quiz", Controller);
})();
