import { getElement } from "../utils/helpers.js";

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = getElement(containerSelector);
    this._items = items;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._container.append(item);
  }

  prependItem(item) {
    this._container.prepend(item);
  }
}
