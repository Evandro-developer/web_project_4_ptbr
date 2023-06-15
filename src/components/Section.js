import { getElement } from "../utils/helpers.js";

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._itemsPromiseResolve = Promise.resolve(items);
    this._renderer = renderer;
    this._container = getElement(containerSelector);
  }

  async renderItems() {
    const items = await this._itemsPromiseResolve;
    items.forEach((item) => {
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
