import { BoardController } from "./board-controller";

// <board-svg>要素を定義
customElements.define('board-controller', BoardController);

// customElement で発火した customEventがあれば、追記する
